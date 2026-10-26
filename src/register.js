import { defineAsyncComponent } from 'vue'

// início
const Inicio = defineAsyncComponent(() => import('./pages/inicio.js') )

// componentes
const Comp_card = defineAsyncComponent(() => import('./pages/componentes/card.js') )
const Comp_caixa = defineAsyncComponent(() => import('./pages/componentes/caixa.js') )
const Comp_accordion = defineAsyncComponent(() => import('./pages/componentes/accordion.js') )
const Comp_destaque = defineAsyncComponent(() => import('./pages/componentes/destaque.js') )
const Comp_mais = defineAsyncComponent(() => import('./pages/componentes/mais.js') )

export const Pages = {
    components: {
        Inicio,

        Comp_card,
        Comp_caixa,
        Comp_accordion,
        Comp_destaque,
        Comp_mais,
    }
}

import ComoAdicionar from './pages/como_adicionar.js'

export const Extras = {
    components: {
        ComoAdicionar,
    }
}
