import { reactive } from 'vue'

export default reactive({
    name: 'Catálogo de Componentes EAD',
    color: '#6C2ACC',
    index: 'inicio(Inicio)',
    ltiValue: 'navigation',
    // Cada grupo = um item do menu (templates/menu/menu.js)
    // Cada nome dentro do grupo = uma página registrada em src/register.js
    pages: {
        inicio: ['Inicio'],
        card: ['Comp_card'],
        caixa: ['Comp_caixa'],
        accordion: ['Comp_accordion'],
        destaque: ['Comp_destaque'],
        mais: ['Comp_mais'],
    },
    extra: [
        { title: 'Como adicionar um componente', page: 'ComoAdicionar' },
    ]
})
