import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Sobre from '@/components/Sobre.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: Sobre
    }
  ]
})

export default router
