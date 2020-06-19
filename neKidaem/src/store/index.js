import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: [],
    token: null,
    draggedCard: null,
  },
  mutations: {
    set_draggedCard(state, payload) {
      state.draggedCard = payload
    },

    dragEnd(state) {
      state.draggedCard = null
    },

    set_token(state, payload) {
      state.token = payload
    },

    set_cards(state, payload) {
      state.cards = payload
    },
  },

  actions: {
    async deleteCard({state, dispatch}, request) {
			await axios.delete(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${request.id}/` 
			, {
				headers: {'Content-Type': 'application/json', 'Authorization': "JWT " + state.token},
			})
			.then(() => {
        dispatch('getCards')
			})
			.catch(error => {
        console.log(error)
			})
    },

    async updateCard({state, dispatch}, request) {
			await axios.patch(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${request.id}/`, 
				request.card
			, {
				headers: {'Content-Type': 'application/json', 'Authorization': "JWT " + state.token},
			})
			.then(() => {
        dispatch('getCards')
        
			})
			.catch(error => {
        console.log(error)
			})
    },

    async postCard({state, dispatch}, request) {
			await axios.post(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/`, 
				request
			, {
				headers: {'Content-Type': 'application/json', 'Authorization': "JWT " + state.token},
			})
			.then(() => {
        dispatch('getCards')
			})
			.catch(error => {
        console.log(error)
			})
    },
    
    async refreshToken({state, commit}) {
      let request = {token: state.token}
			await axios.post(`https://trello.backend.tests.nekidaem.ru/api/v1/users/refresh_token/`, 
				request
			, {
				headers: {'Content-Type': 'application/json', 'Authorization': "JWT " + state.token},
			})
			.then(renponse => {
        localStorage.setItem('token', renponse.data.token)
        commit('set_token', renponse.data.token)
			})
			.catch(error => {
        console.log(error)
			})
		},    
  
    async getCards({state, commit}) {
			await axios.get(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/`, 
			{
				headers: {'Content-Type': 'application/json', 'Authorization': "JWT " + state.token},
			})
			.then(renponse => {
        commit('set_cards', renponse.data)
			})
			.catch(error => {
        console.log(error)
			})
		},

    async login({commit}) {
      let username = localStorage.getItem('username') || 'tester_' + +new Date()
      let password = localStorage.getItem('password') || '4?testTrelloApp'
      let path = ''
      if (localStorage.getItem('username')) {
        path = 'https://trello.backend.tests.nekidaem.ru/api/v1/users/login/'
      } else {
        path = 'https://trello.backend.tests.nekidaem.ru/api/v1/users/create/'
      }

      let request = {username, password}

			await axios.post(path, 
				request
			, {
				headers: {'Content-Type': 'application/json'},
			})
			.then(renponse => {
        if (renponse.data.token) {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
          localStorage.setItem('token', renponse.data.token)
          commit('set_token', renponse.data.token)
        }
			})
			.catch(error => {
				console.log(error);
			})
		},
  },

  modules: {
  }
})
