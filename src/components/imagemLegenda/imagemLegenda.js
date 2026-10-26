export default {
    name: 'ImagemLegenda',
    props: {
        imagem: {
            type: String,
            required: true,
        },
        legenda: {
            type: String,
            required: true,
        },
        fonte: {
            type: String,
            default: '',
        },
        alt: {
            type: String,
            default: '',
        },
    },
    template: `
        <figure class="imagem-legenda">
            <img
                class="imagem-legenda-imagem"
                :src="imagem"
                :alt="alt || legenda"
                loading="lazy"
                decoding="async"
            />
            <figcaption class="imagem-legenda-caption">
                <span class="imagem-legenda-texto">{{ legenda }}</span>
                <span v-if="fonte" class="imagem-legenda-fonte">Fonte: {{ fonte }}</span>
            </figcaption>
        </figure>
    `
}
