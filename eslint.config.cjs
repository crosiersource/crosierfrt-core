// eslint.config.cjs

import pluginVue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['**/*.config.js', 'node_modules/'],
    rules: {
      semi: 'error',
      'prefer-const': 'error'
    }
  },
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: []
        }
      ]
    }
  }
];
