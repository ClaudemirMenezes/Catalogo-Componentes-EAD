import { onMounted } from 'vue'

export default {
    emits: ['getData'],
    setup(props, ctx) {
        const title = 'Catálogo de Componentes'

        onMounted(() => {
            ctx.emit('getData', title)
        })
    },
    template: `
        <p>Este catálogo reúne os componentes Vue usados nos cursos EAD, com a demonstração de cada um e o código pronto para copiar.</p>
        <br>
        <p>Use o <b>menu de tópicos</b> para navegar entre os componentes. Para incluir um novo, veja <b>Como adicionar um componente</b> no topo da página.</p>
    `
}
