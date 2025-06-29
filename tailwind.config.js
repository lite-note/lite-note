/** @type {import('tailwindcss').Config} */
const dotenv = require("dotenv")

dotenv.config()

const defaultTitleStyles = Array.from(
  { length: 6 },
  (_, k) => `h${k + 1}`,
).reduce(
  (acc, heading) => ({
    ...acc,
    [heading]: {
      "margin-top": "0",
      "margin-bottom": "0.5em",
    },
  }),
  {},
)

module.exports = {
  content: ["./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            ...defaultTitleStyles,
            "font-size": "13pt",
            "font-family": '"Courier Prime", monospace',
            p: {
              "margin-top": "0.8em",
              "margin-bottom": "0.8em",
              // "text-align": "justify",
              "text-wrap": "balance",
            },
            img: {
              "margin-top": 0,
              "margin-bottom": 0,
              "border-radius": "1rem",
            },
            a: {
              "text-decoration": "wavy underline var(--color-contrast-content)",
              // "text-decoration-thickness": "0.1em",
              color: "var(--color-contrast-content)",
            },
            "a.btn-primary": {
              color: "var(--color-secondary-content)",
            },
            "a:hover": {
              "text-decoration": "underline",
            },
            li: {
              "margin-top": 0,
              "margin-bottom": 0,
            },
          },
        },
      }),
    },
  },
}
