// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,

  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2021
  },

  rules: {
    semi: ['error', 'never'],
    'vue/html-self-closing': 'off',
    '@typescript-eslint/ban-ts-comment':'off',
    "no-undef":'warn',
    'vue/singleline-html-element-content-newline':'off',
    'vue/max-attributes-per-line': ['warn', {
      'singleline': { 'max': 4 }
    }]
  },
  ignorePatterns: ['dist', '**/*.d.ts']
})
