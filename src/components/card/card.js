export default {
    props: {
        color: {
            type: String,
            default: 'white'
        },
        rounded:Boolean
    },
    template: `
        <div class="unasus-card" v-bind:class="{'rounded_corners': rounded,'fundo-EAD': color === 'EAD', 'fundo-amareloEAD': color === 'EAD-amarelo','fundo-Azul': color === 'blue','fundo-verde': color === 'green','fundo-amarelo': color === 'yellow','fundo-laranja': color === 'orange','fundo-vermelho': color === 'red','fundo-lilas': color === 'purple','fundo-branco': color === 'white'}">
            <slot>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Proin ultricies id est a volutpat. Maecenas eu iaculis ipsum, 
            ut condimentum diam. Nulla vehicula massa non urna imperdiet, 
            vel ullamcorper urna egestas.</slot>
        </div>
    ` 
}