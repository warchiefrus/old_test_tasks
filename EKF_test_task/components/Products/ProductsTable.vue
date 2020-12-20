<template>
  <section>
    <table class="table">
      <thead class="thead">
        <tr class="tr">
          <th v-for="(column, index) of columns" :key="index" class="th">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <ProductsTableRow v-for="(item, index) of pageRows" :key="index"
          :item="item"
          @editItem="showItemEditor"
        />
      </tbody>
    </table>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pages"
        :total-visible="20"
      ></v-pagination>
    </div>

    <ProductsEditDialog
      :dialog="editDialog.visible"
      :item="editDialog.item"
      @closeEditor="closeItemEditor"
    />
  </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import ProductsTableRow from './ProductsTableRow'
import ProductsEditDialog from './ProductsEditDialog'

export default {
  components: {
    ProductsTableRow, ProductsEditDialog
  },
  computed: {
    ...mapState(['products']),
    pages() {
      let pages = this.products.length / this.rowsOnPage
      return pages === Math.trunc(pages) ? pages : Math.trunc(pages) + 1
    },
    pageRows() {
      const curPage = this.page - 1
      return this.products.slice(curPage * this.rowsOnPage, curPage * this.rowsOnPage + this.rowsOnPage)
    }
  },
  data: () => ({
    columns: ['_', 'наименование', 'артикул', 'серия', 'цена'],
    page: 1,
    rowsOnPage: 25,
    editDialog: {visible: false, item : null}
    
  }),
  methods: {
    showItemEditor(item) {
      this.editDialog.item = item
      this.editDialog.visible = true
    },
    closeItemEditor() {
      this.editDialog.item = null
      this.editDialog.visible = false
    }
  }

}
</script>

<style>

</style>