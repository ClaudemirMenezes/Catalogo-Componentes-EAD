export default {
  name: 'TabelaMultiplas',

  props: {
    tableHeaders: {
      type: Array,
      required: true
    },

    tableRows: {
      type: Array,
      required: true
    }
  },

  methods: {
    /*
      Retorna os anos e valores de uma linha.

      Exemplo:
      Bairro: 19

      2012: 9
      2013: 4
      2014: 1
    */
    getRowItems(row) {
      return this.tableHeaders.slice(1).map((header, index) => ({
        ano: header,
        valor: row[index + 1]
      }))
    }
  },

  template: `
    <div class="tabela-multiplas-container">

      <!-- TABELA PARA TELAS MAIORES -->
      <div class="table-box-multiplas">

        <table class="table-multiplas">

          <thead>
            <tr>
              <th
                v-for="(header, index) in tableHeaders"
                :key="'header-' + index"
                v-html="header"
              >
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, rowIndex) in tableRows"
              :key="'row-' + rowIndex"
            >
              <td
                v-for="(item, itemIndex) in row"
                :key="'item-' + rowIndex + '-' + itemIndex"
                v-html="item"
              >
              </td>
            </tr>
          </tbody>

        </table>

      </div>

      <!-- CARDS PARA TELAS MENORES -->
      <div class="cards-multiplas">

        <div
          class="card-multiplas"
          v-for="(row, rowIndex) in tableRows"
          :key="'card-' + rowIndex"
        >

          <!-- BAIRRO -->
          <h3>
            <span v-html="tableHeaders[0]"></span>:
            <span v-html="row[0]"></span>
          </h3>

          <!-- ANOS E VALORES -->
          <div class="card-multiplas-conteudo">

            <div
              class="card-item-multiplas"
              v-for="(item, itemIndex) in getRowItems(row)"
              :key="'card-item-' + rowIndex + '-' + itemIndex"
            >
              <strong v-html="item.ano"></strong>

              <span v-html="item.valor"></span>
            </div>

          </div>

        </div>

      </div>

    </div>
  `

  /*
    =====================================================
    COMO UTILIZAR
    =====================================================

    No setup() do componente pai:

    const headers = ref([
      'Bairros',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021'
    ])

    const rows = ref([
      ['19', 9, 4, 1, 64, 23, 0, 2, 7, 3, 10],
      ['27', 4, 1, 1, 3, 1, 1, 0, 4, 1, 4],
      ['35', 37, 5, 10, 176, 41, 2, 7, 20, 9, 47]
    ])

    return {
      headers,
      rows
    }

    No template:

    <TabelaMultiplas
      :tableHeaders="headers"
      :tableRows="rows"
    />
  */
}