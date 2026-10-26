import { onMounted } from 'vue'

export default {
    emits: ['getData'],
    setup(props, ctx) {
        const title = 'Caixa'

        const exemplos = {
            simples: `
                <Caixa titulo="Atenção" cor="roxo">
                    <ItemCaixa cor="roxo">Texto do primeiro item.</ItemCaixa>
                    <ItemCaixa cor="roxo">Texto do segundo item.</ItemCaixa>
                </Caixa>
            `,
        }

        onMounted(() => {
            ctx.emit('getData', title)
        })

        return { exemplos }
    },
    template: `
        <p>Caixa com título e itens marcados. Props: <b>titulo</b> e <b>cor</b> (roxo, blue, green, yellow, laranja).</p>

        <ExemploComponente titulo="Caixa roxa" :codigo="exemplos.simples">
            <Caixa titulo="Atenção" cor="roxo">
                <ItemCaixa cor="roxo">Texto do primeiro item.</ItemCaixa>
                <ItemCaixa cor="roxo">Texto do segundo item.</ItemCaixa>
            </Caixa>
        </ExemploComponente>
    `
}
