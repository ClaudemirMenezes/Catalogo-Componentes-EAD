import { onMounted } from 'vue'

export default {
    emits: ['getData'],
    setup(props, ctx) {
        const title = 'Accordion'

        const exemplos = {
            simples: `
                <Accordion>
                    <Bellow>
                        <template v-slot:title>Primeiro item</template>
                        <template v-slot:content><p>Conteúdo do primeiro item.</p></template>
                    </Bellow>
                    <Bellow>
                        <template v-slot:title>Segundo item</template>
                        <template v-slot:content><p>Conteúdo do segundo item.</p></template>
                    </Bellow>
                </Accordion>
            `,
        }

        onMounted(() => {
            ctx.emit('getData', title)
        })

        return { exemplos }
    },
    template: `
        <p>Lista de itens que abrem e fecham. Cada <b>Bellow</b> tem os slots <b>title</b> e <b>content</b>.</p>

        <ExemploComponente titulo="Accordion com dois itens" :codigo="exemplos.simples">
            <Accordion>
                <Bellow>
                    <template v-slot:title>Primeiro item</template>
                    <template v-slot:content><p>Conteúdo do primeiro item.</p></template>
                </Bellow>
                <Bellow>
                    <template v-slot:title>Segundo item</template>
                    <template v-slot:content><p>Conteúdo do segundo item.</p></template>
                </Bellow>
            </Accordion>
        </ExemploComponente>
    `
}
