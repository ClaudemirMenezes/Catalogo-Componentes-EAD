
export default {
    template: `
        <div class="table-box-Vertical">
            <table>
            <thead>
                <tr class="tabela-header">
                <!-- Slot para cabeçalho customizado -->
                <slot name="headers"></slot>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                <td v-for="(item, itemIndex) in row" :key="itemIndex" v-html="item"></td>
                </tr>
            </tbody>
            </table>
        </div>
    `,
    name: 'TabelaVertical',
    props: {
        rows: {
        type: Array,
        required: true
        }
    }
}