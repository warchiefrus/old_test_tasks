import Vue from 'vue'
import Vuex from 'vuex'
import authActions from '@/store/modules/authActions'
import userActions from '@/store/modules/userActions'

Vue.use(Vuex)

const Srv = 'http://localhost/Employers_test_tasks/Insta/php/'
//const Srv = 'php/'

export default new Vuex.Store({
  state: {
		user: null,
		userId: null,
		userToken: null,
		userBookmarks: [],
		isAuthenticated: false,
		srvPath: Srv,
		contacts: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
			state.userToken = payload.userToken 
			state.userId = payload.userId
			state.userBookmarks = JSON.parse(payload.userBookmarks)
			
			if (state.userToken) {
				state.isAuthenticated = true
				localStorage.setItem('userToken', JSON.stringify(payload.userToken))
			} else {
				state.isAuthenticated = false
			}
    },
    
		userLogout(state) {
			state.user = null
			state.userToken = null
			state.isAuthenticated = false
			localStorage.setItem('userToken', '')
		}, 

		updateContacts(state, payload) {
			state.contacts = payload
		},

		addBookmark(state, payload) {
			state.userBookmarks.push(payload)
		}
  },
  actions: {
  },
  modules: {
		authActions, userActions
  }
})
