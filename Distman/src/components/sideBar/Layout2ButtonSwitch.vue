<template>
  <div class="main" @click="btnClick" >
    <button v-if="expanded" :class="{active, waiting: !active}" :style="`width: ${btnWidth}px;`">
      <span :class="icon" class="iconBtn"></span>
      <span  class="textBtn">{{layout.name}}</span>
    </button>

    <button v-else :class="{active, waiting: !active}" :style="`width: ${btnWidth}px;`"
      :content="layout.name" v-tippy>
      <span :class="icon" class="iconBtn"></span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['layout', 'activeLayout', 'expanded'],

  computed: {
    active() {
      return this.activeLayout === this.layout.id
    },
    btnWidth() {
      return this.expanded? 260 : 50
    },
    icon() {
      return this.active? 'icon-bar_chart' : 'icon-bar_chart_outlined'
    }
  },

  methods: {
    btnClick() {
      this.$emit('btnClick', this.layout)
    }
  },
}
</script>

<style lang="scss" scoped>
  .main {
    width: 40px;
    height: 40px;
    margin: 0 0 10px 0;
    cursor: pointer;

    button {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      border-radius: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #FFFFFF;
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
        margin: 0 0 0 9px;
        font-size: 1.5rem;
      }

      .textBtn {
        margin-left: 12px;
      }
    }
  }


</style>
