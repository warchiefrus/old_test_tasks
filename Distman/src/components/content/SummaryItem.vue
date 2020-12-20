<template>
  <div class="sum_item">
    <div class="header">
      {{header}}
    </div>

    <div class="sum">
      {{formatedSum}}
    </div>

    <div class="percent">
      <span :class="icon" class="icon"></span>
      <span :class="{percent_plus: percent >= 0, percent_minus: percent < 0}">{{formatedPercent}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['header', 'sum', 'percent'],

  computed: {
    formatedSum() {
      return this.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    formatedPercent() {
      return this.percent >= 0? `+${this.percent}%` : `${this.percent}%`
    },
    icon() {
      return this.percent >= 0? `icon-arrow_up` : `icon-arrow_down`
    }

  }
}
</script>

<style lang="scss" scoped>
  .sum_item {
    overflow: hidden;
    padding: 28px 30px 28px 30px;
    text-align: left;
    

    .header {
      font-size: 12px;
      line-height: 14px;
      color: #999999;
    }

    .sum {
      font-weight: bold;
      font-size: 42px;
      line-height: 49px;
      color: #4F4F4F;
      margin-bottom: 10px;
    }

    .percent {
      font-size: 12px;
      line-height: 14px;
      display: flex;
      align-items: center;
    }

    .percent_plus {
      color: #219653;
    }

    .percent_minus {
      color: #EB5757;;
    }   
    
    .icon {
      font-size: 1.1rem;
    }
  }

</style>