import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apartments: []
  },
  mutations: {
    setData(state, payload) {
      state.apartments = payload
    },
    addLikeToApartment(state, payload) {
      state.apartments.find(item => item === payload).likes++
    }
  },
  actions: {
    getData({commit}) {
      axios.get("JSON/entities.json")
      .then(response => {
        console.log(response.data.response)
        const responseWithLikes = response.data.response.map(item => {
          item.likes = 0
          return item
        })
        commit('setData', [...responseWithLikes,
           ...JSON.parse(JSON.stringify(responseWithLikes)),
           ...JSON.parse(JSON.stringify(responseWithLikes)),
           ...JSON.parse(JSON.stringify(responseWithLikes)), 
           ...JSON.parse(JSON.stringify(responseWithLikes))])
        })  
    }
  },
  modules: {
  }
})
