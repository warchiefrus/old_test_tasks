<template>
  <select class="selectItem" @change="selectChange" v-model="selectedItem.text">
    <option v-for="(item, index) in spr" :key="index" :data-sprid="item.id">
      {{ item.text }}
    </option>
  </select>
</template>

<script>
export default {
  props: ['spr', 'fieldName', 'selectedItemId'],
  methods: {
    selectChange(e) {
      this.selectedItem.id = e.target.selectedOptions[0].dataset.sprid
      this.$emit('selectChange', this.selectedItem.id, this.fieldName)
    }
  },
  data: () => ({
    selectedItem: {id: null, text: null}
  }),
  mounted() {
    this.selectedItem.text = this.spr.filter(item => {return item.id == this.selectedItemId})[0].text
    this.selectedItem.id = this.selectedItemId
  }

}
</script>

<style>

</style>