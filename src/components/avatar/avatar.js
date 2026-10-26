export default {
    props: {
        src: String,
        left: {
            type: Boolean,
            default: false,
        },
        right: {
            type: Boolean,
            default: false,
        },
        color: String,
        nome_personagem: String,
    },
    
    template: `
        <div v-if="right" class="row">
            <div class="nome_personagem">
                <slot name="nome_personagem">
                    
                </slot>
            </div>
            <div class="col-md-3">
                    <img :src="src" class="rouded-image-md"/>
                </div>
            <div class="col-9">
                <div class="box_roxo_claro sb2_roxo_claro" v-if="color === 'roxo_claro'">
                    <slot></slot>
                </div>
                <div class="box_roxo sb2_roxo" v-if="color === 'roxo'">
                    <slot></slot>
                </div>
                <div class="box_amarelo sb2_amarelo" v-if="color === 'amarelo'">
                    <slot></slot>
                </div>
            </div>
        </div>
        
        <div v-if="left" class="row">
            <div class="nome_personagem">
                <slot name="nome_personagem">
                    
                </slot>
            </div>
            <div class="col-9">
                <div class="box_roxo_claro sb1_roxo_claro" v-if="color === 'roxo_claro'">
                    <slot></slot>
                </div>
                <div class="box_roxo sb1_roxo" v-if="color === 'roxo'">
                    <slot></slot>
                </div>
                <div class="box_amarelo sb1_amarelo" v-if="color === 'amarelo'">
                    <slot></slot>
                </div>
            </div>
            <div class="col-md-3">
                <img :src="src" class="rouded-image-md"/>
            </div>
        </div>
    `
}

/*
    Como usar o componente.

    Esse componente pode ser colocado dentro de qualquer outro componente.
    Ele é composto por dois elementos:
        * A imagem;
        * O balão de texto;
        
            <Avatar src="./src/assets/images/sicrano.png" right color="roxo_claro">
                Texto do balão 1
            </Avatar>

            <Avatar src="./src/assets/images/fulano.png" left color="roxo">
                Texto do balão 2
            </Avatar>

        Possui três atributos: 
            * src - o caminho da imagem que se deseja utilizar;
            * Origentação [left|right] - orientação do balão;
            * color - A cor do balão, que pode ser roxo, roxo_claro ou amarelo.
*/
