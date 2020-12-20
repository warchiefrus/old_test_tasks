<template>
  <div class="main" @click="btnClick">
    <button :class="{active, waiting: !active}">
      <span>{{layout.name}}</span>
    </button>
    
  </div>
</template>

<script>
export default {
  props: ['layout', 'activeLayout'],

  computed: {
    active() {
      return this.activeLayout === this.layout.id
    }
  },

  methods: {
    btnClick() {
      this.$emit('btnClick', this.layout.id)
    }
  },
}
</script>

<style lang="scss" scoped>
  .main {
    width: 40px;
    height: 40px;
    margin: 0px 0 15px 0;
    cursor: pointer;

    button {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      border-radius: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      cursor: inherit;

      &.waiting {
        opacity: 0.6;
        background-color: rgba(255, 255, 255, 0.1);
      }

      &.active {
        opacity: 1;
        background-color: $active_color;
      }

      &:hover {
        opacity: 1;
        background-color: $hover_color;
      }
      

    }
  }


</style>
