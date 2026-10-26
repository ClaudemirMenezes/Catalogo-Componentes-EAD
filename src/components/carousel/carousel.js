import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export default {
    name: 'Carousel',
    props: {
        slides: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            default: 'Carrossel de conteúdo'
        },
        description: {
            type: String,
            default: ''
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 5000
        }
    },
    setup(props) {
        const currentIndex = ref(0)
        const timer = ref(null)

        const currentSlide = computed(() => {
            if (!props.slides.length) {
                return null
            }

            return props.slides[currentIndex.value % props.slides.length]
        })

        const goTo = (index) => {
            currentIndex.value = (index + props.slides.length) % props.slides.length
        }

        const nextSlide = () => {
            if (!props.slides.length) {
                return
            }

            currentIndex.value = (currentIndex.value + 1) % props.slides.length
        }

        const prevSlide = () => {
            if (!props.slides.length) {
                return
            }

            currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
        }

        const startAutoplay = () => {
            if (!props.autoplay || !props.slides.length) {
                return
            }

            clearInterval(timer.value)
            timer.value = setInterval(nextSlide, props.interval)
        }

        onMounted(() => {
            startAutoplay()
        })

        onBeforeUnmount(() => {
            clearInterval(timer.value)
        })

        return {
            currentSlide,
            currentIndex,
            goTo,
            nextSlide,
            prevSlide,
            startAutoplay
        }
    },
    template: `
        <div class="carousel-component">
            <div class="carousel-component-header">
                <div>
                    <p class="carousel-component-kicker">Carrossel</p>
                    <h4>{{ title }}</h4>
                </div>
            </div>

            <p v-if="description" class="carousel-component-description">{{ description }}</p>

            <div v-if="currentSlide" class="carousel-component-stage">
                <div class="carousel-component-media">
                    <img v-if="currentSlide.image" :src="currentSlide.image" :alt="currentSlide.title" />
                    <div v-else class="carousel-component-placeholder">{{ currentSlide.title }}</div>
                </div>

                <div class="carousel-component-copy">
                    <p class="carousel-component-badge">Slide {{ currentIndex + 1 }} de {{ slides.length }}</p>
                    <h5>{{ currentSlide.title }}</h5>
                    <p>{{ currentSlide.description }}</p>
                    <div class="carousel-component-actions">
                        <button type="button" class="carousel-component-nav" @click="prevSlide">Anterior</button>
                        <button type="button" class="carousel-component-nav" @click="nextSlide">Próximo</button>
                    </div>
                </div>
            </div>

            <div class="carousel-component-dots">
                <button
                    v-for="(slide, index) in slides"
                    :key="index"
                    type="button"
                    class="carousel-component-dot"
                    :class="{ active: currentIndex === index }"
                    @click="goTo(index)"
                >
                    <span></span>
                </button>
            </div>
        </div>
    `
}
