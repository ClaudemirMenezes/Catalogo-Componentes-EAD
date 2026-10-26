export default {
    template: `
        <Modal width="900px" scroll>
            <template v-slot:title>COMO ADICIONAR UM COMPONENTE</template>
            <template v-slot:content>
                <h3>1. Criar a pasta do componente</h3>
                <p><code>src/components/meuComp/meuComp.js</code> e <code>src/components/meuComp/style.css</code></p>
                <br>
                <h3>2. Registrar o JS em <code>src/global.js</code></h3>
                <pre>import MeuComp from './components/meuComp/meuComp.js'
...
app.component('MeuComp', MeuComp)</pre>
                <br>
                <h3>3. Registrar o CSS em <code>src/components/style.css</code></h3>
                <pre>@import url(./meuComp/style.css);</pre>
                <br>
                <p>Pronto: <code>&lt;MeuComp&gt;</code> já funciona em qualquer página.</p>
                <br>
                <h3>Para aparecer no catálogo (opcional)</h3>
                <p>a) Criar a página <code>src/pages/componentes/meuComp.js</code> (copie uma existente);<br>
                b) Registrar em <code>src/register.js</code> (<code>const Comp_meuComp = defineAsyncComponent(...)</code> + incluir em <code>Pages</code>);<br>
                c) Adicionar o grupo em <code>config.js</code> → <code>pages: { meuComp: ['Comp_meuComp'] }</code>;<br>
                d) Adicionar no menu <code>src/templates/menu/menu.js</code> → <code>&lt;Item links="meuComp"&gt;Meu Comp&lt;/Item&gt;</code>.</p>
            </template>
        </Modal>
    `
}
