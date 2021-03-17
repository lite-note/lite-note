import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/text-editor',
    name: 'TextEditor',
    component: () =>
      import(/* webpackChunkName: "text-editor" */ '@/views/TextEditor.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    path: '/repo-list',
    name: 'RepoList',
    component: () =>
      import(/* webpackChunkName: "repo-list" */ '@/views/RepoList.vue')
  },
  {
    path: '/:user?/:repo?',
    name: 'Home',
    props: true,
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
