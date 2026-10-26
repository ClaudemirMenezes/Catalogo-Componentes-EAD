// components
import ModalComponent from './components/modal/modal.js'
import DropdownComponent from './components/dropdown/dropdown.js'
import CardComponent from './components/card/card.js'
import ImageComponent from './components/image/image.js'
import ButtonComponent from './components/button/button.js'
import { Bellow, Accordion } from './components/accordion/accordion.js'
import { TimeLine, Moment } from './components/timeline/timeline.js'
import Video from './components/video/video.js'
import Navigation from './components/navigation/navigation.js'
import { MultiOptionsTest, OneOptionTest, DropdownOptionTest, OpenTest } from './components/test/test.js'
import Avatar from './components/avatar/avatar.js'
import Conteudo from './components/conteudo/conteudo.js'
import { Caixa, ItemCaixa } from './components/caixa/caixa.js'
import Separador from './components/separador/separador.js'
import { PrettyItem, PrettyList } from './components/prettylist/prettylist.js'
import { Destaque } from './components/destaque/destaque.js'
import { FlipCards, FlipCard } from './components/flip-card/flip-card.js'
import { DragAndDrop } from './components/drag-and-drop/DragAndDrop.js'
import { ProgressBar } from './components/progressbar/progressbar.js'
import { ItemLista, Lista } from './components/lista/lista.js'
import { PainelAbas, Aba, ConteudoAba } from './components/painelabas/painelabas.js'
import Chat from './components/chat/chat.js'
import { BellowCompleto, AccordionCompleto } from './components/accordionCompleto/accordionCompleto.js'
import TabelaVertical from './components/tabelaVertical/tabelaVertical.js'
import TabelaHorizontal from './components/tabelaHorizontal/tabelaHorizontal.js'
import CaixaImgSliderComponent from './components/caixaImgSlider/caixaImgSlider.js'
import QuadroClicavelComponent from './components/quadroClicavel/quadroClicavel.js'
import TabelaMultiplas from './components/tabelaMultiplas/tabelaMultiplas.js'
import HotspotImage from './components/hotspotImage/hotspotImage.js';
import { TimeLineVertical, TimeLineVerticalItem } from './components/linhaTempoVertical/linhaTempoVertical.js'
import Quiz from './components/quiz/quiz.js'
import GrupoBotoes from './components/grupoBotoes/grupoBotoes.js'
import CardInfo from './components/cardInfo/cardInfo.js'
import GrupoCardInfo from './components/grupoCardInfo/grupoCardInfo.js'
import FluxoProcesso from './components/fluxoProcesso/fluxoProcesso.js'
import FluxoEtapas from './components/fluxoEtapas/fluxoEtapas.js'
import ImagemLegenda from './components/imagemLegenda/imagemLegenda.js'

import ExemploComponente from './components/exemploComponente/exemploComponente.js'

//directives
import { ppuLink, ppuDownload } from './composables/ppuDirectives.js'

export default (app) => {
    app.component('Modal', ModalComponent)
    app.component('Dropdown', DropdownComponent)
    app.component('Card', CardComponent)
    app.component('Image', ImageComponent)
    app.component('Accordion', Accordion)
    app.component('Bellow', Bellow)
    app.component('Timeline', TimeLine)
    app.component('Moment', Moment)
    app.component('Unasus-Button', ButtonComponent)
    app.component('Player-Video', Video)
    app.component('Navigation', Navigation)
    app.component('Multi-Options-Test', MultiOptionsTest)
    app.component('One-Option-Test', OneOptionTest)
    app.component('Dropdown-Option-Test', DropdownOptionTest)
    app.component('Open-Test', OpenTest)
    app.component('Button', ButtonComponent)

    //outros componentes
    app.component('Avatar', Avatar)
    app.component('Conteudo', Conteudo)
    app.component('Separador', Separador)
    app.component('Caixa', Caixa)
    app.component('ItemCaixa', ItemCaixa)
    app.component('AccordionCompleto', AccordionCompleto)
    app.component('BellowCompleto', BellowCompleto)
    app.component('PrettyList',PrettyList)
    app.component('PrettyItem',PrettyItem)
    app.component('FlipCards',FlipCards)
    app.component('FlipCard',FlipCard)
    app.component('Lista',Lista)
    app.component('ItemLista',ItemLista)
    app.component('PainelAbas',PainelAbas)
    app.component('Aba',Aba)
    app.component('ConteudoAba',ConteudoAba)
    app.component('TabelaVertical', TabelaVertical)
    app.component('TabelaHorizontal', TabelaHorizontal)
    app.component('CaixaImgSlider', CaixaImgSliderComponent)
    app.component('QuadroClicavel', QuadroClicavelComponent)

    
    //FioCruz PE
    app.component('Destaque', Destaque)
    app.component('DragAndDrop', DragAndDrop)
    app.component('ProgressBar', ProgressBar)
    app.component('Chat', Chat)
    app.component('TabelaMultiplas', TabelaMultiplas)
    app.component('HotspotImage', HotspotImage)
    app.component('TimeLineVertical', TimeLineVertical)
    app.component('TimeLineVerticalItem', TimeLineVerticalItem)
    app.component('Quiz', Quiz)
    app.component('GrupoBotoes', GrupoBotoes)
    app.component('CardInfo', CardInfo)
    app.component('GrupoCardInfo', GrupoCardInfo)
    app.component('FluxoProcesso', FluxoProcesso)
    app.component('FluxoEtapas', FluxoEtapas)
    app.component('ImagemLegenda', ImagemLegenda)
    
    //Catálogo
    app.component('ExemploComponente', ExemploComponente)

    //directives
    app.directive('ppu-link', ppuLink)
    app.directive('ppu-download', ppuDownload)

    return app
}