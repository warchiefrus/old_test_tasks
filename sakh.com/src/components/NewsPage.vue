<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{currentNews.header}}</span>
    </v-card-title>
    <v-card-subtitle>
      <span>{{currentNews.addedDateTime}}</span>
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-img 
      :src="`${imgPath}${currentNews.imgLink}`"
      width="100%"
      heigth="100%"
      />

    <v-card-text>
      <p>{{currentNews.text}}</p>
    </v-card-text>

    <v-row class="pa-0 ma-3">
        <v-col md="2" class="pa-0 ml-6">
          <v-btn
            text
            class="ml-5"
            to="/" 
            exact
          >
            <v-icon x-small class="mr-2">fas fa-long-arrow-alt-left</v-icon>на главную
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col md="2" class="d-flex pa-0 mr-6 text-end">
          <v-btn
            text
            class="ml-5"
            exact
            @click="addLike"
          >
            <v-icon x-small class="mr-1">fas fa-thumbs-up</v-icon>Лайк
          </v-btn>
          
          <span class="align-self-center ml-2">{{currentNews.likes}}</span>
        </v-col>
    </v-row>

    <v-row class="pa-0 ma-0">
      <v-col md="10" v-if="adminMode">
        <v-btn 
          class="ml-3"
          small
          text
          :to="{name: 'NewsForm', params: {id: currentNews.id}}"
          color="secondary"
          >
          <v-icon x-small class="mr-2">fas fa-pencil-alt</v-icon>
          Редактировать
        </v-btn>	
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {eventBus} from '@/main'

export default {
  props: ['id'],
  computed: {
    ...mapState(['allNews', 'imgPath', 'adminMode']),
    currentNews() {
      return this.allNews.filter(news => {return this.id == news.id?true:false})[0]
    }
  },
  methods: {
    ...mapActions(['serverRequest']),
    ...mapMutations(['setServerSendedObj']),
    async addLike() {
      eventBus.$emit('startLoading')
      this.setServerSendedObj({new: this.currentNews, old: this.currentNews})
      await this.serverRequest({action: 'addLike', data: {id: this.id}})
      eventBus.$emit('endLoading')
    }
  }
  
}
</script>