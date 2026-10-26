import { ref } from 'vue'

export const Caixa = {
  props: {
    titulo: String,
    color: String,
    cor: String,
  },
  computed: {
    corFinal() {
      return this.color || this.cor
    }
  },
  template: `
    <div 
      class="caixa" 
      :class="[
        'caixa-' + corFinal
      ]"
    >
      <div class="titulo-caixa" v-if="titulo">
        {{ titulo }}
      </div>

      <slot></slot>
    </div>
  `
}

export const ItemCaixa = {
  props: {
    color: String,
    cor: String,
  },
  computed: {
    corFinal() {
      return this.color || this.cor
    }
  },
  setup() {
    const content = ref(null)
    const wrapperContent = ref(null)

    return {
      content,
      wrapperContent,
    }
  },
  template: `
    <div 
      class="item-caixa" 
      :class="'cor-texto-' + corFinal"
    >
      <i 
        class="fa fa-square-check"
        :class="'cor-texto-' + corFinal"
      ></i>
      &nbsp;
      <slot></slot>
    </div>
  `
}

/*
    Como utilizar o componente:
        O componente deve ser utilizado:


       <Caixa titulo="Atenção" cor="roxo">
            <ItemCaixa cor="roxo">
                Texto do primeiro item.
            </ItemCaixa>

            <ItemCaixa cor="roxo">
                Texto do segundo item. 
            </ItemCaixa>
        </Caixa>
        
*/