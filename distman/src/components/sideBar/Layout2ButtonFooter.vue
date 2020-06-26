<template>
  <button class="waiting" :style="`width: ${btnWidth}px;`" @click="btnClick">
    <span :class="icon" class="iconBtn"></span>
    <span v-if="expanded" class="textBtn">Свернуть</span>
  </button>
</template>

<script>
export default {
  props: ['expanded'],
  
  computed: {
    icon() {
      return this.expanded? 'icon-arrow_back' : 'icon-arrow_forward'
    }, 
    btnWidth() {
      return this.expanded? 300 : 70
    },
  },

  methods: {
    btnClick() {
      this.$emit('btnClick')
    }
  },

}
</script>

<style lang="scss" scoped>
  button {
    width: 300px;
    height: 50px;
    border: none;
    outline: none;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: inherit;


    &.waiting {
      opacity: 0.6;
      background-color: $default_color;
    }

    &.active {
      opacity: 1;
      background-color: $active_color;
    }

    &:hover {
      opacity: 1;
      background-color: $hover_color;
    }

    .iconBtn {
      font-size: 18px;
    }

    .textBtn {
      margin-left: 12px;
    }
  }
</style>