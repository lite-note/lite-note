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

const BOX_SHADOW = "6px"

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
              "text-align": "justify",
              // "text-wrap": "balance",
            },
            "img, video": {
              margin: "auto",
              "border-radius": "0.5rem",
              "box-shadow":
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              "max-width": `calc(100% - 2 * ${BOX_SHADOW})`,
            },
            a: {
              "font-weight": 600,
              // "text-decoration": "wavy underline var(--color-contrast-content)",
              // "text-decoration-thickness": "0.1em",
              "text-decoration": "none",
              color: "var(--color-accent)",
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
