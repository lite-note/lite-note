import Home from '@/views/HomeApp.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/repo-list',
    name: 'RepoList',
    component: () => import('@/views/RepoList.vue')
  },
  {
    path: '/:user/:repo',
    name: 'FluxNoteView',
    props: true,
    component: () => import('@/views/FluxNoteView.vue')
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
    path: '/:user/:repo/need-review-cards',
    name: 'NeedReviewCards',
    props: true,
    component: () => import('@/views/NeedReviewCards.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutApp.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
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
