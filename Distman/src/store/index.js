import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layouts: {
      layout1: 
      [
        {id: 0, name: '1', layout2: [
          {id: 0, name: 'Общая аналитика', data: [{sum: 3560, percent: 13}, {sum: 7568562, percent: -0.3}, {sum: 2356, percent: -5.4}]},
          {id: 1, name: 'Рефтинский филиал'},
          {id: 2, name: 'Конаковский филиал'} ]},

        {id: 1, name: '2', layout2: [
          {id: 0, name: 'Какой пункт по умолчанию', data: [{sum: 3560, percent: 13}, {sum: 7568562, percent: -0.3}, {sum: 2356, percent: -5.4}]},
          {id: 1, name: 'Еще какой то пункт'},
          {id: 2, name: 'И еще'} ]}
      ],
    },

    activeLayout1Id: 0,
    activeLayout2Id: 0,
    layOut2Expanded: true,

  },
  mutations: {
    set_activeLayout1Id(state, payload) {
      state.activeLayout1Id = payload
      this.commit('saveState')
    },
    set_layOut2Expanded(state) {
      state.layOut2Expanded = !state.layOut2Expanded
      this.commit('saveState')
    },
    change_data(state, payload) {
      console.log(state)
      state.layouts.layout1[state.activeLayout1Id].layout2[state.activeLayout2Id].data = payload
      this.commit('saveState')
    },
    saveState(state) {
      localStorage.setItem('state', JSON.stringify(state))
    },
    loadState(state) {
      Object.assign(state, JSON.parse(localStorage.getItem('state')))
    }
  },
  actions: {
  },
  modules: {
  }
})
