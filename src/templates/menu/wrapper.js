import { ref, inject, watch, onMounted } from 'vue'
import { Random } from '../../composables/randon.js'

const Item = {
    props: {
        links: String,
    },
    setup(props, ctx) {
        const menu = inject('menu')
        const PPUdatabase = inject('ppu')
        const globalNavigation = inject('navigation')
        const config = inject('config')

        const title = ref(null)

        const data = ref({
            isChecked: false,
        })

        const methods = {
            setTitleToGroup: () => {
                const itemTitle = title.value.children[0].innerHTML
                // Items nested under a <Group> get the module name prefixed (e.g. "Módulo I / Unidade 1")
                const groupEl = title.value.closest('.group')
                const moduleTitle = groupEl ? groupEl.children[0].children[1].innerHTML : null
                const fullTitle = moduleTitle ? `${moduleTitle} / ${itemTitle}` : itemTitle

                if (!config.hasOwnProperty('titleGroup')) {
                    config.titleGroup = {}
                }

                config.titleGroup[props.links] = fullTitle
            },
            handleGetData: () => { menu.value.item = props.links + '(' + Random(5) + ')' },
            setChecked: () => {
                const pages = PPUdatabase.value.statusPages[props.links] 

                const pagesLength =  pages ? pages.length : 0
                let statusChecked = false
    
                for (let i = 0; i < pagesLength; i++) {
                    if (pages[i]) {
                        statusChecked = true
                    } else {
                        statusChecked = false
                        break
                    }
                }
    
                if (statusChecked) { 
                    data.value.isChecked = true
                }
            }
        }        

        watch(() => PPUdatabase.value.statusPagesExtra[props.links], () => data.value.isChecked = true)

        onMounted(() => {
            methods.setTitleToGroup()
            methods.setChecked()
        })

        return {
            data,
            methods,
            title,
        }
    },
    template: `
        <li ref="title" @click="methods.handleGetData">
            <div class="unasus-side-menu-title-item"><slot></slot></div>
            <div v-show="data.isChecked" class="unasus-side-menu-checked"></div>
        </li>
    `
}

const Group = {
    props: {
        name: String,
    },
    setup(props, ctx) {
        const content = ref(null)

        const data = ref({
            isOpen: false,
        })

        const methods = {
            calcHeightContent: (el) => {
                let totalHeight = 0;

                for (let i = 0; i < el.children.length; i++) {
                    if (el.children[i].getAttribute('class') == 'group') {
                        totalHeight += el.children[i].offsetHeight 
                        + methods.calcHeightContent(el.children[i]) 
                        + methods.calcHeightContent(el.children[i].children[1])
                    } else {
                        totalHeight += el.children[i].offsetHeight
                    }     
                }

                return totalHeight
            },
            setHeightContent: () => {
                const parent = content.value

                if (data.value.isOpen) {
                    data.value.isOpen = false

                    parent.style.maxHeight = methods.calcHeightContent(parent) + 'px'
                } else {
                    data.value.isOpen = true
                    parent.style.maxHeight = '0px'
                }
            }
        }

        onMounted(() => {
            methods.setHeightContent()

            setInterval(() => {
                if (!data.value.isOpen) {
                    const parent = content.value
                    parent.style.maxHeight = methods.calcHeightContent(parent) + 'px'
                }
            }, 1)
        })

        return {
            data,
            methods,
            content,
        }
    },
    template: `
        <li class="group">
            <div @click="methods.setHeightContent" class="unasus-side-menu-wrapper-front">
                <span  :class="{ unasus_side_menu_wrapper_arrow_effect: !data.isOpen }" class="arrow"></span>
                <span>{{ name }}</span>
            </div>
            <ul ref="content">
                <slot></slot>
            </ul>
        </li>
    `
}

const Menu = {
    template: `
        <ul id="unasus-side-menu-wrapper">
            <slot></slot>
        </ul>
    `
}

export { Item, Group, Menu };