import { ref } from 'vue'

export const Lista = {
    props: {
        tipo: {
            type: String,
            default: ''
        }
    },
    template: `
        <ul :class="['lista', tipo]">
            <slot></slot>
        </ul>
    `
}

export const ItemLista = {
    setup() {
        const content = ref(null)
        const wrapperContent = ref(null) 

        return {
            content,
            wrapperContent
        }
    },
    template: `
        <li class="item-lista">
            <slot></slot>
        </li>
    `
}