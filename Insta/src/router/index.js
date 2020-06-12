import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/',
    name: 'contacts',
    component: () => import('@/views/Contacts.vue')
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('@/views/Bookmarks.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && !store.state.isAuthenticated) {
    next({ name: 'login' })
  } else next()
})

export default router
