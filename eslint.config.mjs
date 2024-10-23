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
      ],
      'vue/singleline-html-element-content-newline': 'off', // Desativa a nova linha para conteúdo de elementos HTML de uma linha
      'vue/multiline-html-element-content-newline': 'error',
      'vue/attribute-hyphenation': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 1, // número máximo de atributos em uma linha para elementos de uma linha
          multiline: {
            max: 1 // número máximo de atributos em múltiplas linhas
          }
        }
      ],
      'function-paren-newline': ['error', 'multiline']
    }
  }
];
