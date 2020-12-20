<template>
  <section>
    <table class="table">
      <thead>
        <tr class="tr thead">
          <th class="th"></th>
          <th class="th">Филиал</th>
          <th class="th">Заказчик</th>
          <th class="th">Буровая установка</th>

          <th class="th" v-for="(item, index) in monthNames" :key="index">{{ item }}</th>

          <th class="th bold">Итого</th>
        </tr>
      </thead>
      <tbody>
        <TableRow v-for="(item, index) in tableData" :key="index"
          :rowData="item"
          :sprs="sprs"
          @deleteRow="deleteRow"
          @updateRow="updateRow"
        />
        <tr>
          <button class="btn btn-success addBtn" @click="addRow">Добавить разрез</button>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import TableRow from './TableRow'

export default {
  props: ['tableData', 'sprs'],
  components: {
    TableRow
  },
  data: () => ({
    monthNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  }),
  methods: {
    deleteRow(id) {
      this.$emit('deleteRow', id)
    },
    updateRow(rowDataCopy) {
      this.$emit('updateRow', rowDataCopy)
    },
    addRow() {
      this.$emit('addRow')
    }
  }
}
</script>

<style scoped>

  .addBtn {
    width: 100%;
  }

</style>