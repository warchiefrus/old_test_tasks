module.exports = {
  head: {
    title: 'ekf',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'EKF test task' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@/assets/scss/main.scss',
  ],
  
  loading: { color: '#3B8070' },

  modules: [
    'nuxt-graphql-request'
  ],
 
  graphql: {
    endpoint: 'https://sweet-hedgehog-55.hasura.app/v1/graphql',
    options: {},
    useFetchPolyfill: true,
    includeNodeModules: true,
  },

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

