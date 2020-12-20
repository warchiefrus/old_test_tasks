<template>
  <div v-if="show" class="modal" @keydown.prevent.stop @mousewheel.prevent.stop>
    <img class="rotate" src="@/assets/loader.png"/>
  </div>
</template>

<script>
export default {
  props: ['show'],
}
</script>

<style lang="scss" scoped>
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    width: 100%;
    height: inherit;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;

    .rotate {
      animation: rotation 1s infinite linear;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  }
</style>