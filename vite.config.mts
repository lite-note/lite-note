import vue from "@vitejs/plugin-vue"
import path from "path"
import { defineConfig, type UserConfigExport } from "vite"
import { VitePWA } from "vite-plugin-pwa"

const mainColor = "#ffffff"

export default defineConfig(({ command }) => {
  const config: UserConfigExport = {
    plugins: [
      vue(),
      VitePWA({
        registerType: "prompt",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "masked-icon.svg",
          "assets/*.svg",
        ],
        manifest: {
          name: "Lite Note",
          short_name: "LiteNote",
          description: "Lite note taking",
          background_color: mainColor,
          theme_color: mainColor,
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "masked-icon.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "monochrome-icon.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "monochrome",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "node-fetch": "isomorphic-fetch",
      },
    },
  }

  if (command === "serve") {
    config.define = {
      global: {},
    }
  }

  return config
})
