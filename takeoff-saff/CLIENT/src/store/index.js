import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    userToken: null,
    srvPath: 'http://localhost:8000',
    contacts: []
  },
  mutations: {
    authenticated(state, payload) {
      state.isAuthenticated = true
      state.userToken = payload
    },
    logOut(state) {
      state.isAuthenticated = false
      state.userToken = null
    },
    get_contacts(state, payload) {
      console.log(payload)
      state.contacts = payload
    },
    post_contact(state, payload) {
      state.contacts.push(payload)
    },
    patch_contact(state, payload) {
      Object.assign(payload.oldContact, payload.newContact)
    },
    delete_contact(state, payload) {
      state.contacts.splice(state.contacts.indexOf(payload), 1)
    },
  },
  actions: {
    async serverLogin({state, commit}, request) {
      let result = null
			await axios.post(`${state.srvPath}/auth/login`, request, {
				headers: {'Content-Type': 'application/json'},
			})
			.then(renponse => {
        commit('authenticated', renponse.data.access_token)
        result = true
			})
			.catch(error => {
				console.log(error);
				result = false
			})
			return result
    },

    async getContacts({state, commit}) {
      console.log(`${state.srvPath}/contacts`)
			await axios.get(`${state.srvPath}/contacts`, 
			{
				headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + state.userToken},
			})
			.then(renponse => {
        commit('get_contacts', renponse.data)
			})
			.catch(error => {
        console.log(error)
			})
    },
    
    async postContact({state, commit}, contact) {
			await axios.post(`${state.srvPath}/contacts`, 
        contact
			, {
				headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + state.userToken},
			})
			.then(renponse => {
        commit('post_contact', renponse.data)
			})
			.catch(error => {
        console.log(error)
			})
    },

    async patchContact({state, commit}, contact) {
			await axios.patch(`${state.srvPath}/contacts/${contact.oldContact.id}`, 
        contact.newContact
			, {
				headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + state.userToken},
			})
			.then(renponse => {
        console.log(renponse.data)
        commit('patch_contact', {newContact: renponse.data, oldContact: contact.oldContact})
			})
			.catch(error => {
        console.log(error)
			})
    }, 
    
    async deleteContact({state, commit}, contact) {
			await axios.delete(`${state.srvPath}/contacts/${contact.id}` 
			, {
				headers: {'Content-Type': 'application/json', 'Authorization': "Bearer " + state.userToken},
			})
			.then(renponse => {
        console.log(renponse.data)
        commit('delete_contact', contact)
			})
			.catch(error => {
        console.log(error)
			})
    },    
  },
  modules: {
  }
})
