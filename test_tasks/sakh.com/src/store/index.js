import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {eventBus} from '@/main'

Vue.use(Vuex)


//const Srv = 'http://localhost/test/testapp/php/'
const Srv = 'php/'

export default new Vuex.Store({
  state: {
    allNews: [],
    visibleNews: [],
    categories: ['Политика', 'Экономика', 'Спорт', 'Здравоохранение'],
    sortModes: [{name: 'по дате', field: 'addedDateTime'}, 
                {name: 'по лайкам', field: 'likes'}],
    curCategory: null,
    curSort: null,
    requestProgress: null,
    serverSendedObjNew: null,
    serverSendedObjOld: null,
    adminMode: true,
    imgPath: `${Srv}/img/`
  },
  mutations: {
    setCurCategory(state, payload) {
      state.curCategory = payload
    },
    setCurSort(state, payload) {
      state.curSort = payload
    },
    setRequestProgress(state, payload) {
			state.requestProgress = payload
    },
    resultGetNews(state, payload) {
      state.allNews = payload
      this.commit('applyFilter')
    },
    addNews(state, payload) {
      state.serverSendedObjNew.id = payload.id
      state.serverSendedObjNew.addedDateTime = payload.dateTime
      state.serverSendedObjNew.likes = 0
      let News = new Object()
      News = Object.assign(News, state.serverSendedObjNew)
			state.allNews.unshift(News)
      state.serverSendedObjNew = null
      this.commit('applyFilter')
    },
    delNews(state) {
			state.allNews.splice(state.allNews.indexOf(state.serverSendedObjNew),1)
      state.serverSendedObjNew = null
      this.commit('applyFilter')
		},
    setAdminMode(state, payload) {
      state.adminMode = payload
    },
    addLike(state) {
      state.serverSendedObjNew.likes++
      state.serverSendedObjNew = null
    },
    setServerSendedObj(state, payload) {
      state.serverSendedObjNew = payload.new
      state.serverSendedObjOld = payload.old
    },
    updateData(state) {
			state.serverSendedObjOld = Object.assign(state.serverSendedObjOld, state.serverSendedObjNew)
      state.serverSendedObjNew = null
      state.serverSendedObjOld = null
      this.commit('applyFilter')
    },
    applyFilter(state) {
      if (state.curCategory) {
        state.visibleNews = state.allNews.filter(news => {return state.curCategory == news.category?true:false})
      } else {
        state.visibleNews = state.allNews.filter(() => {return true})
      }
    },
    applySort(state, payload) {
      state.allNews.sort(function (a, b) {
        console.log(payload)
        if (a[payload] > b[payload])
        return -1;
        if (a[payload] < b[payload])
          return 1;
        return 0;
      });
      this.commit('applyFilter')
    }
  },
  actions: {
    async serverRequest({commit}, request) {
			let result = {status: true, error: ''}
			await axios.post(`${Srv}GetData.php`, {
				request
			}, {
				headers: {'Content-Type': 'application/json'},
			})
			.then(data => {
				if (data.data.error) {
					eventBus.$emit('showInfo', data.data.error)
					result.error = data.data.error
				} else {
					switch (data.data.action) {
						case "getNews": {
							commit('resultGetNews', data.data.result)
							break
						}
						case "addNews": {
							commit('addNews', data.data)
							break
						}
						case "updateNews": {
							commit('updateData')
							break
						}
						case "delNews": {
							commit('delNews')
							break
            }		
            case "addLike": {
							commit('addLike')
							break
						}	
						default: {
							break
						}
					}
				}
			})
			.catch(error => {
				eventBus.$emit('showInfo', 'Ошибка соединения ' + error)
			})
			return result
		},


		async uploadFile({commit}, request) {
			let result = {status: true, filename: '', error: ''}
			commit('setRequestProgress', 0)
			await axios.post(`${Srv}uploadFile.php`, 
				request
			, {
				headers: {'Content-Type': 'multipart/form-data'},
				onUploadProgress: function (progressEvent) {
					let percent = Math.floor(progressEvent.loaded / progressEvent.total * 100)
					commit('setRequestProgress', percent)
				},
			})			
			.then(res => {
				result.filename = res.data.filename
			})
			.catch(error => {
        result.error = 'unknown'
        result.status = false
        eventBus.$emit('showInfo', 'Ошибка при загрузке файла ' + JSON.stringify(error))
        console.log(error)
			});
			
			return result
    },
    


  },
  modules: {
  }
})
