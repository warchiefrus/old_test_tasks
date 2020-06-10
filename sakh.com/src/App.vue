<template>
  <v-app>

    <v-overlay  :value="overlayLoader" z-index="9999">
      <v-progress-circular v-if="requestProgress"
        :size="64"
        indeterminate
      >
        {{ requestProgress }} %
      </v-progress-circular>
      <v-progress-circular v-else indeterminate size="64"></v-progress-circular> 
    </v-overlay>

    <v-app-bar
      app
      dark
      dense
			flat
    >
      <v-toolbar-title
        >
        Новостной сайт
      </v-toolbar-title>

      <v-btn 
        text
        class="ml-5 white--text"
        to="/" 
        exact
        active-class="primary white--text"
      >
        Главная
      </v-btn>

      <v-spacer></v-spacer>

      <v-switch
        class="mt-5"
        v-model="localAdminMode"
        label="Режим админа"
        color="primary"
      ></v-switch>
    </v-app-bar>

    <v-row>
      <v-col md="1"/>
      <v-col md="10">
      <v-content>
        <router-view/>
      </v-content>
      </v-col>
      <v-col md="1"/>
    </v-row>

    <InfoDialog
			:dialog="infoDialogShow"
			:message="message"
			@closeInfo="closeInfo"
		/>  
  </v-app>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import InfoDialog from '@/components/InfoDialog.vue'
import {eventBus} from '@/main'

export default {
  name: 'App',

  components: {
    InfoDialog
  },

  computed: {
    ...mapState(['adminMode', 'requestProgress']),
    localAdminMode: {
      get: function() {
        return this.adminMode
      },
      set: function(value) {
        this.setAdminMode(value)
      }
    }
  },

  data: () => ({
    infoDialogShow: false,
    message: null,
    overlayLoader: false
  }),

  methods: {
    ...mapActions(['serverRequest']),
    ...mapMutations(['setAdminMode', 'setRequestProgress']),
    showInfo(payload) {
      this.message = payload
      this.infoDialogShow = true
    }, 
    closeInfo() {
      this.infoDialogShow = false
    },
    startLoading() {
      this.setRequestProgress(0)
      this.overlayLoader = true
    }, 
    endLoading() {
      this.overlayLoader = false
    },
  },

  async mounted() {
    eventBus.$on('showInfo', this.showInfo)
    eventBus.$on('startLoading', this.startLoading)
    eventBus.$on('endLoading', this.endLoading)
    this.startLoading()
    await this.serverRequest({action: 'getNews', data: null})
    this.endLoading()
  }
};
</script>

<style>
  .routerLink{
    text-decoration: none;
  }
</style>
