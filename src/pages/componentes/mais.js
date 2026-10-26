import { computed, onMounted, ref } from 'vue'

export default {
    emits: ['getData'],
    setup(props, ctx) {
        const title = 'Mais componentes'
        const modalAberto = ref(false)
        const componenteSelecionado = ref('todos')
        const busca = ref('')

        const componentes = [
            { id: 'card', titulo: 'Card' },
            { id: 'caixa', titulo: 'Caixa' },
            { id: 'accordion', titulo: 'Accordion' },
            { id: 'destaque', titulo: 'Destaque' },
            { id: 'avatar', titulo: 'Avatar de conversa' },
            { id: 'botao', titulo: 'Botão' },
            { id: 'image', titulo: 'Imagem com zoom' },
            { id: 'conteudo', titulo: 'Conteúdo em duas colunas' },
            { id: 'separador', titulo: 'Separador' },
            { id: 'lista', titulo: 'Lista' },
            { id: 'prettyList', titulo: 'Lista com marcadores' },
            { id: 'accordionCompleto', titulo: 'Accordion completo' },
            { id: 'timelineInterativa', titulo: 'Linha do tempo interativa' },
            { id: 'timeline', titulo: 'Linha do tempo vertical' },
            { id: 'cardInfo', titulo: 'Card de informação' },
            { id: 'painelAbas', titulo: 'Painel de abas' },
            { id: 'progressBar', titulo: 'Barra de progresso' },
            { id: 'imagemLegenda', titulo: 'Imagem com legenda e fonte' },
            { id: 'flipCard', titulo: 'Card que vira' },
            { id: 'grupoBotoes', titulo: 'Grupo de botões' },
            { id: 'testeUmaOpcao', titulo: 'Teste de uma alternativa' },
            { id: 'testeMultiplasOpcoes', titulo: 'Teste de múltiplas alternativas' },
            { id: 'testeDropdown', titulo: 'Teste de associação' },
            { id: 'testeAberto', titulo: 'Campo de resposta aberta' },
            { id: 'video', titulo: 'Player de vídeo' },
            { id: 'chat', titulo: 'Mensagem de chat' },
            { id: 'fluxoProcesso', titulo: 'Fluxo de processo clicável' },
            { id: 'fluxoEtapas', titulo: 'Fluxo de etapas automático' },
            { id: 'carousel', titulo: 'Carrossel' },
            { id: 'quadroClicavel', titulo: 'Quadro com abas' },
            { id: 'hotspot', titulo: 'Imagem com pontos interativos' },
            { id: 'dropdown', titulo: 'Menu suspenso' },
            { id: 'navigation', titulo: 'Navegação para outra página' },
            { id: 'modal', titulo: 'Modal' },
            { id: 'dragAndDrop', titulo: 'Arrastar e soltar' },
            { id: 'quiz', titulo: 'Quiz' },
            { id: 'tabelaVertical', titulo: 'Tabela vertical' },
            { id: 'tabelaHorizontal', titulo: 'Tabela horizontal' },
            { id: 'tabelaMultiplas', titulo: 'Tabela de múltiplos períodos' },
        ]

        const componentesFiltrados = computed(() => {
            const termo = busca.value.trim().toLocaleLowerCase('pt-BR')
            return componentes.filter(componente =>
                componente.titulo.toLocaleLowerCase('pt-BR').includes(termo)
            )
        })

        const visivel = id =>
            componenteSelecionado.value === 'todos' ||
            componenteSelecionado.value === id

        const exemplos = {
            avatar: `<Avatar src="./src/assets/images/personas/avatar-professora.png" right color="roxo_claro">Olá! Este é um exemplo de conversa.</Avatar>`,
            card: `<Card color="green" rounded>Texto dentro do card.</Card>`,
            caixa: `<Caixa titulo="Atenção" cor="roxo"><ItemCaixa cor="roxo">Texto do item.</ItemCaixa></Caixa>`,
            accordion: `<Accordion><Bellow><template #title>Primeiro item</template><template #content><p>Conteúdo do item.</p></template></Bellow></Accordion>`,
            destaque: `<Destaque tipo="importante"><p>Este é um aviso importante.</p></Destaque>`,
            botao: `<Button>Continuar</Button>`,
            image: `<Image src="./src/assets/images/tela_inicial.png">Clique na imagem para ampliar.</Image>`,
            conteudo: `<Conteudo two_columns><template #column1>Coluna 1</template><template #column2>Coluna 2</template></Conteudo>`,
            separador: `<Separador :items="2" />`,
            lista: `<Lista><ItemLista>Primeiro item</ItemLista><ItemLista>Segundo item</ItemLista></Lista>`,
            prettyList: `<PrettyList><PrettyItem color="green" header="1">Primeiro destaque</PrettyItem><PrettyItem color="purple" header="2">Segundo destaque</PrettyItem></PrettyList>`,
            accordionCompleto: `<AccordionCompleto><BellowCompleto><template #title>O que é este componente?</template><template #content><p>Um exemplo de conteúdo expansível.</p></template></BellowCompleto></AccordionCompleto>`,
            timeline: `<TimeLineVertical titulo="Linha do tempo"><TimeLineVerticalItem ano="2024">Primeiro acontecimento.</TimeLineVerticalItem><TimeLineVerticalItem ano="2025" lado="right">Segundo acontecimento.</TimeLineVerticalItem></TimeLineVertical>`,
            timelineInterativa: `<Timeline><template #title>Linha do tempo</template><Moment><template #title>2025 — Ação realizada</template><template #content><p>Detalhes do acontecimento.</p></template></Moment></Timeline>`,
            cardInfo: `<GrupoCardInfo><CardInfo titulo="Atendimentos" destaque="120">Atendimentos realizados no período.</CardInfo></GrupoCardInfo>`,
            painelAbas: `<PainelAbas><template #abas><Aba id="aba-1" control="conteudo-1" active>Primeira aba</Aba><Aba id="aba-2" control="conteudo-2">Segunda aba</Aba></template><template #conteudo-abas><ConteudoAba id="conteudo-1">Conteúdo 1</ConteudoAba><ConteudoAba id="conteudo-2">Conteúdo 2</ConteudoAba></template></PainelAbas>`,
            progressBar: `<ProgressBar />`,
            imagemLegenda: `<ImagemLegenda imagem="./src/assets/images/tela_inicial.png" legenda="Introdução às tecnologias de controle vetorial." fonte="Arquivo do projeto" alt="Ilustração de um mosquito e título sobre controle vetorial" />`,
            flipCard: `<FlipCards><FlipCard><template #frente><h3>Frente do card</h3></template><template #verso><p>Conteúdo revelado ao virar.</p></template></FlipCard></FlipCards>`,
            grupoBotoes: `<GrupoBotoes><Button tipo="modulo">Primeira opção</Button><Button tipo="modulo">Segunda opção</Button><Button tipo="modulo">Terceira opção</Button></GrupoBotoes>`,
            testeUmaOpcao: `<One-Option-Test id="catalogo-opcao-unica" :options="opcoesUnica">Qual medida ajuda a prevenir doenças?</One-Option-Test>`,
            testeMultiplasOpcoes: `<Multi-Options-Test id="catalogo-multiplas-opcoes" :options="opcoesMultiplas">Selecione as medidas de prevenção.</Multi-Options-Test>`,
            testeDropdown: `<Dropdown-Option-Test id="catalogo-associacao" :options="opcoesDropdown">Complete a frase escolhendo a opção adequada.</Dropdown-Option-Test>`,
            testeAberto: `<Open-Test id="catalogo-resposta-aberta" :max="180">Explique uma medida de prevenção.</Open-Test>`,
            video: `<Player-Video src="./videos/video_360p.mp4" thumbnail="./src/assets/images/tela_inicial.png" :resolutions="['360p']" default="360p" />`,
            chat: `<Chat character="teacher" image="./src/assets/images/personas/avatar-professora.png" message="Olá! Este é um exemplo de mensagem." />`,
            fluxoProcesso: `<FluxoProcesso :etapas="[{ titulo: 'Planejar', texto: 'Defina o objetivo.' }, { titulo: 'Executar', texto: 'Realize a atividade.' }]" />`,
            fluxoEtapas: `<FluxoEtapas :intervalo="4000" :etapas="[{ titulo: 'Etapa 1', texto: 'Primeira etapa.' }, { titulo: 'Etapa 2', texto: 'Segunda etapa.' }]" />`,
            carousel: `<CaixaImgSlider :autoPlay="false" :items="[{ title: 'Primeiro slide', text: 'Descrição do primeiro slide.' }, { title: 'Segundo slide', text: 'Descrição do segundo slide.' }]" />`,
            quadroClicavel: `<QuadroClicavel :tabData="[{ name: 'Atenção básica', content: 'Ações de promoção e prevenção.' }, { name: 'Vigilância', content: 'Acompanhamento de riscos e agravos.' }]" />`,
            hotspot: `<HotspotImage backgroundImage="./src/assets/images/tela_inicial.png" :nodes="[{ id: 1, x: 50, y: 50, label: '+', title: 'Ponto interativo', description: 'Informação apresentada ao selecionar o marcador.' }]" />`,
            dropdown: `<Dropdown><template #front><span>Ver opções</span></template><template #content><li>Opção 1</li><li>Opção 2</li></template></Dropdown>`,
            navigation: `<Navigation go="inicio(Inicio)">Voltar ao início</Navigation>`,
            modal: `<button @click="modalAberto = true">Abrir modal</button><Modal :open="modalAberto" @close="modalAberto = false"><template #title>Exemplo de modal</template><template #content><p>Conteúdo da janela.</p></template></Modal>`,
            dragAndDrop: `<DragAndDrop id="catalogo-drag-demo" :phrases="frasesDrag" :items="itensDrag" />`,
            quiz: `<Quiz id="catalogo-quiz-demo" title="Pergunta de exemplo" :questions="questoes"><p>Selecione uma resposta e envie para ver o feedback.</p></Quiz>`,
            tabelaVertical: `<TabelaVertical :rows="[['Acolhimento', 'Escuta inicial'], ['Avaliação', 'Identificação das necessidades']]"><template #headers><th>Etapa</th><th>Descrição</th></template></TabelaVertical>`,
            tabelaHorizontal: `<TabelaHorizontal :tableHeaders="['Indicador', '2024', '2025']" :tableRows="[['Atendimentos', '80', '120'], ['Unidades', '4', '6']]" />`,
            tabelaMultiplas: `<TabelaMultiplas :tableHeaders="['Local', '2024', '2025']" :tableRows="[['Unidade A', '12', '18'], ['Unidade B', '9', '15']]" />`,
        }

        const frasesDrag = [[
            { type: 'text', value: 'A vacinação contribui para a ' },
            { type: 'blank', id: 1 },
            { type: 'text', value: ' de doenças.' },
        ]]

        const itensDrag = [{
            id: 'prevencao',
            title: 'prevenção',
            field: 0,
            status: 'blank',
            response: 1,
            feedback: 'Vacinas ajudam a prevenir doenças.',
        }]

        const questoes = [{
            question: 'Qual é uma medida importante de prevenção?',
            answers: [
                { statement: 'Manter a vacinação em dia.', status: true, feedback: 'Correto! A vacinação é uma medida preventiva.' },
                { statement: 'Ignorar orientações de saúde.', status: false, feedback: 'Revise as medidas de prevenção.' },
            ],
        }]

        const opcoesUnica = [
            { statement: 'Manter a vacinação em dia.', status: true, feedback: 'Correto! A vacinação ajuda a prevenir doenças.' },
            { statement: 'Ignorar orientações de saúde.', status: false, feedback: 'Essa atitude não previne doenças.' },
        ]

        const opcoesMultiplas = [
            { statement: 'Manter a vacinação em dia.', status: true },
            { statement: 'Higienizar as mãos.', status: true },
            { statement: 'Compartilhar objetos de uso pessoal.', status: false },
        ]

        const opcoesDropdown = [{
            statement: 'A vacinação é uma forma de:',
            options: [
                { name: 'prevenção', status: true, feedback: 'Correto! Vacinas ajudam a prevenir doenças.' },
                { name: 'tratamento caseiro', status: false, feedback: 'Selecione uma medida preventiva.' },
            ],
        }]

        onMounted(() => ctx.emit('getData', title))

        return {
            componentes,
            componentesFiltrados,
            componenteSelecionado,
            busca,
            visivel,
            exemplos,
            frasesDrag,
            itensDrag,
            questoes,
            opcoesUnica,
            opcoesMultiplas,
            opcoesDropdown,
            modalAberto,
        }
    },
    template: `
        <div class="catalogo-componentes">
            <aside class="catalogo-sidebar" aria-label="Navegação pelos componentes">
                <div class="catalogo-sidebar-heading">
                    <span class="catalogo-eyebrow">CATÁLOGO</span>
                    <h3>Componentes</h3>
                    <p>{{ componentes.length }} demonstrações</p>
                </div>
                <label class="catalogo-busca">
                    <span>Buscar componente</span>
                    <input v-model="busca" type="search" placeholder="Ex.: botão, tabela..." />
                </label>
                <nav class="catalogo-nav">
                    <button type="button" class="catalogo-nav-item catalogo-nav-todos"
                        :class="{ ativo: componenteSelecionado === 'todos' }"
                        :aria-pressed="componenteSelecionado === 'todos'"
                        @click="componenteSelecionado = 'todos'">
                        <span>Mostrar todos</span><span class="catalogo-nav-count">{{ componentes.length }}</span>
                    </button>
                    <button v-for="componente in componentesFiltrados" :key="componente.id"
                        type="button" class="catalogo-nav-item"
                        :class="{ ativo: componenteSelecionado === componente.id }"
                        :aria-pressed="componenteSelecionado === componente.id"
                        @click="componenteSelecionado = componente.id">{{ componente.titulo }}</button>
                    <p v-if="!componentesFiltrados.length" class="catalogo-sem-resultados">Nenhum componente encontrado.</p>
                </nav>
            </aside>

            <main class="catalogo-main">
                <header class="catalogo-intro">
                    <span class="catalogo-eyebrow">BIBLIOTECA DE INTERFACE</span>
                    <h2>Explore os componentes</h2>
                    <p>Veja cada demonstração e copie o código para usar no seu conteúdo.</p>
                    <button v-if="componenteSelecionado !== 'todos'" type="button" class="catalogo-limpar-filtro"
                        @click="componenteSelecionado = 'todos'">Limpar filtro</button>
                </header>

                <div class="catalogo-exemplos">
                    <ExemploComponente v-if="visivel('card')" titulo="Card" :codigo="exemplos.card"><Card color="green" rounded>Texto dentro do card.</Card></ExemploComponente>
                    <ExemploComponente v-if="visivel('caixa')" titulo="Caixa" :codigo="exemplos.caixa"><Caixa titulo="Atenção" cor="roxo"><ItemCaixa cor="roxo">Texto do item.</ItemCaixa></Caixa></ExemploComponente>
                    <ExemploComponente v-if="visivel('accordion')" titulo="Accordion" :codigo="exemplos.accordion"><Accordion><Bellow><template #title>Primeiro item</template><template #content><p>Conteúdo do item.</p></template></Bellow></Accordion></ExemploComponente>
                    <ExemploComponente v-if="visivel('destaque')" titulo="Destaque" :codigo="exemplos.destaque"><Destaque tipo="importante"><p>Este é um aviso importante.</p></Destaque></ExemploComponente>
                    <ExemploComponente v-if="visivel('avatar')" titulo="Avatar de conversa" :codigo="exemplos.avatar"><Avatar src="./src/assets/images/personas/avatar-professora.png" right color="roxo_claro">Olá! Este é um exemplo de conversa.</Avatar></ExemploComponente>
                    <ExemploComponente v-if="visivel('botao')" titulo="Botão" :codigo="exemplos.botao"><Button>Continuar</Button></ExemploComponente>
                    <ExemploComponente v-if="visivel('image')" titulo="Imagem com zoom" :codigo="exemplos.image"><Image src="./src/assets/images/tela_inicial.png">Clique na imagem para ampliar.</Image></ExemploComponente>
                    <ExemploComponente v-if="visivel('conteudo')" titulo="Conteúdo em duas colunas" :codigo="exemplos.conteudo"><Conteudo two_columns><template #column1>Coluna 1</template><template #column2>Coluna 2</template></Conteudo></ExemploComponente>
                    <ExemploComponente v-if="visivel('separador')" titulo="Separador" :codigo="exemplos.separador"><Separador :items="2" /></ExemploComponente>
                    <ExemploComponente v-if="visivel('lista')" titulo="Lista" :codigo="exemplos.lista"><Lista><ItemLista>Primeiro item</ItemLista><ItemLista>Segundo item</ItemLista></Lista></ExemploComponente>
                    <ExemploComponente v-if="visivel('prettyList')" titulo="Lista com marcadores" :codigo="exemplos.prettyList"><PrettyList><PrettyItem color="green" header="1">Primeiro destaque</PrettyItem><PrettyItem color="purple" header="2">Segundo destaque</PrettyItem></PrettyList></ExemploComponente>
                    <ExemploComponente v-if="visivel('accordionCompleto')" titulo="Accordion completo" :codigo="exemplos.accordionCompleto"><AccordionCompleto><BellowCompleto><template #title>O que é este componente?</template><template #content><p>Um exemplo de conteúdo expansível.</p></template></BellowCompleto></AccordionCompleto></ExemploComponente>
                    <ExemploComponente v-if="visivel('timelineInterativa')" titulo="Linha do tempo interativa" :codigo="exemplos.timelineInterativa"><Timeline><template #title>Linha do tempo</template><Moment><template #title>2025 — Ação realizada</template><template #content><p>Detalhes do acontecimento.</p></template></Moment></Timeline></ExemploComponente>
                    <ExemploComponente v-if="visivel('timeline')" titulo="Linha do tempo vertical" :codigo="exemplos.timeline"><TimeLineVertical titulo="Linha do tempo"><TimeLineVerticalItem ano="2024">Primeiro acontecimento.</TimeLineVerticalItem><TimeLineVerticalItem ano="2025" lado="right">Segundo acontecimento.</TimeLineVerticalItem></TimeLineVertical></ExemploComponente>
                    <ExemploComponente v-if="visivel('cardInfo')" titulo="Card de informação" :codigo="exemplos.cardInfo"><GrupoCardInfo><CardInfo titulo="Atendimentos" destaque="120">Atendimentos realizados no período.</CardInfo></GrupoCardInfo></ExemploComponente>
                    <ExemploComponente v-if="visivel('painelAbas')" titulo="Painel de abas" :codigo="exemplos.painelAbas"><PainelAbas><template #abas><Aba id="catalogo-aba-1" control="catalogo-conteudo-1" active>Primeira aba</Aba><Aba id="catalogo-aba-2" control="catalogo-conteudo-2">Segunda aba</Aba></template><template #conteudo-abas><ConteudoAba id="catalogo-conteudo-1">Conteúdo 1</ConteudoAba><ConteudoAba id="catalogo-conteudo-2">Conteúdo 2</ConteudoAba></template></PainelAbas></ExemploComponente>
                    <ExemploComponente v-if="visivel('progressBar')" titulo="Barra de progresso" :codigo="exemplos.progressBar"><ProgressBar /></ExemploComponente>
                    <ExemploComponente v-if="visivel('imagemLegenda')" titulo="Imagem, legenda e fonte" :codigo="exemplos.imagemLegenda"><ImagemLegenda imagem="./src/assets/images/tela_inicial.png" legenda="Introdução às tecnologias de controle vetorial." fonte="Arquivo do projeto" alt="Ilustração de um mosquito e título sobre controle vetorial" /></ExemploComponente>
                    <ExemploComponente v-if="visivel('flipCard')" titulo="Card que vira" :codigo="exemplos.flipCard"><FlipCards><FlipCard><template #frente><h3>Frente do card</h3></template><template #verso><p>Conteúdo revelado ao virar.</p></template></FlipCard></FlipCards></ExemploComponente>
                    <ExemploComponente v-if="visivel('grupoBotoes')" titulo="Grupo de botões" :codigo="exemplos.grupoBotoes"><GrupoBotoes><Button tipo="modulo">Primeira opção</Button><Button tipo="modulo">Segunda opção</Button><Button tipo="modulo">Terceira opção</Button></GrupoBotoes></ExemploComponente>
                    <ExemploComponente v-if="visivel('chat')" titulo="Mensagem de chat" :codigo="exemplos.chat"><Chat character="teacher" image="./src/assets/images/personas/avatar-professora.png" message="Olá! Este é um exemplo de mensagem." /></ExemploComponente>
                    <ExemploComponente v-if="visivel('fluxoProcesso')" titulo="Fluxo de processo clicável" :codigo="exemplos.fluxoProcesso"><FluxoProcesso :etapas="[{ titulo: 'Planejar', texto: 'Defina o objetivo.' }, { titulo: 'Executar', texto: 'Realize a atividade.' }]" /></ExemploComponente>
                    <ExemploComponente v-if="visivel('fluxoEtapas')" titulo="Fluxo de etapas automático" :codigo="exemplos.fluxoEtapas"><FluxoEtapas :intervalo="4000" :etapas="[{ titulo: 'Etapa 1', texto: 'Primeira etapa.' }, { titulo: 'Etapa 2', texto: 'Segunda etapa.' }]" /></ExemploComponente>
                    <div v-if="visivel('carousel')" class="catalogo-demo-largo"><ExemploComponente titulo="Carrossel" :codigo="exemplos.carousel"><CaixaImgSlider :autoPlay="false" :items="[{ title: 'Primeiro slide', text: 'Descrição do primeiro slide.' }, { title: 'Segundo slide', text: 'Descrição do segundo slide.' }]" /></ExemploComponente></div>
                    <ExemploComponente v-if="visivel('quadroClicavel')" titulo="Quadro com abas" :codigo="exemplos.quadroClicavel"><QuadroClicavel :tabData="[{ name: 'Atenção básica', content: 'Ações de promoção e prevenção.' }, { name: 'Vigilância', content: 'Acompanhamento de riscos e agravos.' }]" /></ExemploComponente>
                    <ExemploComponente v-if="visivel('hotspot')" titulo="Imagem com pontos interativos" :codigo="exemplos.hotspot"><HotspotImage backgroundImage="./src/assets/images/tela_inicial.png" :nodes="[{ id: 1, x: 50, y: 50, label: '+', title: 'Ponto interativo', description: 'Informação apresentada ao selecionar o marcador.' }]" /></ExemploComponente>
                    <ExemploComponente v-if="visivel('dropdown')" titulo="Menu suspenso" :codigo="exemplos.dropdown"><Dropdown><template #front><span>Ver opções</span></template><template #content><li>Opção 1</li><li>Opção 2</li></template></Dropdown></ExemploComponente>
                    <ExemploComponente v-if="visivel('navigation')" titulo="Navegação para outra página" :codigo="exemplos.navigation"><Navigation go="inicio(Inicio)">Voltar ao início</Navigation></ExemploComponente>
                    <ExemploComponente v-if="visivel('modal')" titulo="Modal" :codigo="exemplos.modal"><button type="button" @click="modalAberto = true">Abrir modal</button><Modal :open="modalAberto" @close="modalAberto = false"><template #title>Exemplo de modal</template><template #content><p>Conteúdo da janela.</p></template></Modal></ExemploComponente>
                    <div v-if="visivel('dragAndDrop')" class="catalogo-demo-largo"><ExemploComponente titulo="Arrastar e soltar" :codigo="exemplos.dragAndDrop"><DragAndDrop id="catalogo-drag-demo" :phrases="frasesDrag" :items="itensDrag" /></ExemploComponente></div>
                    <div v-if="visivel('quiz')" class="catalogo-demo-largo"><ExemploComponente titulo="Quiz" :codigo="exemplos.quiz"><Quiz id="catalogo-quiz-demo" title="Pergunta de exemplo" :questions="questoes"><p>Selecione uma resposta e envie para ver o feedback.</p></Quiz></ExemploComponente></div>
                    <div v-if="visivel('testeUmaOpcao')" class="catalogo-demo-largo"><ExemploComponente titulo="Teste de uma alternativa" :codigo="exemplos.testeUmaOpcao"><One-Option-Test id="catalogo-opcao-unica" :options="opcoesUnica">Qual medida ajuda a prevenir doenças?</One-Option-Test></ExemploComponente></div>
                    <div v-if="visivel('testeMultiplasOpcoes')" class="catalogo-demo-largo"><ExemploComponente titulo="Teste de múltiplas alternativas" :codigo="exemplos.testeMultiplasOpcoes"><Multi-Options-Test id="catalogo-multiplas-opcoes" :options="opcoesMultiplas">Selecione as medidas de prevenção.</Multi-Options-Test></ExemploComponente></div>
                    <div v-if="visivel('testeDropdown')" class="catalogo-demo-largo"><ExemploComponente titulo="Teste de associação" :codigo="exemplos.testeDropdown"><Dropdown-Option-Test id="catalogo-associacao" :options="opcoesDropdown">Complete a frase escolhendo a opção adequada.</Dropdown-Option-Test></ExemploComponente></div>
                    <div v-if="visivel('testeAberto')" class="catalogo-demo-largo"><ExemploComponente titulo="Campo de resposta aberta" :codigo="exemplos.testeAberto"><Open-Test id="catalogo-resposta-aberta" :max="180">Explique uma medida de prevenção.</Open-Test></ExemploComponente></div>
                    <div v-if="visivel('video')" class="catalogo-demo-largo"><ExemploComponente titulo="Player de vídeo" :codigo="exemplos.video"><p>Este componente precisa de um arquivo de vídeo do projeto. No exemplo copiável, troque o caminho de <code>src</code> pelo arquivo que deseja usar.</p></ExemploComponente></div>
                    <div v-if="visivel('tabelaVertical')" class="catalogo-demo-largo"><ExemploComponente titulo="Tabela vertical" :codigo="exemplos.tabelaVertical"><TabelaVertical :rows="[['Acolhimento', 'Escuta inicial'], ['Avaliação', 'Identificação das necessidades']]"><template #headers><th>Etapa</th><th>Descrição</th></template></TabelaVertical></ExemploComponente></div>
                    <div v-if="visivel('tabelaHorizontal')" class="catalogo-demo-largo"><ExemploComponente titulo="Tabela horizontal" :codigo="exemplos.tabelaHorizontal"><TabelaHorizontal :tableHeaders="['Indicador', '2024', '2025']" :tableRows="[['Atendimentos', '80', '120'], ['Unidades', '4', '6']]" /></ExemploComponente></div>
                    <div v-if="visivel('tabelaMultiplas')" class="catalogo-demo-largo"><ExemploComponente titulo="Tabela de múltiplos períodos" :codigo="exemplos.tabelaMultiplas"><TabelaMultiplas :tableHeaders="['Local', '2024', '2025']" :tableRows="[['Unidade A', '12', '18'], ['Unidade B', '9', '15']]" /></ExemploComponente></div>
                </div>
            </main>
        </div>
    `
}
