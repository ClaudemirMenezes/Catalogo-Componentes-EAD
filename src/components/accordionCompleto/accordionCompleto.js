import { ref } from 'vue'

export const AccordionCompleto = {
  template: `
        <div class="unasus-accordion-completo">
            <slot></slot>
        </div>
    `
}

export const BellowCompleto = {
  setup () {
    const content = ref(null)
    const wrapperContent = ref(null)

    const data = ref({
      isOpen: false
    })

    const methods = {
      isOpen: () => {
        if (!data.value.isOpen) {
          data.value.isOpen = true
          wrapperContent.value.style.maxHeight =
            content.value.offsetHeight + 100 + 'px'
        } else {
          data.value.isOpen = false
          wrapperContent.value.style.maxHeight = '0'
        }
      }
    }

    return {
      content,
      wrapperContent,
      data,
      methods
    }
  },
  template: `
        <div class="unasus-bellow-completo">
            <div @click="methods.isOpen()" class="front-completo">
                <span>
                <div class="btn-bellow-completo"></div> 
                <div class="full-space">
                 <slot name="title"></slot>
                <img src="src/assets/images/icones/arrow_downb.png" class="arrow-icon" alt="Arrow Down">
                </div>
               
                </span>
            </div>
            <div ref="wrapperContent" class="content-completo">
                <div ref="content"><slot name="content"></slot></div>
            </div>
        </div>
    `
}
