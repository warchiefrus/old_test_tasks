import Vue from 'vue'
import app from './App.vue'

Vue.config.productionTip = false

const mainItem = new Vue({
  render: h => h(app),
}).$mount('#vue_app')

export default mainItem