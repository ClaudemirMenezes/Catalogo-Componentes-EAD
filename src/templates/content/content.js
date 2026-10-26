import { inject, onMounted, ref, watch, onUnmounted } from 'vue'
import { Pages } from '../../register.js'
import Footer from '../footer/footer.js'
import { getIndexProperty, getPositionNavigation, getTextToIndex }  from '../../composables/navigation.js'
import ppu from '../../composables/ppu.js'

export default {
    mixins: [Pages],
    props: ['context'],
    components: {
        Footer
    },
    setup(props, ctx) {
        const config = inject('config')
        const globalNavigation = inject('navigation')
        const PPUdatabase = inject('ppu')

        const titleArea = ref(null)
        const pageWrapper = ref(null)
        const footer = ref(null)
        const contentWrapper = ref(null)

        const data = ref({
            mainTitle: 'Titulo da Página',
        })

        const methods = {
            setDataNavigation: (navigation) => {
                globalNavigation.value.previous = navigation.previous
                globalNavigation.value.current = navigation.current
                globalNavigation.value.next = navigation.next
            },
            managerIndexNavigation: () => {
                const properties = getIndexProperty(config.index)
                const navigation = getPositionNavigation(config.pages[properties.group], properties.page)

                globalNavigation.value.context = properties.group
                methods.setDataNavigation(navigation)
            },
            goToPage: (position) => {
                let navigation, pages

                if (globalNavigation.value[position]) {
                    navigation = getPositionNavigation(config.pages[globalNavigation.value.context], globalNavigation.value[position])

                    methods.setDataNavigation(navigation)
                } else {
                    navigation = getPositionNavigation(Object.keys(config.pages), globalNavigation.value.context)

                    if (navigation[position]) {
                        pages = config.pages[navigation[position]]
                        globalNavigation.value.context = navigation[position]
    
                        if (position == 'previous') {
                            navigation = getPositionNavigation(pages, pages[pages.length - 1])
                        } else {
                            navigation = getPositionNavigation(pages, pages[0])
                        }
    
                        methods.setDataNavigation(navigation)
                    }
                }
            },
            getMainTitle: (title) => data.value.mainTitle = title,
            setHeightContent: () => { 
                pageWrapper.value.style.minHeight = 'calc(100% - (17% + ' + titleArea.value.offsetHeight + 'px))' 
            }
        }

        watch(() => props.context, (context) => {
            context = getIndexProperty(context).group
            const pages = config.pages[context]
            const navigation = getPositionNavigation(pages, pages[0])
            globalNavigation.value.context = context
            methods.setDataNavigation(navigation)
        })

        watch(() => globalNavigation.value.current, (page) => {
            const pages = config.pages
            const context = globalNavigation.value.context;
            let navigationGroup = getPositionNavigation(Object.keys(pages), context)
            let navigationPage =  getPositionNavigation(pages[context], page)

            globalNavigation.value.totalPages = pages[context].length
            globalNavigation.value.currentPage = getTextToIndex(pages[context], page) + 1  
            
            if (!navigationPage.previous && !navigationGroup.previous) {
                globalNavigation.value.btnPrevious = false
            } else {
                globalNavigation.value.btnPrevious = true
            }

            if (!navigationPage.next && !navigationGroup.next) {
                globalNavigation.value.btnNext = false
            } else {
                globalNavigation.value.btnNext = true
            }
 
            globalNavigation.value.title = config.titleGroup[context]

            contentWrapper.value.scrollTop = 0

            // set status pages ppu
            ppu.setStatusPage(PPUdatabase.value, context, globalNavigation.value.currentPage - 1)
            ppu.setPercentage(PPUdatabase.value, config)
            ppu.setNavigation(context + '(' + page + ')')
        })

        onMounted(() => { 
            methods.managerIndexNavigation() 
    
            window.addEventListener('load', methods.setHeightContent)
            window.addEventListener('resize', methods.setHeightContent)
        })

        onUnmounted(() => {
            window.removeEventListener('load', methods.setHeightContent)
            window.removeEventListener('resize', methods.setHeightContent)
        })

        return {
            methods,
            data,
            globalNavigation,
            titleArea,
            pageWrapper,
            footer,
            contentWrapper,
        }
    },
    template: `
        <div id="unasus-page-container">
            <div v-show="globalNavigation.btnNext" @click="methods.goToPage('next')" class="fixed-button next"></div>
            <div v-show="globalNavigation.btnPrevious" @click="methods.goToPage('previous')" class="fixed-button previous"></div>
            <div ref="contentWrapper" id="unasus-content-wrapper">
                <div ref="titleArea" id="unasus-title-area">
                    <div id="unasus-title-text">
                        <span>
                            <span v-html="globalNavigation.title"></span>
                        </span>
                        <h2 v-html="data.mainTitle"></h2>
                    </div>
                    <div id="unasus-pagination">
                        <span><div v-show="globalNavigation.btnPrevious" @click="methods.goToPage('previous')" class="button previous"></div><span>Página</span></span>
                        <span>{{ globalNavigation.currentPage }}</span>
                        <span>/</span>
                        <span>{{ globalNavigation.totalPages }} <div :class="{ hide_button_navigation: !globalNavigation.btnNext }" @click="methods.goToPage('next')" class="button next"></div></span>
                    </div>
                </div>
                <div ref="pageWrapper" id="unasus-page-wrapper" class="unasus-page-wrapper-margin">
                    <component :is="globalNavigation.current" @get-data="methods.getMainTitle"></component>
                </div>
                <Footer ref="footer" id="unasus-page-footer"></Footer>
            </div>
        </div>
    `
}