import {
    ref,
    onMounted,
    onBeforeUnmount
} from 'vue'

export default {
    name: 'FluxoEtapas',

    props: {
        etapas: {
            type: Array,
            required: true,
            default: () => []
        },

        intervalo: {
            type: Number,
            default: 2000
        }
    },

    setup(props) {

        const etapaAtual = ref(0)

        let timer = null


        /* =========================================
           IMAGENS DAS SETAS
           TROQUE OS CAMINHOS AQUI
        ========================================= */

        const setaDireita =
            './src/assets/images/icones/setaDireita.svg'

        const setaBaixo =
            './src/assets/images/icones/setaBaixo.svg'


        /* =========================================
           PARAR FLUXO
        ========================================= */

        const pararFluxo = () => {

            if (timer) {

                clearInterval(timer)

                timer = null
            }
        }


        /* =========================================
           INICIAR FLUXO
        ========================================= */

        const iniciarFluxo = () => {

            pararFluxo()

            etapaAtual.value = 0


            if (props.etapas.length <= 1) {
                return
            }


            timer = setInterval(() => {

                if (
                    etapaAtual.value <
                    props.etapas.length - 1
                ) {

                    etapaAtual.value++

                } else {

                    pararFluxo()

                }

            }, props.intervalo)
        }


        /* =========================================
           AO MONTAR
        ========================================= */

        onMounted(() => {

            iniciarFluxo()

        })


        /* =========================================
           AO DESTRUIR
        ========================================= */

        onBeforeUnmount(() => {

            pararFluxo()

        })


        return {
            etapaAtual,
            setaDireita,
            setaBaixo
        }
    },


    template: `

        <div class="fluxo-etapas-wrapper">

            <div class="fluxo-etapas">

                <template
                    v-for="(etapa, index) in etapas"
                    :key="index"
                >

                    <!-- =====================================
                         CONECTOR / SETAS
                    ====================================== -->

                    <Transition name="seta">

                        <div
                            v-if="
                                index > 0 &&
                                index <= etapaAtual
                            "
                            class="fluxo-conector"
                        >

                            <!-- SETA DESKTOP / TABLET -->

                            <img
                                :src="setaDireita"
                                class="fluxo-img-direita"
                                alt=""
                            >


                            <!-- SETA MOBILE -->

                            <img
                                :src="setaBaixo"
                                class="fluxo-img-baixo"
                                alt=""
                            >

                        </div>

                    </Transition>



                    <!-- =====================================
                         CARD
                    ====================================== -->

                    <Transition name="etapa">

                        <div
                            v-if="index <= etapaAtual"
                            class="fluxo-etapa"
                        >

                            <!-- IMAGEM -->

                            <div
                                v-if="etapa.imagem"
                                class="fluxo-imagem"
                            >

                                <img
                                    :src="etapa.imagem"
                                    :alt="
                                        etapa.titulo ||
                                        'Etapa do fluxo'
                                    "
                                >

                            </div>


                            <!-- TÍTULO -->

                            <h3 v-if="etapa.titulo">
                                {{ etapa.titulo }}
                            </h3>


                            <!-- TEXTO -->

                            <p v-if="etapa.texto">
                                {{ etapa.texto }}
                            </p>

                        </div>

                    </Transition>

                </template>

            </div>

        </div>

    `
}