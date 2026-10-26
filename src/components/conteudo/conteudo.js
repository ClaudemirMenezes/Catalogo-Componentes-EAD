export default {
    props: {
       two_columns:Boolean,
       full_size:Boolean,
    },
    template: `
             
            <div class="row" v-if="two_columns">
                <div class="col-1" v-if="!full_size"></div>
                 <div v-bind:class="{'col-5': !full_size,'col-6': full_size}">
                     <slot name="column1"></slot>
                 </div>
                 <div v-bind:class="{'col-5': !full_size,'col-6': full_size}">
                    <slot name="column2"></slot>
                 </div>
                 <div class="col-1" v-if="!full_size"></div>
             </div>
             <div class="row" v-else>
                 <div class="col-2" v-if="!full_size"></div>
                 <div class="col-8" v-bind:class="{'col-8': !full_size,'col-12': full_size}">
                     <slot></slot>
                 </div>
                 <div class="col-2" v-if="!full_size"></div>
             </div>
    `,
}

/*
    Esse é um componente que ajuda na utilização da estrutura já definida pelo ppu. É totalmente dependente dos estilos já 
    definidos na plataforma. Não aconcelho utilizaçã fora deste projeto. 

    É o componente que deve conter todo o conteudo de uma página. Possui dois atributos booleanos:
        * two_columns - indica que o layout será de duas colunas. Dessa maneira a área útil da página será disposta em duas colunas paralelas.
        * full_size -  Indica que o layout da página ocupará toda a área útil (12 colunas). Caso não seja informado esse atributo a área fira reduzida
                       e ficará equivalente a 8 colunas e disposta no centro da página. . 

    Exemplo de utilização de duas colunas.

        <Conteudo two_columns>
            <template v-slot:colunm1>
                Conteúdo da coluna 1
            </template>
            <template v-slot:colunm2>
                Conteúdo da coluna 2
            </template>
        </Conteudo>

    Exemplo de utilização de duas colunas full size.

        <Conteudo two_columns full_size>
            <template v-slot:colunm1>
                Conteúdo da coluna 1
            </template>
            <template v-slot:colunm2>
                Conteúdo da coluna 2
            </template>
        </Conteudo>

    Exemplo de utilização de uma coluna.

        <Conteudo>
                Conteúdo
        </Conteudo>

*/