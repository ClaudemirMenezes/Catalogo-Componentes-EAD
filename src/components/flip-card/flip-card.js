import { ref } from 'vue'

export const FlipCards = {
  template: `
    <div class="flip-cards">
      <slot></slot>
    </div>
  `
}

export const FlipCard = {
  setup() {
    const content = ref(null)
    const wrapperContent = ref(null)

    return {
      content,
      wrapperContent
    }
  },

  template: `
    <label class="flip-card">
      <input type="checkbox" class="flip-card-input" />

      <div class="flip-card-body">
        <div class="flip-card-face flip-card-front">
          <div class="flip-card-content">
            <slot name="frente"></slot>
          </div>

          <div class="flip-card-action">
            <Img src="./src/assets/images/icones/setas.svg" />
            <span>Clique para virar o card</span>
          </div>
        </div>

        <div class="flip-card-face flip-card-back">
          <div class="flip-card-content">
            <slot name="verso"></slot>
          </div>

          <div class="flip-card-action flip-card-action-back">
            <Img src="./src/assets/images/icones/setas2.svg" />
            <span>Voltar</span>
          </div>
        </div>
      </div>
    </label>
  `
}/*
    Como utilizar o componente:
        

    <FlipCards>
        <FlipCard>
            <template #frente>
            <h2>Título da frente</h2>
            </template>

            <template #verso>
            <p>Texto do verso do card.</p>
            </template>
        </FlipCard>
    </FlipCards>
        
*/