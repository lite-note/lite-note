require('@rushstack/eslint-patch/modern-module-resolution')

const DEV_TOOL_ACTIVATED =
  process.env.NODE_ENV === 'production' ? 'warn' : 'off'

module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript',
    'plugin:prettier-vue/recommended'
  ],
  plugins: ['simple-import-sort', 'unused-imports'],
  rules: {
    'no-console': DEV_TOOL_ACTIVATED,
    'no-debugger': DEV_TOOL_ACTIVATED,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    'prettier-vue/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'none',
        arrowParens: 'always'
      }
    ],
    'vue/no-v-html': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'vue-demi',
            importNames: ['computed'],
            message: 'Please use computed from vue instead.'
          }
        ]
      }
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)']
    }
  ]
}
