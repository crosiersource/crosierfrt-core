// eslint.config.mjs
import { defineConfig } from 'eslint-define-config';

export default defineConfig({  
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // suas regras personalizadas aqui
  },
});
