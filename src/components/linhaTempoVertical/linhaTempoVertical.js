export const TimeLineVertical = {
    name: 'TimeLineVertical',

    props: {
        titulo: {
            type: String,
            default: ''
        }
    },

    template: `
        <div class="timeline-vertical-wrapper">

            <div
                v-if="titulo"
                class="timeline-vertical-titulo"
            >
                {{ titulo }}
            </div>

            <div class="timeline-vertical">
                <slot></slot>
            </div>

        </div>
    `
}


export const TimeLineVerticalItem = {
    name: 'TimeLineVerticalItem',

    props: {
        ano: {
            type: String,
            required: true
        },

        lado: {
            type: String,
            default: 'left',
            validator: value => ['left', 'right'].includes(value)
        }
    },

    template: `
        <div
            :class="[
                'timeline-vertical-item',
                'timeline-' + lado
            ]"
        >

            <div class="timeline-vertical-conteudo">

                <div class="timeline-vertical-ano">
                    {{ ano }}
                </div>

                <div class="timeline-vertical-texto">
                    <slot></slot>
                </div>

            </div>

            <div class="timeline-vertical-ponto"></div>

        </div>
    `
}