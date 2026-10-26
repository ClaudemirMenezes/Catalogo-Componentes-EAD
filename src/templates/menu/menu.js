import { provide, inject, watch, ref } from 'vue'
import { Item, Group, Menu } from './wrapper.js'

export default {
    emits: ['clickItem'],
    setup(props, ctx) {
        const data = ref({
            item: null,
        })

        const PPU = inject('ppu')
        const menu = ref(null)
        
        provide('menu', data)

        watch(() => data.value.item, (data) => ctx.emit('clickItem', data))

        return {
            menu,
            PPU,
        }
    },
    components: {
        Item,
        Group,
        Menu
    },

    template: `
        <Menu ref="menu">
            <div class="unasus-especial-menu-item-wrapper">
                <div class="progress-container">
                    <p class="progress-text">Seu progresso</p>
                    <div class="progress-circles">
                        <svg class="progress-svg" viewBox="0 0 36 36">
                            <path
                                class="progress-bg"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                class="progress-bar"
                                :stroke-dasharray="(PPU.status.LTIvalue * 100).toFixed(1) + ', 100'"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <span class="progress-value">{{ (PPU.status.LTIvalue * 100).toFixed(0) }}%</span>
                    </div>
                </div>
            </div>
            <Item links="inicio">Início</Item>
            <Group name="Componentes">
                <Item links="card">Card</Item>
                <Item links="caixa">Caixa</Item>
                <Item links="accordion">Accordion</Item>
                <Item links="destaque">Destaque</Item>
                <Item links="mais">Mais componentes</Item>
            </Group>
        </Menu>
    `,
}