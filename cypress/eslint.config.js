const js = require('@eslint/js');
const cypress = require('eslint-plugin-cypress');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'reports/**',
      'mochawesome-report/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['cypress/**/*.js', 'cypress.config.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        Cypress: 'readonly',
        cy: 'readonly',
        describe: 'readonly',
        context: 'readonly',
        it: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
      },
    },

    plugins: {
      cypress,
    },

    rules: {
      ...cypress.configs.recommended.rules,

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'cypress/no-unnecessary-waiting': 'error',
      'cypress/unsafe-to-chain-command': 'off',
    },
  },

  prettier,
];
