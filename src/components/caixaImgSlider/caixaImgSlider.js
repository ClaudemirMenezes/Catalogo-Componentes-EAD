export default {
  name: 'Carousel',

  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },

  data () {
    return {
      currentIndex: 0,
      timer: null,
      buttonImageSrcMap: {
        voltarButton: './src/assets/images/icones/voltarButton.svg',
        avancarButton: './src/assets/images/icones/avancarButton.svg'
      }
    }
  },

  computed: {
    totalSlides () {
      return this.items.length
    },

    currentSlide () {
      return this.items[this.currentIndex] || {}
    }
  },

  mounted () {
    if (this.autoPlay && this.totalSlides > 1) {
      this.startAutoPlay()
    }
  },

  beforeUnmount () {
    this.stopAutoPlay()
  },

  methods: {
    startAutoPlay () {
      this.stopAutoPlay()

      this.timer = setInterval(() => {
        this.nextSlide()
      }, this.interval)
    },

    stopAutoPlay () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },

    prevSlide () {
      if (this.totalSlides === 0) return

      this.currentIndex =
        this.currentIndex === 0
          ? this.totalSlides - 1
          : this.currentIndex - 1
    },

    nextSlide () {
      if (this.totalSlides === 0) return

      this.currentIndex =
        this.currentIndex === this.totalSlides - 1
          ? 0
          : this.currentIndex + 1
    },

    goToSlide (index) {
      this.currentIndex = index
    }
  },

  template: `
    <div class="content-slider">
      <div class="image-carousel">

        <div class="carousel-content">

          <button 
            class="carousel-nav left"
            @click="prevSlide"
            aria-label="Voltar slide"
          >
            <img :src="buttonImageSrcMap.voltarButton" alt="Voltar">
          </button>

          <div class="carousel-images">
            <div 
              v-for="(item, index) in items"
              :key="index"
              v-show="currentIndex === index"
              class="carousel-item"
            >
              <slot 
                v-if="$slots['image' + (index + 1)]"
                :name="'image' + (index + 1)"
              ></slot>

              <img 
                v-else-if="item.image"
                :src="item.image"
                :alt="item.alt || item.title || 'Imagem do carrossel'"
              >

              <div v-else class="carousel-item__fallback">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </div>
          </div>

          <button 
            class="carousel-nav right"
            @click="nextSlide"
            aria-label="Avançar slide"
          >
            <img :src="buttonImageSrcMap.avancarButton" alt="Avançar">
          </button>

        </div>

        <div class="carousel-description">
          <h2 v-if="currentSlide.title">{{ currentSlide.title }}</h2>
          <p v-if="currentSlide.text" v-html="currentSlide.text"></p>
        </div>

        <div 
          v-if="totalSlides > 1"
          class="carousel-indicators"
        >
          <span
            v-for="(item, index) in items"
            :key="index"
            :class="{ active: currentIndex === index }"
            @click="goToSlide(index)"
          ></span>
        </div>

      </div>
    </div>
  `
}