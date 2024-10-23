// eslint.config.cjs

import pluginVue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['**/*.config.js', 'node_modules/'],
    rules: {
      semi: 'error',
      'prefer-const': 'error',
    },
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
          ignores: [],
        },
      ],
      'vue/singleline-html-element-content-newline': 'off', // Desativa a nova linha para conteúdo de elementos HTML de uma linha
      'vue/multiline-html-element-content-newline': 'error', // Você pode querer ajustar isso, dependendo da sua preferência
      'vue/attribute-hyphenation': 'off',
      'vue/max-attributes-per-line': 'off',
      'function-paren-newline': 'off',
      'newline-before-return': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
          selfClosingTag: {
            singleline: 'never',
            multiline: 'always',
          },
        },
      ],
    },
  },
];
