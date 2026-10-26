import { ref } from 'vue'

export const PrettyList = {
    props: {
        tipo: {
            type: String,
            default: ''
        }
    },
    template: `
        <div :class="['grupo-marcadores', tipo]">
            <slot></slot>
        </div>
    `
}


export const PrettyItem = {
    props: {
        header:String,
        color: {
            type: String,
            default: 'blue'
        },
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
        <div class="marcador">
            <span class="header" v-bind:class="{'fundo-verde-claro':color==='cor4','fundo-verde-medio':color==='cor3','fundo-amareloEAD':color==='cor2','fundo-azulEAD':color==='cor1','fundo-azul': color === 'blue','fundo-verde': color === 'green','fundo-amarelo': color === 'yellow','fundo-laranja': color === 'orange','fundo-vermelho': color === 'red','fundo-lilas': color === 'purple' }">
                <slot name="header"></slot>
                {{ header }}
            </span>
            <span class="content">
                <slot></slot>
            </span>
        </div>
    `
}


/*   

    Como usar:

    As cores possíveis são: blue,green,orange,yellow,purple.
    Tamanho original
    <PrettyList>
        <PrettyItem color="green" header="1">
            Garantir e provmover a atenção integral à saúde de adolescentes internaos em <dica texto="Unidades Socioeducativas">USE</dica>;
        </PrettyItem>
        <PrettyItem color="orange" header="2"> 
            Organizar os serviços de saúde dentro dos princípios do SUS e do SINASE;
        </PrettyItem>
        <PrettyItem color="purple" header="3">
            Desenvolver ações de promoção da saúde, prevenção de agravos e doenças e recuperação da saúde;
        </PrettyItem>
        <PrettyItem color="yellow" header="4">
            Cumprir o princípio da incompletude institucional.
        </PrettyItem>
    </PrettyList>

    Tamanho menor
    <PrettyList tipo="pequeno">
        <PrettyItem color="green" header="1">
            Texto...
        </PrettyItem>
    </PrettyList>
  

*/