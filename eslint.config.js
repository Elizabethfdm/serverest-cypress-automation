const js = require('@eslint/js');
const cypress = require('eslint-plugin-cypress');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

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
    files: ['cypress/**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.mocha,
        Cypress: 'readonly',
        cy: 'readonly',
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

  {
    files: ['cypress.config.js', 'eslint.config.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',

      globals: {
        ...globals.node,
      },
    },
  },

  prettier,
];
