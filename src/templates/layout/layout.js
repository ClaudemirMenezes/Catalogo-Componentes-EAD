import { ref, inject, onMounted, onUnmounted } from 'vue'
import Menu from '../menu/menu.js'
import Content from '../content/content.js'
import useHexToRGBColor from '../../composables/hexToRGBColor.js'
import useRgbToHslColor from '../../composables/rgbToHSLColor.js'
import { Extras } from '../../register.js'

export default {
    mixins: [Extras],
    components: {
        Menu,
        Content
    },  
    setup() {
        const config = inject('config')

        const navItens = ref(null)

        const data = ref({
            statusMenuExtra: false,
            statusMenu: false,
            statusModal: false,
            currentModalPage: null,
            contextNavigation: null, 
            hideElements: false,
        })

        const navControl = ref({
            limit: 0
        })

        const methods = {
            setStatusMenu: () => {
                if (data.value.statusMenu) {
                    data.value.statusMenu = false
                } else {
                    data.value.statusMenu = true
                }
            },
            formatTitle: (title) => {
                if (!title) return ''

                return title.replace(
                    /Aedes aegypti/g,
                    '<em>Aedes aegypti</em>'
                )
            },
            setBackgroundMenu: () => {
                const {r, g, b} = useHexToRGBColor(config.color)
                const {h, s, l} = useRgbToHslColor(r, g, b)

                document.documentElement.style.setProperty('--base-color', `hsl(${h}, 50%, 40%)`)
                document.documentElement.style.setProperty('--secondary-color', `hsl(${h}, 39%, 46%)`)
                document.documentElement.style.setProperty('--auxiliary-color', `hsl(${h}, 53%, 66%)`)
            },
            setModalPage: (page) => { 
                data.value.statusModal = true
                data.value.currentModalPage = page
            },
            closeModalPage: () => {
                data.value.statusModal = false
                //data.value.currentModalPage = null
            },
            getContextNavigation: (context) => data.value.contextNavigation = context,
            setMediaQuery: () => {
                if (window.innerWidth <= 501) {
                    data.value.hideElements = true
                } else {
                    data.value.hideElements = false
                }
            },
            getStatusMenuExtra: (status) => data.value.statusMenuExtra = status,
            controlSideMenu: () => {
                if (window.innerWidth <= 914) {
                    data.value.statusMenu = true
                }
            },
            managerNavItens: () => {
                let totalWidthItens = 0, lengthItens = 0

                if (navItens.value) {
                    const widthWrapper = navItens.value.offsetWidth
                    const totalChildren = navItens.value.children.length
                    const children = navItens.value.children
    
                    totalWidthItens += children[0].offsetWidth
                    totalWidthItens += children[totalChildren - 1].offsetWidth
    
                    for (let i = 1; i < totalChildren - 1; i++) {
                        totalWidthItens += children[i].offsetWidth
                        lengthItens++
                        
                        if (totalWidthItens > widthWrapper) { 
                            totalWidthItens -= children[i].offsetWidth
                            lengthItens--
    
                            break 
                        }
                    }
                }

                return {
                    total: lengthItens
                }
            },
            changeLengthItensNav: () => {
                navControl.value.limit = methods.managerNavItens().total
            },
        }

        onMounted(() => {
            methods.setBackgroundMenu()
            methods.setMediaQuery()
            methods.controlSideMenu()
            methods.changeLengthItensNav()
            
            window.addEventListener('resize', methods.changeLengthItensNav)
            window.addEventListener('resize', methods.setMediaQuery)
        }) 

        onUnmounted(() => {
            window.removeEventListener('resize', methods.changeLengthItensNav)
            window.removeEventListener('resize', methods.setMediaQuery)
        })

        return {
            config,
            data,
            methods,
            navItens,
            navControl,
        }
    },
    template: `
        <div id="wrapper-layout">
            <div id="side-menu" :class="{ toggle_menu: data.statusMenu }">
                <div id="header-menu">
                    <div id="menu-title">Menu de tópicos</div>
                    <div @click="methods.setStatusMenu" class="menu-btn"></div>
                </div>
                <Menu @click-item="methods.getContextNavigation"></Menu>
            </div>
            <div id="content-area" :class="{ resize_content: data.statusMenu }">
                <div id="header-content-area">
                    <div id="wrapper-header-itens" class="clear-fix" :class="{ toggle_btn_menu: data.statusMenu }">
                        <div @click="methods.setStatusMenu" class="menu-btn"></div>
                        <div id="wrapper-header-nav" :class="{ resize_margin_header_nav: data.statusMenu, 'has-header-action': config.extra.some(item => item.page === 'ComoAdicionar') }">
                            <div id="header-content-title" v-html="methods.formatTitle(config.name)"></div>
                            <template v-if="config.extra.length">
                                <ul ref="navItens" id="header-nav-itens">
                                    <template v-for="(item, index) in config.extra">
                                        <li :class="{ header_hide_element: index > navControl.limit, 'header-add-component': item.page === 'ComoAdicionar' }" @click="methods.setModalPage(item.page)">{{ item.title }}</li>
                                    </template>
                                    <li :class="{ header_hide_element: (config.extra.length - 1) - navControl.limit == 0 }" >
                                        <Dropdown @status="methods.getStatusMenuExtra">
                                            <template v-slot:front>
                                                <span style="text-decoration: underline">Mais</span>
                                                <span :class="{ header_itens_arrow_animation: data.statusMenuExtra }" class="header-itens-arrow"></span>
                                            </template>
                                            <template v-slot:content>
                                                <template v-for="(item, index) in config.extra">
                                                    <li v-if="index > 0 && index > navControl.limit" @click="methods.setModalPage(item.page)">{{ item.title }}</li>
                                                </template>
                                            </template>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </template>
                        </div>
                    </div>
                </div>
                <Content :context="data.contextNavigation"></Content>
                <component @after-leave="data.currentModalPage = null" :is="data.currentModalPage" :open="data.statusModal" @close="methods.closeModalPage"></component>
            </div>
        </div>
    `
}