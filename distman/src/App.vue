<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('loadState')
  }
}
</script>

<style lang="scss">
  @import '../node_modules/typeface-roboto/index.css';

  * {
    box-sizing: border-box;
  }

  #app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body {
    margin: 0px;
  }

  .default {
    background-color: $default_color;
  }

  .active {
    background-color: $active_color;
  }

  .mx-icon-calendar {
    display: none !important;
  }

  .mx-input {
    border: none !important;
    box-shadow: none !important;
  }
</style>
