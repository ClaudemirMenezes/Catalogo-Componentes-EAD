import { computed, ref } from 'vue'

// Remove a indentação comum para o código ficar alinhado à esquerda
const limparIndentacao = (texto) => {
    const linhas = texto.replace(/^\n+|\s+$/g, '').split('\n')
    const recuo = Math.min(...linhas.filter(l => l.trim()).map(l => l.match(/^\s*/)[0].length))
    return linhas.map(l => l.slice(recuo)).join('\n')
}

export default {
    props: {
        titulo: String,
        codigo: { type: String, default: '' },
    },
    setup(props) {
        const copiado = ref(false)
        const codigoFormatado = computed(() => limparIndentacao(props.codigo))

        const copiar = () => {
            navigator.clipboard.writeText(codigoFormatado.value).then(() => {
                copiado.value = true
                setTimeout(() => copiado.value = false, 1500)
            })
        }

        return { codigoFormatado, copiado, copiar }
    },
    template: `
        <div class="exemplo-componente">
            <div class="exemplo-componente-titulo" v-if="titulo">{{ titulo }}</div>
            <div class="exemplo-componente-demo">
                <slot></slot>
            </div>
            <div class="exemplo-componente-codigo" v-if="codigo">
                <button class="exemplo-componente-copiar" @click="copiar">{{ copiado ? 'Copiado!' : 'Copiar' }}</button>
                <pre><code>{{ codigoFormatado }}</code></pre>
            </div>
        </div>
    `
}
/*
    Como utilizar o componente:
        Mostra a demonstração (slot) e, abaixo, o código de uso com botão "Copiar".

        <ExemploComponente titulo="Card azul" :codigo="exemplo">
            <Card color="blue">Conteúdo</Card>
        </ExemploComponente>

        (na página: const exemplo = `<Card color="blue">Conteúdo</Card>`)
*/
