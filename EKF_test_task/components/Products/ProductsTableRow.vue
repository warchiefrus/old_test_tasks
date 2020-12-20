<template>
  <tr class="tr">
    <td class="td td__center">
      <v-btn color="accent" @click="editItem" x-small >
        <v-icon small>mdi-table-edit</v-icon>
      </v-btn>
    </td>
    <td class="td">
      {{ item.name }}
    </td>
    <td class="td">
      {{ item.vendor_code }}
    </td>
    <td class="td td__center">
      {{ item.series }}
    </td>    
    <td class="td td__right">
      {{ itemPrice }}
    </td>         
  </tr>
</template>

<script>


export default {
  props: ['item'],
  computed: {
    itemPrice() {
      return this.item.price ? Math.trunc(this.item.price) : 0
    }
  },
  methods: {
    editItem() {
      this.$emit('editItem', this.item)
    }
  }
}
</script>

<style>
</style>