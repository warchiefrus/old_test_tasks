<template>
  <v-card class="pl-5 pr-5">
    <v-card-title>
      <v-row class="text-center">
        <v-col cols="12">
          <span v-if="currentNews" class="headline">
            Редактор новости
          </span>
          <span v-else class="headline">
            Добавление новости
          </span>
        </v-col>
      </v-row>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-form ref="form" :value="formValid">
        <v-text-field
          class="mb-3 mt-6"
          dense
          label="Заголовок"
          v-model="currentNewsLocal.header"
          clearable
          required
          :rules="newsRules"
          :counter="255"
          />

        <v-text-field
          class="mb-3"
          dense
          label="Краткое описание"
          v-model="currentNewsLocal.shortText"
          clearable
          :counter="255"
          :rules="newsRules"
          />

        <v-autocomplete
          class="mb-3" 
          v-model="currentNewsLocal.category"
          :items="categories"
          label="Рубрика"
          item-text="name"
          dense
          clearable
          required
          :rules="newsRules"
          />
        
        <div v-if="currentNewsLocal.imgLink">
          <v-img 
            :src="`${imgPath}${currentNewsLocal.imgLink}`"
            width="100%"
            class="mt-5"
            />
            <v-btn 
              text
              class="mb-5 white--text"
              @click="delFile" 
              color="error"
            >
            Удалить
          </v-btn>
        </div>
        
        <v-file-input v-else
          class="mb-3" 
          show-size 
          small-chips 
          clearable 
          spellcheck="false" 
          dense 
          accept=".jpg,.jpeg,.png" 
          label="Изображение"
          :rules="imgRules"
          ref="img"
          v-model="img"
          />

        <v-textarea
          class="mb-3"  
          label="Текст новости"
          dense
          outlined
          v-model="currentNewsLocal.text"
          auto-grow
          clearable
          />

      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-row
        class="mb-3 mt-3"
        justify="center"
        no-gutters
      >
        <v-btn color="success" class="mr-2 ml-2" @click="saveNews" ><v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Сохранить</v-btn>
        <v-btn color="warning" class="mr-2 ml-2" @click="clearForm" ><v-icon left>mdi-close-circle-outline</v-icon>Очистить</v-btn>
        <v-btn color="error" class="mr-2 ml-2" :disabled="!currentNews" @click="delNews" ><v-icon small left>fas fa-trash-alt</v-icon>Удалить</v-btn>
        
      </v-row>
    </v-card-actions>

    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      color="success"
      >
      {{ snackbar_text }}
      <v-btn
          text
          @click="snackbar = false"
      >
          Закрыть
      </v-btn>
    </v-snackbar> 
  </v-card>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {deleteNews} from '@/mixins/deleteNews.js'
import {eventBus} from '@/main'

export default {
  mixins: [deleteNews],
  props: ["id"],
  computed: {
    ...mapState(['categories', 'allNews', 'imgPath']),
  },
  data: () => ({
    img: null,
    action: '',
    formValid: false,
    currentNewsLocal: {
      header: '',
      imgLink: '',
      shortText: '',
      category: null,
      text: ''
    },
    currentNews: null,

    imgRules:[
      value => !value || value.size < 51200000 || 'Размер файла не должен превышать 5 MB!',
    ],
    newsRules: [
      v => !!v || 'Поле не должно быть пустым',
      v => (v && v.length <= 255) || 'Не должно превышать 255 символов',
    ],
    snackbar: false,
    snackbar_text: 'сохранено',
  }),
  methods: {
    ...mapActions(['serverRequest', 'uploadFile']),
    ...mapMutations(['setServerSendedObj']),

    async saveNews() {
      this.formValid = this.$refs.form.validate()
      if (this.formValid) {
        eventBus.$emit('startLoading')
        if (this.img) {
          let formDataFile = new FormData();
          formDataFile.append('img', this.img);
          result = await this.uploadFile(formDataFile)
          if (result.filename) {
              this.currentNewsLocal.imgLink = result.filename
          } else {
              eventBus.$emit('endLoading')
              return
          }
        }

        this.setServerSendedObj({new: this.currentNewsLocal, old: this.currentNews})
        let result = await this.serverRequest({action: this.action, data: this.currentNewsLocal})
        if (result) {
          this.snackbar = true
          this.currentNews = null
          this.clearForm()
        }
        eventBus.$emit('endLoading')
      }
    },
    delNews() {
      this.deleteNews(this.currentNews)
      this.$router.push('/')
    },
    delFile() {
      this.currentNewsLocal.imgLink = ''
    },
    clearForm() {
      for (let prop in this.currentNewsLocal) {
        this.currentNewsLocal[prop] = null
      }
      this.img = null
      this.$refs.form.resetValidation()
    },
  },
  mounted() {
    if (this.id != 'new') {
      this.currentNews = this.allNews.filter(news => {return this.id == news.id?true:false})[0]
      this.currentNewsLocal = Object.assign(this.currentNewsLocal, this.currentNews)
      this.action = 'updateNews'
    } else {
      this.action = 'addNews'
    }
  },
}
</script>

