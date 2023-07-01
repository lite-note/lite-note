import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/HomeApp.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/repo-list',
    name: 'RepoList',
    component: () => import('@/views/RepoList.vue')
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
    component: () => import('@/views/ShareNotes.vue')
  },
  {
    path: '/:user/:repo/inbox',
    name: 'FleetingNotes',
    props: true,
    component: () => import('@/views/FleetingNotes.vue')
  },
  {
    path: '/:user/:repo/draft',
    name: 'DraftNotes',
    props: true,
    component: () => import('@/views/DraftNotes.vue')
  },
  {
    path: '/:user/:repo/history',
    name: 'HistoricNotes',
    props: true,
    component: () => import('@/views/HistoricNotes.vue')
  },
  {
    path: '/:user/:repo/spaced-repetition',
    name: 'SpacedRepetitionCard',
    props: true,
    component: () => import('@/views/SpacedRepetitionCard.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutApp.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'SpaceCowboy',
    component: () => import('@/views/SpaceCowboy.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
