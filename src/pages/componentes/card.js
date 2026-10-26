import { onMounted } from 'vue'

export default {
    emits: ['getData'],
    setup(props, ctx) {
        const title = 'Card'

        const exemplos = {
            simples: `
                <Card color="green" rounded>
                    Texto dentro do card.
                </Card>
            `,
            cores: `
                <Card color="yellow">Amarelo</Card>
                <Card color="purple">Lilás</Card>
                <Card color="EAD">EAD</Card>
            `,
        }

        onMounted(() => {
            ctx.emit('getData', title)
        })

        return { exemplos }
    },
    template: `
        <p>Bloco com fundo colorido. Props: <b>color</b> (white, EAD, EAD-amarelo, green, yellow, orange, red, purple) e <b>rounded</b> (cantos arredondados).</p>

        <ExemploComponente titulo="Card verde arredondado" :codigo="exemplos.simples">
            <Card color="green" rounded>
                Texto dentro do card.
            </Card>
        </ExemploComponente>

        <ExemploComponente titulo="Variações de cor" :codigo="exemplos.cores">
            <Card color="yellow">Amarelo</Card>
            <Card color="purple">Lilás</Card>
            <Card color="EAD">EAD</Card>
        </ExemploComponente>
    `
}
