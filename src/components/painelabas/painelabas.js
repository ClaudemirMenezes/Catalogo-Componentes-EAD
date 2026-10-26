import { ref } from 'vue'


export const PainelAbas = {
    template: `
            <div class="tabset">
                <slot name="abas">
                </slot>
                <div class="tab-panels">
                    <slot name="conteudo-abas">
                    </slot>
                </div>
            </div>
        
    `
}

export const Aba = {
    props: {
        id:String,
        control:String,
        active:Boolean,
    },
    setup() {
        const content = ref(null)
        const wrapperContent = ref(null)
        return {
            content,
            wrapperContent,
        }
    },
    template: `
        <input type="radio" name="tabset" :id="id" :aria-controls="control" :checked="active ? 'true' : 'false'">
        <label :for="id"><slot></slot></label>
    `
}

export const ConteudoAba = {
    props: {
        id:String,
    },
    setup() {
        const content = ref(null)
        const wrapperContent = ref(null)
        return {
            content,
            wrapperContent,
        }
    },
    template: `
        <section :id="id" class="tab-panel">
            <slot></slot>
        </section>
        
    `
}

/*
    Como utilizar o componente.

        O componente Painel aba possui dois slots:
            * abas - Onde deve-se clocar os subcomponentes Aba;
            * conteudo-abas - Onde deve-se colocar o conteudo de cada aba.
            
        O componente Aba possui três atributos:
            * id - Identifica a aba;
            * control - Indica qual conteúdo essa aba controla. O valor desse atributo deve ser o Id do conteúdo correspondente;
            * active - Indica que a aba será a ativa.
         
        O componente ConteudoAba possui um atributos:
            * id - Identifica o conteúdo. Deve ser informado no atributo control do componente Aba correspondente.
            

                    <PainelAbas>
                        <template v-slot:abas>
                            <Aba id="nav-tab1" control="nav-1" active>
                                Titulo Aba 1
                            </Aba>
                            <Aba id="nav-tab2" control="nav-2">
                                Titulo Aba 2
                            </Aba>
                            <Aba id="nav-tab3" control="nav-3">
                                Título Aba 3
                            </Aba>
                        </template>
                        <template v-slot:conteudo-abas>
                            <ConteudoAba id="nav-1">
                                Conteúdo Aba 1
                            </ConteudoAba>
                            <ConteudoAba id="nav-2">
                                Conteúdo Aba 2
                            </ConteudoAba>
                            <ConteudoAba id="nav-3">
                                Conteúdo Aba 3
                            </ConteudoAba>
                        </template>
                    </PainelAbas>

*/