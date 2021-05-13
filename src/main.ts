import '@/registerServiceWorker'
import 'notyf/notyf.min.css'

import { createPinia } from 'pinia'
import App from './App.vue'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { messages } from '@/locales/message'
import { router } from '@/router/router'

const i18n = createI18n({
  locale: 'en',
  messages
})

createApp(App).use(router).use(i18n).use(createPinia()).mount('#app')
