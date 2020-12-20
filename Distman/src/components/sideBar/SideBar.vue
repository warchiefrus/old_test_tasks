<template>
  <aside class="sidePanel">

    <div class="sidePanel_1">
      <div class="logo">
        <img src="@/assets/logo.png" width="32" height="32">
      </div>

      <Layout1ButtonSwitch v-for="(layout, index) in layouts.layout1" :key="index"
        :layout="layout"
        :activeLayout="activeLayout1Id"
        @btnClick="changeLayout1"
      />
    </div>

    <div class="sidePanel_2" :style="`width: ${panel2Width}px;`">
      <div :class="{panel_expanded: layOut2Expanded, panel_notExpanded: !layOut2Expanded}">
        <Layout2ButtonSwitch v-for="(layout, index) in layout2" :key="index"
          :layout="layout"
          :activeLayout="activeLayout2Id"
          :expanded="layOut2Expanded"
        />
      </div>
      
      <Layout2ButtonFooter
        :expanded="layOut2Expanded"
        @btnClick="set_layOut2Expanded"
      />
    </div>

  </aside>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Layout1ButtonSwitch from '@/components/sideBar/Layout1ButtonSwitch'
import Layout2ButtonSwitch from '@/components/sideBar/Layout2ButtonSwitch'
import Layout2ButtonFooter from '@/components/sideBar/Layout2ButtonFooter'

export default {
  components: {
    Layout1ButtonSwitch, Layout2ButtonSwitch, Layout2ButtonFooter
  },

  computed: {
    ...mapState(['layouts', 'activeLayout1Id', 'activeLayout2Id', 'layOut2Expanded']),
    panel2Width() {
      return this.layOut2Expanded? 300 : 70
    },
    layout2() {
      return this.layouts.layout1[this.activeLayout1Id].layout2
    }
  },

  methods: {
    ...mapMutations(['set_layOut2Expanded', 'set_activeLayout1Id']),
    changeLayout1(id) {
      this.set_activeLayout1Id(id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidePanel {
    display: flex;
    height: 100vh;
    
    
    .sidePanel_1 {
      background-color: #0043C4;
      width: 70px;
      box-shadow: 0px 0px 34px rgba(0, 0, 0, 0.15);
      z-index: 1;
      padding: 15px 15px 15px 15px;

      .logo {
        margin-bottom: 44px;
      }
    }
    .sidePanel_2 {
      background-color: #0043C4;
      width: 70px;
      display: grid;
      grid-template-rows: 1fr 50px;
      
      .panel_expanded {
        padding: 20px;
      }

      .panel_notExpanded {
        padding: 20px 10px 20px 10px;
      }
    }
  }



</style>
