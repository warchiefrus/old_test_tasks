<template>
  <div class="home">
    <SideBar/>
    <Content/>
  </div>
</template>

<script>
import SideBar from '@/components/sideBar/SideBar'
import Content from '@/components/content/Content'

export default {
  name: 'Home',
  components: {
    SideBar, Content
  }
}
</script>

<style lang="scss" scoped>
  .home {
    display: flex;

  }
</style>