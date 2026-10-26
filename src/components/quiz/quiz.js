import { ref, computed, watch, inject, onMounted } from 'vue'
import ppu from '../../composables/ppu.js'

export default {
  template: `
  <div class="main-q">
    <div class="container-q">

      <!-- TÍTULO -->
      <div class="box-icon-q">
        <h1>{{ title }}</h1>
      </div>

      <!-- TEXTO INTRODUTÓRIO -->
      <p class="sub-q">
        <slot>
          Este é o conteúdo personalizado que substituirá o parágrafo padrão.
        </slot>
      </p>

      <div class="box-q">

        <div
          v-if="completed"
          class="completed-message"
        >
          Você concluiu esta tarefa
        </div>

        <!-- CASO NÃO EXISTAM QUESTÕES -->
        <div
          v-if="!questions || questions.length === 0"
          class="quiz-empty"
        >
          Nenhuma questão disponível.
        </div>

        <!-- QUIZ -->
        <template v-else>

          <!-- BARRA DE PROGRESSO -->
          <div
            v-if="!finishTest"
            class="quiz-progress"
          >

            <div
              v-for="(status, index) in answerStatuses"
              :key="index"
              class="quiz-progress-step"
              :class="status"
            >
            </div>

          </div>

          <!-- QUESTÕES -->
          <div
            v-if="!finishTest"
            class="box-t"
          >

            <!-- ENUNCIADO -->
            <p
              class="question"
              v-html="questions[currentQuestionIndex]?.question"
            >
            </p>

            <!-- ALTERNATIVAS -->
            <div
              v-if="!selectedAnswer"
            >

              <div
                class="option-box"
                v-for="(answer, index) in questions[currentQuestionIndex]?.answers || []"
                :key="index"
                :class="{
                  selected: selectedOption === index
                }"
                @click="selectOptions(index)"
              >

                <span class="circle">
                  {{ getLetter(index) }}
                </span>

                <span
                  class="option-text"
                  v-html="answer.statement"
                >
                </span>

              </div>

            </div>

            <!-- RESPOSTA APÓS CORREÇÃO -->
            <div v-else>

              <div
                class="option-box"
                :class="{
                  correct: isCorrect,
                  incorrect: !isCorrect
                }"
              >

                <span
                  :class="{
                    ccorrect: isCorrect,
                    cincorrect: !isCorrect
                  }"
                >
                  {{ getLetter(selectedOption) }}
                </span>

                <span
                  class="option-text"
                  v-html="selectedAnswer?.statement"
                >
                </span>

              </div>

            </div>

            <!-- FEEDBACK -->
            <div
              class="feedback-box"
              v-if="feedback"
            >

              <h3>

                <span v-if="isCorrect">
                  Parabéns! Resposta correta!
                </span>

                <span v-else>
                  Ops... Resposta incorreta.
                </span>

              </h3>

              <p
                class="feadback-q"
                v-html="feedback"
              >
              </p>

            </div>

            <!-- BOTÕES -->
            <div class="box-footer">

              <!-- ENVIAR -->
              <Unasus-Button
                v-if="!px"
                :disabled="selectedOption === null"
                @click="validateAnswer"
              >
                Enviar
              </Unasus-Button>

              <!-- PRÓXIMA QUESTÃO -->
              <Unasus-Button
                v-if="px && !isLastQuestion"
                @click="nextQuestion"
              >
                Próxima Questão
              </Unasus-Button>

              <!-- FINALIZAR -->
              <Unasus-Button
                v-if="px && isLastQuestion"
                @click="finish"
              >
                Finalizar Quiz
              </Unasus-Button>

            </div>

          </div>

          <!-- RESULTADO FINAL -->
          <div
            v-else
            class="box-fin"
          >

            <div class="finish-box">

              <!-- ACERTOU TUDO -->
              <h1
                v-if="correctAnswers === questions.length"
              >
                Parabéns!
              </h1>

              <!-- ERROU TUDO -->
              <h1
                v-else-if="correctAnswers === 0"
              >
                Que pena!
              </h1>

              <!-- ACERTOU ALGUMAS -->
              <h1 v-else>
                Quiz finalizado!
              </h1>

              <p class="finish-text">
                {{ finishText }}
              </p>

              <p class="finish-point">
                {{ correctAnswers }}/{{ questions.length }}
              </p>

              <p class="finish-label">
                respostas corretas
              </p>

              <!-- REINICIA TODAS AS QUESTÕES -->
              <Unasus-Button
                @click="tryAgain"
              >
                Tentar Novamente
              </Unasus-Button>

            </div>

          </div>

        </template>

      </div>

    </div>
  </div>
  `,

  props: {

    questions: {
      type: Array,
      default: () => []
    },

    attempt: {
      type: Number,
      default: 2
    },

    /*
    Aqui coloca o nome da atividade
    */
    title: {
      type: String,
      default: 'Vamos Praticar?'
    },

    id: {
      type: String,
      required: true
    }

  },

  setup(props) {

    const PPU = inject('ppu')
    const Config = inject('config')

    /*
    ========================================
    VARIÁVEIS
    ========================================
    */

    const currentQuestionIndex = ref(0)

    const selectedOption = ref(null)

    const selectedAnswer = ref(null)

    const feedback = ref('')

    const isCorrect = ref(false)

    const px = ref(false)

    const finishText = ref('')

    const finishTest = ref(false)

    const correctAnswers = ref(0)

    const answerStatuses = ref([])

    const completed = ref(false)

    const loadCompletionStatus = () => {

      const database = PPU?.value || PPU

      if (!database || !Array.isArray(database.test)) {
        return
      }

      ppu.getTestControl(props.id, database.test).then(status => {
        completed.value = status
      })

    }

    const saveCompletionStatus = () => {

      if (!allAnswersCorrect.value || completed.value || !PPU?.value || !Config) {
        return
      }

      ppu.setTestControl(props.id, PPU.value, Config)
      completed.value = true

    }

    onMounted(loadCompletionStatus)

    /*
    ========================================
    CARREGAMENTO DAS QUESTÕES
    ========================================

    Resolve o problema do quiz não aparecer
    quando as questões chegam depois que
    o componente já foi montado.
    */

    watch(
      () => props.questions,

      (newQuestions) => {

        if (
          Array.isArray(newQuestions) &&
          newQuestions.length > 0
        ) {

          /*
          Todas as questões começam
          como não respondidas.
          */

          answerStatuses.value =
            new Array(newQuestions.length)
              .fill('not-answered')

          /*
          Reinicia as variáveis.
          */

          currentQuestionIndex.value = 0

          selectedOption.value = null

          selectedAnswer.value = null

          feedback.value = ''

          isCorrect.value = false

          px.value = false

          finishTest.value = false

          correctAnswers.value = 0

          finishText.value = ''

        } else {

          answerStatuses.value = []

        }

      },

      {
        immediate: true
      }
    )

    /*
    ========================================
    COMPUTEDS
    ========================================
    */

    const isLastQuestion = computed(() => {

      if (
        !props.questions ||
        props.questions.length === 0
      ) {
        return false
      }

      return (
        currentQuestionIndex.value ===
        props.questions.length - 1
      )

    })

    /*
    Verifica se todas foram acertadas.
    */

    const allAnswersCorrect = computed(() => {

      if (
        answerStatuses.value.length === 0
      ) {
        return false
      }

      return answerStatuses.value.every(
        status => status === 'correct'
      )

    })

    /*
    ========================================
    LETRA DAS ALTERNATIVAS
    ========================================
    */

    const getLetter = index => {

      return String.fromCharCode(
        65 + index
      )

    }

    /*
    ========================================
    SELECIONAR ALTERNATIVA
    ========================================
    */

    const selectOptions = index => {

      /*
      Depois que a resposta foi enviada,
      não permite trocar a alternativa.
      */

      if (px.value) {
        return
      }

      selectedOption.value = index

    }

    /*
    ========================================
    SALVAR RESPOSTA
    ========================================
    */

    const saveState = () => {

      const state = {

        stage: props.id,

        questions: {

          question:
            currentQuestionIndex.value,

          alternative:
            selectedOption.value,

          correct:
            isCorrect.value

        }

      }

      /*
      Verifica se o UNA-SUS Pack existe
      antes de tentar salvar.
      */

      if (
        typeof unasus !== 'undefined' &&
        unasus.pack &&
        typeof unasus.pack.setPersistence === 'function'
      ) {

        unasus.pack.setPersistence(
          'ANSWER',
          state
        )

      }

    }

    /*
    ========================================
    VALIDAR RESPOSTA
    ========================================
    */

    const validateAnswer = () => {

      /*
      Não permite enviar sem selecionar
      uma alternativa.
      */

      if (
        selectedOption.value === null
      ) {
        return
      }

      /*
      Recupera a questão atual.
      */

      const selectedQuestion =
        props.questions[
          currentQuestionIndex.value
        ]

      /*
      Proteção caso a questão
      não exista.
      */

      if (
        !selectedQuestion ||
        !Array.isArray(
          selectedQuestion.answers
        )
      ) {
        return
      }

      /*
      Recupera a alternativa escolhida.
      */

      selectedAnswer.value =
        selectedQuestion.answers[
          selectedOption.value
        ]

      /*
      Proteção para resposta inválida.
      */

      if (!selectedAnswer.value) {
        return
      }

      /*
      status true = correta
      status false = incorreta
      */

      isCorrect.value =
        selectedAnswer.value.status === true

      /*
      Mostra o feedback correspondente.
      */

      feedback.value =
        selectedAnswer.value.feedback || ''

      /*
      Atualiza a barra de progresso.
      */

      answerStatuses.value[
        currentQuestionIndex.value
      ] =
        isCorrect.value
          ? 'correct'
          : 'incorrect'

      saveCompletionStatus()

      /*
      Informa que a questão
      já foi corrigida.
      */

      px.value = true

      /*
      Salva o estado.
      */

      saveState()

    }

    /*
    ========================================
    PRÓXIMA QUESTÃO
    ========================================
    */

    const nextQuestion = () => {

      /*
      Não deixa passar da última questão.
      */

      if (isLastQuestion.value) {
        return
      }

      /*
      Avança para próxima questão.
      */

      currentQuestionIndex.value++

      /*
      Limpa os dados da questão anterior.
      */

      selectedOption.value = null

      selectedAnswer.value = null

      feedback.value = ''

      isCorrect.value = false

      px.value = false

    }

    /*
    ========================================
    FINALIZAR QUIZ
    ========================================
    */

    const finish = () => {

      /*
      Conta quantas questões
      foram respondidas corretamente.
      */

      correctAnswers.value =
        answerStatuses.value.filter(
          status =>
            status === 'correct'
        ).length

      /*
      Texto apresentado
      no resultado final.
      */

      finishText.value =
        'Você finalizou o quiz e sua quantidade de acertos foi:'

      /*
      Mostra a tela final.
      */

      finishTest.value = true

    }

    /*
    ========================================
    TENTAR NOVAMENTE
    ========================================

    IMPORTANTE:

    Ao clicar em "Tentar Novamente",
    TODAS as questões são reiniciadas.

    Não importa se a questão estava
    correta ou incorreta.
    ========================================
    */

    const tryAgain = () => {

      /*
      Reinicia o status de TODAS
      as questões.
      */

      answerStatuses.value =
        new Array(
          props.questions.length
        ).fill('not-answered')

      /*
      Volta para a primeira questão.
      */

      currentQuestionIndex.value = 0

      /*
      Limpa alternativa selecionada.
      */

      selectedOption.value = null

      /*
      Limpa resposta anterior.
      */

      selectedAnswer.value = null

      /*
      Limpa o feedback.
      */

      feedback.value = ''

      /*
      Limpa status correto/incorreto.
      */

      isCorrect.value = false

      /*
      Libera novamente o botão Enviar.
      */

      px.value = false

      /*
      Sai da tela final.
      */

      finishTest.value = false

      /*
      Limpa o texto final.
      */

      finishText.value = ''

      /*
      Zera a pontuação.
      */

      correctAnswers.value = 0

    }

    /*
    ========================================
    RETORNO
    ========================================
    */

    return {

      getLetter,

      selectOptions,

      validateAnswer,

      nextQuestion,

      finish,

      tryAgain,

      selectedOption,

      selectedAnswer,

      feedback,

      isCorrect,

      currentQuestionIndex,

      px,

      answerStatuses,

      finishTest,

      correctAnswers,

      finishText,

      isLastQuestion,

      allAnswersCorrect,

      completed,

      attempt: props.attempt

    }

  }

}