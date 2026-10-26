export default {
    props: {
        titulo: {
            type: String,
            default: ''
        },

        icone: {
            type: String,
            default: ''
        },

        destaque: {
            type: String,
            default: ''
        }
    },

    template: `
        <div class="card-info">

            <div
                v-if="titulo"
                class="card-info-titulo"
            >
                {{ titulo }}
            </div>

            <div
                v-if="icone || destaque"
                class="card-info-destaque"
            >

                <div
                    v-if="icone"
                    class="card-info-icone"
                >
                    <i :class="icone"></i>
                </div>

                <div
                    v-if="destaque"
                    class="card-info-valor"
                >
                    {{ destaque }}
                </div>

            </div>

            <div class="card-info-conteudo">
                <slot></slot>
            </div>

        </div>
    `
}