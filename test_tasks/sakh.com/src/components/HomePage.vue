<template>
  <div>
    <v-row  v-if="adminMode">
      <v-col md="12">
        <v-btn
          class="ml-5 mb-1"
          color="success"
          :to="{name: 'NewsForm', params: {id: 'new'}}"
        >
          Добавить новость
        </v-btn>	
      </v-col>
    </v-row>

    <v-row>
      <v-col md="4">
        <v-select
          clearable
          :items="categories"
          label="рубрики"
          solo
          @change="categoryChange"
          v-model="selectedCategory"
        ></v-select>
      </v-col>
      <v-col md="4">
        <v-select
          :items="sortModes"
          item-text="name"
          label="сортировать"
          solo
          @change="sortChange"
          v-model="selectedSort"
        ></v-select>
      </v-col>
    </v-row>    

    <v-card flat
      v-for="(news) in visibleNews" 
      :key="news.id" 
      >
        <v-row>
          <v-col md="4" class="ml-1 pt-1 pb-0">
            <v-label>{{formatNewsDate(news.addedDateTime)}}</v-label>
          </v-col>
          <v-spacer></v-spacer>
          <v-col md="4" class="ml-1 pt-1 pb-0 text-end">
            <v-icon x-small>fas fa-thumbs-up</v-icon> 
            {{news.likes}}
          </v-col>

          <v-col md="10 pa-0">
            <v-hover v-slot:default="{ hover }">
              <router-link class="routerLink" :to="{name: 'NewsPage', params: {id: news.id}}">
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title :class="{'primary--text': hover}">{{news.header}}</v-list-item-title>
                    <v-list-item-subtitle :class="{'primary--text': hover}">{{news.shortText}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </router-link>
            </v-hover>
          </v-col>
          <v-col md="2 pa-0">
            <v-img v-if="news.imgLink"
            :src="`${imgPath}${news.imgLink}`"
            max-width="100%"
            max-heigth="100%"
            class="mb-1"
            
            />
          </v-col>

          <v-col md="10" v-if="adminMode">
            <v-tooltip bottom open-delay="500">
              <template v-slot:activator="{on}">
                <v-btn 
                  class="ml-3"
                  v-on="on"
                  small
                  text
                  :to="{name: 'NewsForm', params: {id: news.id}}"
                  color="secondary"
                  >
                  <v-icon x-small>fas fa-pencil-alt</v-icon>
                </v-btn>	
              </template>
              <span>Редактировать</span>
            </v-tooltip>

            <v-tooltip bottom open-delay="500">
              <template v-slot:activator="{on}">
                <v-btn
                  class="ml-3"
                  v-on="on"
                  small
                  text
                  @click="deleteNews(news)"
                  color="error"
                  >
                  <v-icon x-small>fas fa-trash-alt</v-icon>
                </v-btn>	
              </template>
              <span>Удалить</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {formatDateTime} from '@/mixins/formatDateTime.js'
import {deleteNews} from '@/mixins/deleteNews.js'
//import {eventBus} from '@/main'

export default {
  mixins: [formatDateTime, deleteNews],
  computed: {
    ...mapState(['visibleNews', 'adminMode', 'imgPath', 'categories', 'sortModes', 'curCategory', 'curSort']),
  },
  
  data: () => ({
    selectedCategory: null,
    selectedSort: null
  }),

  methods: {
    ...mapActions(['serverRequest']),
    ...mapMutations(['setServerSendedObj', 'setCurCategory', 'setCurSort', 'applyFilter', 'applySort']),
    sortChange() {
      this.setCurSort(this.selectedSort)
      this.applySort(this.sortModes.filter(sort => {return this.selectedSort == sort.name?true:false})[0].field)
    },
    categoryChange() {
      this.setCurCategory(this.selectedCategory)
      this.applyFilter()
    }
  },

  created() {
    this.selectedSort = this.sortModes[0]
  }
}
</script>