import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
    props: {
        src: String,
        scale: {
            type: Number,
            default: 3,
        },
        zoom: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const imageWrapper = ref(null)
        const imageZoom = ref(null)
        const image = ref(null)

        const data = ref({
            toggleZoom: false,
        })
        
        const methods = {
            setZoom: (e) => {
                if (!data.value.toggleZoom) {
                    data.value.toggleZoom = true

                    const imageWidth = image.value.offsetWidth
                    const imageHeight = image.value.offsetHeight

                    imageZoom.value.style.width = imageWidth * props.scale + 'px'
                    imageZoom.value.style.height = imageHeight * props.scale + 'px'
                    imageZoom.value.style.background = 'url(' + props.src + ')'
                    imageZoom.value.style.backgroundRepeat = 'no-repeat'
                    imageZoom.value.style.backgroundSize = 'cover'
                    imageZoom.value.style.visibility = 'visible'
                    imageZoom.value.style.transform = 'translate(-' + (e.offsetX / imageWidth * imageWidth * (props.scale - 1)) + 'px, -' + (e.offsetY / imageHeight * imageHeight * (props.scale - 1)) + 'px)'
                } else {
                    data.value.toggleZoom = false
                    imageZoom.value.style.visibility = 'hidden'
                }
            }
        }

        onMounted(() => {
            imageWrapper.value.addEventListener('click', methods.setZoom)
        })

        onBeforeUnmount(() => {
            imageWrapper.value.removeEventListener('click', methods.setZoom)
        })

        return {
            methods,
            imageWrapper,
            imageZoom,
            image,
        }
    },
    template: `
        <div class="unasus-image">
            <div ref="imageWrapper" class="unasus-image-wrapper">  
                <div ref="imageZoom" class="unasus-image-aux"></div>
                <img ref="image" :src="src" />
            </div>
            <span><slot></slot></span>
        </div>
    `
}