/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'

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
            'font-size': '1.2em',
            'font-family': '"Courier Prime", monospace',
            ...defaultTitleStyles,
            p: {
              'margin-top': '0.8em',
              'margin-bottom': '0.8em'
            },
            img: {
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
    themes: ['autumn', 'forest'],
    base: true,
    styled: true,
    utils: true
  }
}
