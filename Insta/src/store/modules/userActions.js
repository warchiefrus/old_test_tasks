
import axios from 'axios'
import {eventBus} from '@/main'

export const userActions = {
	namespaced: false,
  actions: {
		async serverRequest({rootState, commit}, request) {
			let result = null
			
			await axios.post(`${rootState.srvPath}postData.php`, {
				request
			}, {
				headers: {'Content-Type': 'application/json'},
			})
			.then(data => {
				if (data.data.error) {
					result = false
				} else {
					switch (data.data.action) {
						case "get_contacts": {
							console.log(data.data.result)
							commit('updateContacts', data.data.result)
							result = true
							break
						}	
						case "bookmark_contact": {
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

export default userActions