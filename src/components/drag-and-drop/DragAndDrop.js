import ppu from "../../composables/ppu.js";

export const DragAndDrop = {
  name: "DragAndDrop",

  inject: ["ppu", "config"],

  props: {
    id: {
      type: String,
      required: true,
    },

    phrases: {
      type: Array,
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      localItems: [],
      completed: false,
    };
  },

  created() {
    this.localItems = this.shuffle(
      JSON.parse(JSON.stringify(this.items))
    );

    this.loadCompletionStatus();
  },

  computed: {
    blanks() {
      return this.localItems.filter(
        (item) => item.field === 0
      );
    },

    isCompleted() {
      return this.completed || (
        this.localItems.every(
          (item) =>
            item.field !== 0 &&
            item.status === "correct"
        ) &&
        this.localItems.length > 0
      );
    },
  },

  methods: {
    loadCompletionStatus() {
      const database = this.ppu.value || this.ppu;

      if (!database || !Array.isArray(database.test)) return;

      ppu.getTestControl(this.id, database.test).then((status) => {
        this.completed = status;
      });
    },

    saveCompletionStatus() {
      if (this.completed) return;

      const database = this.ppu.value || this.ppu;

      if (!database || !Array.isArray(database.test)) return;

      this.completed = true;
      ppu.setTestControl(this.id, database, this.config);
    },

    shuffle(array) {
      let currentIndex = array.length;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(
          Math.random() * currentIndex
        );

        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },

    field(fieldId) {
      return this.localItems.filter(
        (item) => item.field === fieldId
      );
    },

    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";

      evt.dataTransfer.setData(
        "itemID",
        item.id
      );
    },

    onDrop(evt, field) {
      const itemID =
        evt.dataTransfer.getData("itemID");

      const item = this.localItems.find(
        (i) => i.id == itemID
      );

      if (!item) return;

      item.field = field;

      const correct = Array.isArray(item.response)
        ? item.response.includes(field)
        : item.response === field;

      if (correct) {
        item.status = "correct";

        if (this.isCompleted) {
          this.saveCompletionStatus();
        }
      } else {
        item.status = "wrong";

        setTimeout(() => {
          item.field = 0;
          item.status = "blank";
        }, 1500);
      }
    },

    resetItems() {
      this.localItems.forEach((item) => {
        item.field = 0;
        item.status = "blank";
      });

      this.localItems =
        this.shuffle(this.localItems);
    },
  },

  template: `
    <div class="drag-and-drop-wrapper">

      <div
        v-if="isCompleted"
        class="completed-message"
      >
        Você concluiu esta tarefa
      </div>

      <div class="drag-layout">

        <!-- =========================
             COLUNA A
        ========================== -->

        <div class="drag-column drag-column-a">

          <h3 class="drag-column-title">
            Coluna A
          </h3>

          <!-- SOMENTE AS OPÇÕES
               ACOMPANHAM A ROLAGEM -->

          <div
            class="drag-options"
            :class="{ 'has-options': blanks.length > 0 }"
          >

            <div
              v-for="item in blanks"
              :key="item.id"
              class="drag-item"
              draggable="true"
              @dragstart="startDrag($event, item)"
              v-html="item.title"
            >
            </div>

          </div>

        </div>


        <!-- =========================
             COLUNA B
        ========================== -->

        <div class="drag-column drag-column-b">

          <h3 class="drag-column-title">
            Coluna B
          </h3>

          <div class="sentences-container">

            <div
              v-for="(sentence, sIndex) in phrases"
              :key="sIndex"
              class="drag-sentence-box"
            >

              <p class="drag-sentence">

                <template
                  v-for="(part, index) in sentence"
                  :key="index"
                >

                  <span
                    v-if="part.type === 'text'"
                    class="sentence-text"
                    v-html="part.value"
                  ></span>

                  <span
                    v-else-if="part.type === 'blank'"
                    class="drop-zone"
                    @drop="onDrop($event, part.id)"
                    @dragover.prevent
                    @dragenter.prevent
                  >

                    <span
                      v-if="field(part.id).length > 0"
                      :class="
                        'drag-item ' +
                        field(part.id)[0].status
                      "
                      draggable="true"
                      @dragstart="
                        startDrag(
                          $event,
                          field(part.id)[0]
                        )
                      "
                      v-html="field(part.id)[0].title"
                    ></span>


                    <div
                      v-if="
                        field(part.id).length > 0 &&
                        field(part.id)[0].status === 'correct' &&
                        field(part.id)[0].feedback
                      "
                      class="drag-feedback"
                    >

                      <strong>
                        Feedback:
                        {{ field(part.id)[0].title }}
                      </strong>

                      <p
                        v-html="
                          field(part.id)[0].feedback
                        "
                      ></p>

                    </div>

                  </span>

                </template>

              </p>

            </div>


            <button
              @click="resetItems"
              class="reset-button"
            >
              Recomeçar
            </button>

          </div>

        </div>

      </div>

    </div>
  `,
};