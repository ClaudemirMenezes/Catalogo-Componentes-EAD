import { onMounted } from 'vue'

export default {
    emits: ['getData'],
    setup(props, ctx) {
        const title = 'Destaque'

        const exemplos = {
            importante: `
                <Destaque tipo="importante">
                    <p>Este é um aviso importante para o usuário.</p>
                </Destaque>
            `,
            saibamais: `
                <Destaque tipo="saibamais">
                    <p>Saiba mais acessando <a href="https://www.fiocruz.br" target="_blank">o portal da Fiocruz</a>.</p>
                </Destaque>
            `,
        }

        onMounted(() => {
            ctx.emit('getData', title)
        })

        return { exemplos }
    },
    template: `
        <p>Bloco de destaque com ícone. Props: <b>tipo</b> (importante, saibamais) e <b>src</b> (ícone personalizado, opcional).</p>

        <ExemploComponente titulo="Importante" :codigo="exemplos.importante">
            <Destaque tipo="importante">
                <p>Este é um aviso importante para o usuário.</p>
            </Destaque>
        </ExemploComponente>

        <ExemploComponente titulo="Saiba mais" :codigo="exemplos.saibamais">
            <Destaque tipo="saibamais">
                <p>Saiba mais acessando <a href="https://www.fiocruz.br" target="_blank">o portal da Fiocruz</a>.</p>
            </Destaque>
        </ExemploComponente>
    `
}
