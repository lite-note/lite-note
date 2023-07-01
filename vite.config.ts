import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { UserConfigExport } from 'vitest/dist/config'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig(({ command }) => {
  const config: UserConfigExport = {
    plugins: [vue(), VueI18nPlugin({})],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'node-fetch': 'isomorphic-fetch'
      }
    }
  }

  if (command === 'serve') {
    config.define = {
      global: {}
    }
  }

  return config
})
