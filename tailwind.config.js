/** @type {import('tailwindcss').Config} */
const dotenv = require('dotenv')

import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'

dotenv.config()

const LIGHT_MODE = process.env.VITE_LIGHT_MODE
const DARK_MODE = process.env.VITE_DARK_MODE

const defaultTitleStyles = Array.from(
  { length: 6 },
  (_, k) => `h${k + 1}`
).reduce(
  (acc, heading) => ({
    ...acc,
    [heading]: {
      'margin-top': '0',
      'margin-bottom': '0.5em'
    }
  }),
  {}
)

module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            'font-size': '13pt',
            'font-family': '"Courier Prime", monospace',
            ...defaultTitleStyles,
            p: {
              'margin-top': '0.8em',
              'margin-bottom': '0.8em',
              'text-align': 'justify'
            },
            img: {
              'margin-top': 0,
              'margin-bottom': 0,
              'border-radius': '1rem'
            },
            a: {
              'text-decoration': 'none',
              color: 'oklch(var(--s))'
            },
            'a:hover': {
              'text-decoration': 'underline'
            },
            li: {
              'margin-top': 0,
              'margin-bottom': 0
            }
          }
        }
      })
    }
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [LIGHT_MODE, DARK_MODE],
    base: true,
    styled: true,
    utils: true
  }
}
