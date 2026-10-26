import { ref } from 'vue'

export const Accordion = {
    template: `
        <div class="unasus-accordion">
            <slot></slot>
        </div>
    `
}

export const Bellow = {
    setup() {
        const content = ref(null)
        const wrapperContent = ref(null)

        const data = ref({
            isOpen: false
        })

        const methods = {
            isOpen: () => {
                if (!data.value.isOpen) {
                    data.value.isOpen = true
                    wrapperContent.value.style.maxHeight = content.value.offsetHeight + 100 + 'px'
                } else {
                    data.value.isOpen = false
                    wrapperContent.value.style.maxHeight = '0'   
                }
            },
        }

        return {
            content,
            wrapperContent,
            data,
            methods,
        }
    },
    template: `
        <div class="unasus-bellow">
            <div @click="methods.isOpen()" class="front">
                <span><div class="btn-bellow">
                    <span class="bar" :class="{ unasus_bellow_hide_bar: data.isOpen }"></span>
                    <span class="bar"></span>
                </div><slot name="title"></slot></span>
            </div>
            <div ref="wrapperContent" class="content">
                <div ref="content"><slot name="content"></slot></div>
            </div>
        </div>
    `
}