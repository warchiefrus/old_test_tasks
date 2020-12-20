<template>
  <aside class="asidePannel">
    <label for="selectYear">Год</label>
    <select class="panelItem" v-model="selectedYear" @change="yearChange" id="selectYear">
      <option v-for="(item, index) in sprs.years" :key="index">
        {{ item.text }}
      </option>
    </select>
    <div class="bold">ИТОГО</div>
    <div class="bold">{{ yearPassage }}</div>
  </aside>
</template>

<script>
export default {
  props: ['sprs', 'currentYear', 'tableData'],
  computed: {
    yearPassage() {
      return this.tableData.reduce((sum, item) => { 
        return sum += item.dataMonth.reduce((sum2, item2) => {
          return sum2 += +item2.passage
        }, 0)
      }, 0)
    }
  },
  data: () => ({
    selectedYear: null,
  }),
  methods: {
    yearChange() {
      this.$emit('yearChange', this.selectedYear)
    }
  },
  mounted() {
    this.selectedYear = this.currentYear
  }

}
</script>

<style>
.asidePannel {
  width: 100px;
  background-color: beige;
  height: 100vh;
  padding: 10px;
  position: sticky;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}

.panelItem {
  margin: 10px 0 10px 0;
}

</style>