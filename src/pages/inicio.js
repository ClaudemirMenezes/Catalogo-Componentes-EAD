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
        <main class="inicio-page">
            <section class="inicio-hero">
                <div class="inicio-hero-copy">
                    <span class="inicio-eyebrow">BIBLIOTECA DE COMPONENTES</span>
                    <h1>Recursos interativos para cursos EAD</h1>
                    <p>Explore exemplos práticos, teste cada interação e copie o código para usar nos seus projetos.</p>
                    <div class="inicio-tags" aria-label="Características do catálogo">
                        <span>Vue 3</span>
                        <span>Demonstrações práticas</span>
                        <span>Código copiável</span>
                    </div>
                </div>
                <div class="inicio-hero-art">
                    <img src="./src/assets/eadpe.png" alt="EAD Pernambuco">
                </div>
            </section>

            <section class="inicio-explorar" aria-labelledby="inicio-explorar-titulo">
                <div class="inicio-section-heading">
                    <span class="inicio-eyebrow">SIMPLES DE USAR</span>
                    <h2 id="inicio-explorar-titulo">Comece por aqui</h2>
                    <p>Em poucos passos, você encontra e aproveita os componentes do catálogo.</p>
                </div>
                <div class="inicio-cards">
                    <article class="inicio-card">
                        <span class="inicio-card-number">01</span>
                        <h3>Encontre um componente</h3>
                        <p>Abra <strong>Componentes</strong> no menu lateral e escolha um item ou veja a lista completa.</p>
                    </article>
                    <article class="inicio-card">
                        <span class="inicio-card-number">02</span>
                        <h3>Experimente a demonstração</h3>
                        <p>Interaja com o exemplo para conhecer seu comportamento antes de levar para o seu curso.</p>
                    </article>
                    <article class="inicio-card">
                        <span class="inicio-card-number">03</span>
                        <h3>Copie e adapte o código</h3>
                        <p>Use o código exibido junto ao exemplo como ponto de partida para a sua implementação.</p>
                    </article>
                </div>
            </section>
            <!-- Seção de orientação para quem deseja contribuir com o catálogo.
            <aside class="inicio-contribuir">
                <div>
                    <h2>Quer adicionar um componente?</h2>
                    <p>Consulte o guia disponível no botão <strong>Como adicionar um componente</strong>, no topo da página.</p>
                </div>
                <span class="inicio-contribuir-selo">Guia para contribuidores</span>
            </aside>
            -->
        </main>
    `
}
