import {eventBus} from '@/main'
export const deleteNews = {
  methods: {
    async deleteNews(news) {
      this.setServerSendedObj({new: news, old: null})
      eventBus.$emit('startLoading')
      await this.serverRequest({action: 'delNews', data: news})
      eventBus.$emit('endLoading')
    }
  }
}