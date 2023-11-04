import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { UserConfigExport } from 'vitest/dist/config'

const mainColor = '#ffffff'

export default defineConfig(({ command }) => {
  const config: UserConfigExport = {
    plugins: [
      vue(),
      VueI18nPlugin({}),
      VitePWA({
        registerType: 'prompt',
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'masked-icon.svg',
          'assets/*.svg'
        ],
        manifest: {
          name: 'Lite Note',
          short_name: 'LiteNote',
          description: 'Lite note taking',
          background_color: mainColor,
          theme_color: mainColor,
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'masked-icon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        }
      })
    ],
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
