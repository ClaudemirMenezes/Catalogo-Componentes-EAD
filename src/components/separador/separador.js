export default {
    props: {
        blank: {
            type: Boolean,
            default: false,
        },
        items: {
            type: Number,
            default: 1,
        } 
    },
    template: `
        <span class="separador" v-for="n in items">
            <hr v-if="!blank">&nbsp;
        </span>
    `
}
/*
    <Separador></Separador>
    <Separador blank></Separador>
    <Separador :items="2"></Separador>
    <Separador blank :items="2"></Separador>
 */