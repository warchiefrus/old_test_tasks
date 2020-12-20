<template>
  <input type="number" v-model="inputValue" @input="valueChange">
</template>

<script>
export default {
  props: ['index', 'itemValue'],
  methods: {
    valueChange() {
      this.$emit('numberChange', this.inputValue, this.index)
    }
  },
  data: () => ({
    inputValue: null
  }),
  mounted() {
    this.inputValue = this.itemValue
  }
}
</script>

<style>

</style>