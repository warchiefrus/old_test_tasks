<template>
  <main class="main">
    <div class="somecontent">
      <div class="empty1 card"></div>
    <div>
  </main>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .main {
    padding: 29px 40px 29px 40px;
    background-color: $background_color;
    width: 100%;
    min-width: 1000px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100vh;

    .somecontent {
      .card {
        background: #FFFFFF;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        width: 100%;
      }

      .empty1 {
        width: 100%;
        height: 1500px;
      }
    }
  }

</style>