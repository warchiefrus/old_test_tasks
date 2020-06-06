import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/components/HomePage.vue')
  },
  {
    path: '/NewsForm/:id',
    name: 'NewsForm',
    props: true,
    component: () => import('@/components/NewsForm.vue')
  },
  {
    path: '/NewsPage/:id',
    name: 'NewsPage',
    props: true,
    component: () => import('@/components/NewsPage.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
