import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: '/:user/:repo/share/:note',
    name: 'ShareNotes',
    props: true,
    component: () =>
      import(/* webpackChunkName: "share-notes" */ '@/views/ShareNotes.vue')
  },
  {
    path: '/:user/:repo/inbox',
    name: 'FleetingNotes',
    props: true,
    component: () =>
      import(/* webpackChunkName: "inbox" */ '@/views/FleetingNotes.vue')
  },
  {
    path: '/:user/:repo/draft',
    name: 'DraftNotes',
    props: true,
    component: () =>
      import(/* webpackChunkName: "draft-notes" */ '@/views/DraftNotes.vue')
  },
  {
    path: '/:user/:repo/history',
    name: 'HistoricNotes',
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "historic-notes" */ '@/views/HistoricNotes.vue'
      )
  },
  {
    path: '/:user/:repo/spaced-repetition',
    name: 'SpacedRepetitionCard',
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "spaced-repetition-card" */ '@/views/SpacedRepetitionCard.vue'
      )
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'SpaceCowboy',
    component: () =>
      import(/* webpackChunkName: "space-cowboy" */ '@/views/SpaceCowboy.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
