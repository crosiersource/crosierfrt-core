import { createWebHistory, createRouter } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import RawLayout from '@/layouts/RawLayout.vue'
import Home from '@/views/Home.vue'
import Sobre from '@/views/Sobre.vue'
import Settings from '@/views/Settings.vue'
import User from '@/views/User.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'


const routes = [
  { 
    path: '/', 
    component: MainLayout,
    children: [
      { path: '/home', component: Home, redirect: '/' },
      { path: '/sobre', component: Sobre },
      { path: '/settings', component: Settings },
      { path: '/user/:id', component: User },
    ]
  },
  { 
    path: '/login', 
    component: RawLayout,
    children: [
      { path: '', component: Login },
    ]
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: NotFound 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
