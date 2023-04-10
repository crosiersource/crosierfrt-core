module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  ignorePatterns: [
    "/node_modules/",
    "/home/carlos/dev/github/crosier-vue2/dist/crosier-vue2.es.js" // adicione o caminho para o arquivo aqui
  ],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
