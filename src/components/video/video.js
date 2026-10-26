import { ref, onMounted, watch } from 'vue'

export default {
    props: {
        src: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        resolutions: {
            type: Array,
        },
        default: {
            type: String,
            required: true,
        }
    },
    setup(props, ctx) {
        const video = ref(null)

        const data = ref({
            close: false,
        })

        watch(() => data.value.close, (data) => {
            if (data) {
                video.value.pause()
            } else {
                video.value.play()
            }
        })

        const methods = {
            changeResolution: (resolution) => {
                methods.setResolution(resolution)
                unasus.pack.setPersistence('VIDEO', {
                    resolution: resolution,
                })
            },
            setResolution: (resolution) => {
                let newResolution = null
                let source = video.value.children[0]
                let currentTime = video.value.currentTime

                newResolution = methods.getSrcChunks(video.value.children[0].src, resolution)
                source.src = newResolution
                data.value.close = false
                video.value.load()
                video.value.currentTime = currentTime
            },
            getSrcChunks: (src, resolution) => { return src.replace(/(_\d+p)/, '_' + resolution) }
        }

        onMounted(() => {
            let video = unasus.pack.getPersistence('VIDEO')

            if (!video) {
                unasus.pack.setPersistence('VIDEO', {
                    resolution: props.default
                })
            } else {
                methods.setResolution(video.resolution)
            }
        })

        return {
            data,
            methods,
            video,
        }
    },
    template: `
        <div class="unasus-player-video">
            <div class="unasus-player-video-wrapper">
                <div v-show="data.close" class="unasus-player-video-resolutions">
                    <div @click="data.close = false" class="unasus-player-video-close"></div>
                    <template v-for="resolution in resolutions">
                        <span @click="methods.changeResolution(resolution)" class="unasus-player-video-resolution">{{ resolution }}</span>
                    </template>
                </div>
                <video ref="video" controls :poster="thumbnail">
                    <source :src="src" type="video/mp4">
                </video>
            </div>
            <div @click="data.close = true" class="unasus-player-video-painel">Alterar Resolução</div>
        </div>
    `
}