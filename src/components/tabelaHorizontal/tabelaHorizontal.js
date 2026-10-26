export default {
  name: 'TabelaHoriz',

  props: {
    tableRows: {
      type: Array,
      required: true
    },
    tableHeaders: {
      type: Array,
      required: true
    },
    widths: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getWidth(index) {
      return this.widths[index] ? this.widths[index] : 'auto'
    },

    getCardTitle(index) {
      return this.tableHeaders[index + 1]
    },

    getCardItems(index) {
      return this.tableRows.map(row => ({
        label: row[0],
        text: row[index + 1]
      }))
    }
  },

  template: `
    <div>
      <!-- TABELA DESKTOP -->
      <div class="table-box-Horiz">
        <table>
          <thead>
            <tr class="tabela-header-Horiz">
              <th
                v-for="(header, index) in tableHeaders"
                :key="index"
                :style="{ width: getWidth(index) }"
              >
                {{ header }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(row, rowIndex) in tableRows" :key="rowIndex">
              <td
                v-for="(item, itemIndex) in row"
                :key="itemIndex"
                :style="{ width: getWidth(itemIndex) }"
              >
                {{ item }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- CARDS MOBILE -->
      <div class="cards-Horiz">
        <div
          class="card-Horiz"
          v-for="(header, index) in tableHeaders.slice(1)"
          :key="index"
        >
          <h3>{{ getCardTitle(index) }}</h3>

          <div
            class="card-item-Horiz"
            v-for="(item, itemIndex) in getCardItems(index)"
            :key="itemIndex"
          >
            <strong>{{ item.label }}</strong>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  `


  /*
    Usando o componente TabelaHorizontal, você pode passar os dados da tabela como props. Por exemplo:

    tem que definir os headers e rows no setup() do componente pai, e passar como props para o TabelaHorizontal:

     const headers = ref([
                'Nome',
                'Idade',
                'Cidade',
                'Profissão'
            ])
    
            const rows = ref([
                ['João', '25', 'Recife', 'Professor'],
                ['Maria', '30', 'Olinda', 'Médica'],
                ['Pedro', '18', 'Caruaru', 'Aluno'],
                ['Ana', '42', 'Paulista', 'Advogada']
            ])
    
            return {
                navigation,
                headers,
                rows
            }

    
    <TabelaHorizontal
      :tableHeaders="headers"
      :tableRows="rows"
      :widths="['18%','20%','20%','22%','20%']" (sendo o tamanho das colunas opcional, caso não seja passado, o tamanho será automático)
    />  
  
  
  
  */
}