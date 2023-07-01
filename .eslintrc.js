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
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier-vue/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
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
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)']
    }
  ]
}
