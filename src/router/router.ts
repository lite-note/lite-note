import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/note/:user/:repo',
    name: 'Note',
    props: true,
    component: () => import(/* webpackChunkName: "note" */ '@/views/Note.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
