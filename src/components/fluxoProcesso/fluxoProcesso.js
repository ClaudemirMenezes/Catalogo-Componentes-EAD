import { ref } from 'vue'

export default {
  name: 'FluxoProcesso',

  props: {
    etapas: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  setup(props) {
    const etapaVisivel = ref(0)

    const avancar = (index) => {
      if (
        index === etapaVisivel.value &&
        etapaVisivel.value < props.etapas.length - 1
      ) {
        etapaVisivel.value++
      }
    }

    const reiniciar = () => {
      etapaVisivel.value = 0
    }

    return {
      etapaVisivel,
      avancar,
      reiniciar
    }
  },

  template: `
    <div class="fluxo-wrapper">

      <div class="fluxo-processo">

        <template
          v-for="(etapa, index) in etapas"
          :key="index"
        >

          <!-- CONECTOR -->
          <Transition name="linha">
            <div
              v-if="index > 0 && index <= etapaVisivel"
              class="fluxo-conector"
            >
              <div class="fluxo-linha"></div>

              <span class="fluxo-seta">
                ›
              </span>
            </div>
          </Transition>


          <!-- CARD -->
          <Transition name="card">
            <div
              v-if="index <= etapaVisivel"
              class="fluxo-card"
              :class="{
                atual: index === etapaVisivel,
                concluido: index < etapaVisivel
              }"
              @click="avancar(index)"
            >

              <!-- NÚMERO -->
              <div class="fluxo-numero">

                <span v-if="index < etapaVisivel">
                  ✓
                </span>

                <span v-else>
                  {{ index + 1 }}
                </span>

              </div>


              <!-- TÍTULO -->
              <h3>
                {{ etapa.titulo }}
              </h3>


              <!-- TEXTO -->
              <p>
                {{ etapa.texto }}
              </p>


              <!-- AVISO -->
              <span
                v-if="
                  index === etapaVisivel &&
                  index < etapas.length - 1
                "
                class="fluxo-clique"
              >
                Clique para continuar
              </span>


              <!-- ÚLTIMA ETAPA -->
              <span
                v-if="
                  index === etapaVisivel &&
                  index === etapas.length - 1
                "
                class="fluxo-finalizado"
              >
                Fluxo concluído
              </span>

            </div>
          </Transition>

        </template>

      </div>


      <!-- BOTÃO REINICIAR -->
      <Transition name="reiniciar">
        <button
          v-if="
            etapas.length > 0 &&
            etapaVisivel === etapas.length - 1
          "
          class="fluxo-reiniciar"
          @click="reiniciar"
        >
          ↻ Reiniciar fluxo
        </button>
      </Transition>

    </div>
  `
}

/*
 Como usar:
 
<FluxoProcesso
    :etapas="[
        {
            titulo: 'Dado',
            texto: 'Elemento bruto coletado.'
        },
        {
            titulo: 'Informação',
            texto: 'Dado organizado e interpretado.'
        },
        {
            titulo: 'Decisão',
            texto: 'Escolha baseada nas informações disponíveis.'
        },
        {
            titulo: 'Ação',
            texto: 'Aplicação prática da decisão.'
        }
    ]"
    />

*/