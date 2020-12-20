<template>
  <div class="summary_items">
    <SummaryItem class="rigthBorder"
      header="Заказов"
      :sum="sumData[0].sum"
      :percent="sumData[0].percent"
    />

    <SummaryItem class="rigthBorder"
      header="Выручка"
      :sum="sumData[1].sum"
      :percent="sumData[1].percent"
    />

    <SummaryItem
       header="Выработка"
      :sum="sumData[2].sum"
      :percent="sumData[2].percent"
    />
  </div>
</template>

<script>
import SummaryItem from '@/components/content/SummaryItem'

export default {
  props: ['sumData'],
  components: {
    SummaryItem
  },
}
</script>


<style lang="scss" scoped>
  .summary_items {
    display: grid;
    grid-template-columns: repeat(3, auto);
    overflow: hidden;
  }
  .rigthBorder {
    border-right: 1px solid #DDDDDD;
  }
</style>
