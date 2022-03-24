module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {},
  overrides: [
    {
      files: ['layouts/default.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
}
