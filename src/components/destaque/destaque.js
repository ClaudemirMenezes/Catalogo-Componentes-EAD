export const Destaque = {
  props: {
    tipo: {
      type: String,
      default: "importante"
    },
    src: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    const icones = {
      importante: "./src/assets/images/icones/importante.svg",
      saibamais: "./src/assets/images/icones/saibamais.svg"
    };

    if (!props.src) {
      props.src = icones[props.tipo] || icones.importante;
    }
  },

  template: `
    <div :class="['fiocruzPE-destaque', tipo]">
      <div class="fiocruzPE-destaque-image">
        <img :src="src" :alt="tipo" />
      </div>

      <div class="fiocruzPE-destaque-content">
        <slot></slot>
      </div>
    </div>
  `
}/*
    Como utilizar o componente:
        

        <destaque tipo="importante">
          <p>
            Este é um aviso importante para o usuário.
          </p>
        </destaque>

        <destaque tipo="saibamais">
          <p>
            Saiba mais acessando
            <a href="https://www.fiocruz.br" target="_blank">
              o portal da Fiocruz
            </a>.
          </p>
        </destaque>
        
*/