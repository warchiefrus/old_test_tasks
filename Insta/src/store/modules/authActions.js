
import axios from 'axios'
import {eventBus} from '@/main'

export const authActions = {
	namespaced: false,
  actions: {
		async serverLogin({rootState, commit}, request) {
			let result = null
			await axios.post(`${rootState.srvPath}login.php`, {
				request
			}, {
				headers: {'Content-Type': 'application/json'},
			})
			.then(data => {
				if (data.data.error) {
					result = false
				} else {
					switch (data.data.action) {
						case "login_user": {
							commit('setUser', data.data)
							result = true
							break
						}	
						case "logout_user": {
							commit('userLogout')
							result = true
							break
						}
						case "register_user": {
							result = true
							break
						}
					}
				}
			})
			.catch(error => {
				eventBus.$emit('showInfo', 'Ошибка соединения')
				console.log(error);
				result = false
			})
			return result
		},
  },

}

export default authActions