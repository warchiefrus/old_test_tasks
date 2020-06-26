<template>
  <main class="content" :class="{modal: showLoader}">
    <div class="content_items">
      <ContentHeader class="header" @loading="loading"/>

      <Summary class="summary card" :sumData="sumData"/>

      <div class="empty1 card"></div>
      <div class="empty2 card"></div>

      <Charts class="charts card"/>

      <div class="empty3 card"></div>
      <div class="empty4 card"></div>
      <div class="empty5 card"></div>
    </div>
    <Loader :show="showLoader"/>
  </main>
</template>

<script>
import ContentHeader from '@/components/content/ContentHeader'
import Charts from '@/components/content/Charts.vue'
import Summary from '@/components/content/Summary.vue'
import Loader from '@/components/utils/Loader'
import {mapState} from 'vuex'


export default {
  components: {
    ContentHeader, Charts, Loader, Summary
  },

  computed: {
    ...mapState(['layouts', 'activeLayout1Id', 'activeLayout2Id']),
    sumData() {
      return this.layouts.layout1[this.activeLayout1Id].layout2[this.activeLayout2Id].data
    }
  },

  data: () => ({
    showLoader: false
  }),

  methods: {
    loaderToggle() {
      this.showLoader = !this.showLoader
    },

    loading() {
      this.loaderToggle()
      setTimeout(this.loaderToggle, 5000)
    }
  }
}
</script>


<style lang="scss" scoped>

  .content {
    padding: 29px 40px 29px 40px;
    background-color: $background_color;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100vh;
    position: relative;
    
    .content_items {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: auto 145px 1fr 400px 200px 200px;
      grid-column-gap: 15px;
      grid-row-gap: 15px;

      .card {
        background: #FFFFFF;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        width: 100%;
      }

      .header {
        display: flex;
        grid-area: 1 / 1 / 2 / 9;
      }

      .summary {
        grid-area: 2 / 1 / 3 / 5;
      }

      .empty1 {
        grid-area: 3 / 1 / 4 / 3;
      }
      .empty2 {
        grid-area: 3 / 3 / 4 / 5;
        
      }      

      .charts {
        height: 380px;
        grid-area: 2 / 5 / 4 / 9;
        overflow: hidden;
      }

      .empty3 {
        grid-area: 4 / 1 / 5 / 6;
      }
      .empty4 {
        grid-area: 5 / 1 / 7 / 6;
        
      }
      .empty5 {
        grid-area: 4 / 6 / 6 / 9;
      }
    }
  }

  .modal {
    overflow: hidden;
  }

</style>
