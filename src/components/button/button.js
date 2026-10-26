export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        tipo: {
            type: String,
            default: ''
        }
    },

    template: `
        <button
            type="button"
            :disabled="disabled"
            :class="[
                'unasus-button',
                tipo === 'modulo' ? 'unasus-button-modulo' : ''
            ]"
        >
            <slot></slot>
        </button>
    `
}