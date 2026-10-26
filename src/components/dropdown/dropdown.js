import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

export default {
    emits: ['status'],
    setup(props, ctx) {
        const dropdown = ref(null)
        const content = ref(null)
        
        const data = ref({
            isVisible: false,
        })

        const methods = {
            setVisibility: () => {
                if (!data.value.isVisible) {
                    data.value.isVisible = true;
                } else {
                    data.value.isVisible = false;
                }
                 
                ctx.emit('status', data.value.isVisible)
            },
            setContentPosition: () => {
                let visibleWidth = window.innerWidth - dropdown.value.offsetLeft
                let hiddenWidth =  visibleWidth - content.value.offsetWidth
                let y = window.innerWidth - (dropdown.value.offsetLeft + dropdown.value.offsetWidth)

                if (hiddenWidth <= 0) {
                    content.value.style.left =  (hiddenWidth - y) + 'px'
                } else {
                    content.value.style.left = '0px'
                }
            },
            resetContentStatus: () => {
                if (data.value.isVisible) {
                    data.value.isVisible = false
                }
            },  
        }

        watch(() => data.value.isVisible, (data) => {
            methods.setContentPosition()
        })

        onMounted(() => {
            window.addEventListener('load', methods.setContentPosition)
            window.addEventListener('resize', methods.setContentPosition)
            window.addEventListener('orientationchange', methods.resetContentStatus)
        })

        onBeforeUnmount(() => {
            window.removeEventListener('resize', methods.setContentPosition)
            window.removeEventListener('load', methods.setContentPosition)
            window.removeEventListener('orientationchange', methods.resetContentStatus)
        })

        return {
            data,
            methods,
            dropdown,
            content,
        }
    },
    template: `
        <div ref="dropdown" id="unasus-dropdown">
            <span @click="methods.setVisibility"><slot name="front"></slot></span>
            <div appear :class="{ unasus_dropdown_content_visibility: data.isVisible }" ref="content" id="unasus-dropdown-content">
                <ul>
                    <slot name="content"></slot>
                </ul>    
            </div>
        </div>
    `
}