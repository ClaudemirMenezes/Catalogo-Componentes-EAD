import { ref, onBeforeUnmount } from 'vue'

export default {
    props: {
        open: Boolean,
        width: {
            type: String,
            default: '500px',
        },
        scroll: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['close', 'after-leave'],
    setup(props, ctx) {
        const modal = ref(null)
        const modalContent = ref(null)
        const backdrop = ref(null)
        const contentWrapper = ref(null)
        const wrapperModal = ref(null)

        const methods = {
            setWidthModal: () => {
                wrapperModal.value.style.maxWidth = props.width
            },
            setModalHeight: () => { 
                if (!props.scroll) {
                    const HEADER = 51
                    const limitHeight = backdrop.value.offsetHeight - (contentWrapper.value.offsetTop + HEADER)
    
                    if (modalContent.value.offsetHeight < limitHeight) {
                        modal.value.style.height = modalContent.value.offsetHeight + HEADER + 21 + 'px'
                    } else {
                        modal.value.style.height = limitHeight + HEADER + 10 + 'px'
                    }
                }
            },
            onEnter: () => {
                methods.setModalHeight()     
                methods.setWidthModal()       
                window.addEventListener('resize', methods.setModalHeight)
                window.addEventListener('orientationchange', methods.setModalHeight)
            },
            onLeave: () => {
                window.removeEventListener('resize', methods.setModalHeight) 
                window.removeEventListener('orientationchange', methods.setModalHeight)  
            },
            close: () => ctx.emit('close'),
        }   

        onBeforeUnmount(() => {
            window.removeEventListener('resize', methods.setModalHeight) 
            window.removeEventListener('orientationchange', methods.setModalHeight)
        })

        return {
            backdrop,
            contentWrapper,
            modal,
            methods,
            modalContent,
            wrapperModal,
        }
    },
    template: `
        <Teleport to="#app">
            <transition appear name="unasus-modal-fade" @leave="$emit('after-leave')" @leave="methods.onLeave" @enter="methods.onEnter">
                <template v-if="open">
                    <div @click.stop.self="methods.close" ref="backdrop" class="unasus-modal-backdrop">
                        <div @click.stop.self="methods.close" ref="wrapperModal" class="unasus-modal-wrapper">
                            <div ref="modal" class="unasus-modal">
                                <div class="unasus-modal-title">
                                    <h1><slot name="title">Title of Modal</slot></h1>
                                    <div @click="methods.close" class="unasus-modal-close-button"></div>
                                </div>
                                <div ref="contentWrapper" class="unasus-modal-wrapper-content">
                                    <div ref="modalContent" class="unasus-modal-content">
                                        <slot name="content">
                                            <div class="row">
                                                <div class="col-12">
                                                    <p></p>
                                                </div>
                                            </div>
                                        </slot>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </transition>
        </Teleport>
    `
}