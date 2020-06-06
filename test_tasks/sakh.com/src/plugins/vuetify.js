import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VueI18n from 'vue-i18n'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)
Vue.use(VueI18n)

const messages = {
  ru: {
    $vuetify: {
      noDataText: 'Ничего не найдено',
    },
  },
}

const i18n = new VueI18n({
  locale: 'ru', 
  messages, 
})

const opts = {
  icons: {
    iconfont: 'mdi', 
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  customProperties: true
}


export default new Vuetify(opts);
