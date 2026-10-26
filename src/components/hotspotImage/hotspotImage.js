import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'HotspotImage',

  props: {
    backgroundImage: {
      type: String,
      required: true
    },

    nodes: {
      type: Array,
      default: () => []
    },

    debug: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const activeNode = ref(null)
    const viewedNodes = ref(new Set())

    const getNodeText = (node) => {
      return node.description || node.content || ''
    }

    const isActive = (node) => {
      return activeNode.value?.id === node.id
    }

    const toggleNode = (node) => {
      if (isActive(node)) {
        activeNode.value = null
        return
      }

      activeNode.value = node
      viewedNodes.value.add(node.id)
    }

    const closeTooltip = () => {
      activeNode.value = null
    }

    /*
      Fecha a caixa quando o usuário clica em qualquer
      lugar que não seja um marcador ou a própria caixa.
    */
    const handleDocumentClick = (event) => {
      const clickedHotspot = event.target.closest('.hotspot-point')
      const clickedTooltip = event.target.closest('.custom-tooltip')

      if (!clickedHotspot && !clickedTooltip) {
        closeTooltip()
      }
    }

    /*
      Quando debug estiver como true, clicar na imagem
      mostra as coordenadas x e y no console.
    */
    const showCoordinates = (event) => {
      if (!props.debug) return

      const container = event.currentTarget
      const rect = container.getBoundingClientRect()

      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100

      console.log({
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1))
      })
    }

    onMounted(() => {
      document.addEventListener('click', handleDocumentClick)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleDocumentClick)
    })

    return {
      activeNode,
      viewedNodes,
      getNodeText,
      isActive,
      toggleNode,
      closeTooltip,
      showCoordinates
    }
  },

  template: `
    <div class="hotspot-wrapper">
      <div
        class="image-container"
        @click="showCoordinates"
      >
        <img
          :src="backgroundImage"
          class="bg-image"
          alt="Imagem interativa"
        />

        <div
          v-for="node in nodes"
          :key="node.id"
          class="hotspot-point"
          :class="{
            active: isActive(node),
            viewed: viewedNodes.has(node.id)
          }"
          :data-side="node.x < 20 ? 'left' : node.x > 80 ? 'right' : 'center'"
          :style="{
            top: node.y + '%',
            left: node.x + '%'
          }"
          @click.stop="toggleNode(node)"
        >
          <div class="icon-circle">
            <i
              v-if="node.icon"
              :class="node.icon"
            ></i>

            <span
              v-else
              class="default-icon"
            >
              {{ node.label || '+' }}
            </span>

            <span
              v-if="viewedNodes.has(node.id)"
              class="check-mark"
            >
              ✓
            </span>
          </div>

          <div
            v-if="isActive(node)"
            class="custom-tooltip"
            :class="{
              'tooltip-with-title': node.title,
              'tooltip-without-title': !node.title
            }"
            @click.stop
          >
            <!-- Cabeçalho: aparece apenas quando existir título -->
            <header
              v-if="node.title"
              class="tooltip-header"
            >
              <strong v-html="node.title"></strong>

              <button
                type="button"
                class="tooltip-close"
                aria-label="Fechar"
                @click.stop="closeTooltip"
              >
                ×
              </button>
            </header>

            <!-- X separado quando não existir título -->
            <button
              v-else
              type="button"
              class="tooltip-close tooltip-close-only"
              aria-label="Fechar"
              @click.stop="closeTooltip"
            >
              ×
            </button>

            <div class="tooltip-body">
              <!-- Imagem opcional -->
              <img
                v-if="node.image"
                :src="node.image"
                :alt="node.imageAlt || node.title || 'Imagem explicativa'"
                class="tooltip-img"
              />

              <!-- Legenda opcional da imagem -->
              <small
                 v-if="node.imageCaption"
                class="tooltip-image-caption"
              >
                {{ node.imageCaption }}
              </small>

              <!-- Descrição opcional -->
              <p
                v-if="getNodeText(node)"
                v-html="getNodeText(node)"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  /*   


    Coloque no default: 

    const TooltipImg = [
            {
                id: 1, 
                x: 100, y: 50, // x a direita, y para baixo 
                icon: 'fa fa-eye',
                title: 'Armadilha de Mosquito',
                image: './src/assets/images/modulo2/unidade8/tooltip/M2U8-F13.png', // Caminho ajustado para o arquivo correto
                description: 'Armadilha de Mosquito - Descrição'
            },
            {
                id: 2, x: 60, y: 50,  // x a direita, y para baixo
                icon: 'fa fa-hand-paper',
                title: 'Tootip 2',
                image: './src/assets/images/modulo2/unidade8/tooltip/M2U8-F13.png', // Caminho ajustado para o arquivo correto
                description: 'Descrição do Tootip 2.'
            },
            {
                id: 3, x: 45, y: 30,  // x a direita, y para baixo
                icon: 'fa fa-bolt',
                title: 'Tootip 3',
                description: 'Descrição do Tootip 3.'
            },
            {
                id: 4, x: 70, y: 20,  // x a direita, y para baixo
                icon: 'fa fa-shield',
                title: 'Tootip 4',
                description: 'Descrição do Tootip 4.'
            }

        ];

    Como usar:

    

*/


})