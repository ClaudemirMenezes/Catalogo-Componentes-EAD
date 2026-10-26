import { ref } from 'vue'

export const TimeLine = {
    template: `
        <div class="unasus-timeline">
            <span class="title-timeline"><slot name="title">linha do tempo</slot></span>
            <slot></slot>
        </div>
    `
}

export const Moment = { 
    setup() {
        const content = ref(null)
        const contentWrapper = ref(null)

        const data = ref({
            isOpen: false,
        })

        const methods = {
            isOpen: () => {
                if (!data.value.isOpen) {
                    data.value.isOpen = true

                    contentWrapper.value.style.maxHeight = content.value.offsetHeight + 100 + 'px'

                    setTimeout(() => {
                        contentWrapper.value.style.borderBottom = '1px solid #dddddd'  
                    }, 50);
                } else {
                    data.value.isOpen = false
                    contentWrapper.value.style.maxHeight = '0'

                    setTimeout(() => {
                        contentWrapper.value.style.borderBottom = 'none' 
                    }, 450);
                }
            }
        }

        return {
            content,
            contentWrapper,
            data,
            methods
        }
    },
    template: `
        <div class="unasus-timeline-moment">
            <div @click="methods.isOpen" class="front">
                <span>
                    <slot name="title"></slot>
                    <div class="btn-accordion">
                        <span :class="{ unasus_moment_hide_bar: data.isOpen }" class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </span>
            </div>
            <div ref="contentWrapper" class="content-wrapper">
                <div class="content" ref="content"><slot name="content"></slot></div>
            </div>
        </div>
    `
}