import { createApp, ref } from 'vue'
import Layout from './src/templates/layout/layout.js'
import ppu from './src/composables/ppu.js'

import globalComponents from './src/global.js'
import Config from './config.js'

const Navigation = ref({
    context: null,
    previous: null,
    current: null,
    next: null,
    btnPrevious: true,
    btnNext: true,
    totalPages: 0,
    currentPage: 0,
    indexMenu: null,
    title: '',
})

const PPU = ref({
    status: null,
    statusPages: null,
    statusPagesExtra: {},
    test: null,
})

const app = createApp({
    setup() {
        unasus.pack.initialize();

        let statusPages = ppu.setStatusPages(Config.pages)

        PPU.value.status = ppu.setStatusDefault()
        PPU.value.statusPages = statusPages.pages
        PPU.value.statusPagesExtra = statusPages.status
        PPU.value.test = ppu.setTestDefault()
    },
    components: {
        Layout,
    },
    template: `
        <Layout></Layout>
    `
})

app.provide('config', Config)
app.provide('navigation', Navigation)
app.provide('ppu', PPU)

globalComponents(app).mount('#app')