const path = require('path');
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier'
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '')],
        extensions: ['.js', '.ts']
      },
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json')
      }
    }
  },
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  rules: {
    'arrow-body-style': 'off',
    'click-events-have-key-events': 'off',
    radix: 'off',

    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'no-shadow': 'off',
    'no-static-element-interactions': 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I']
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        prefix: ['T']
      }
    ],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 140,
        jsxSingleQuote: true
      }
    ],
    overrides: [
      {
        files: ['*.js', '*.ts'],
        rules: {
          'simple-import-sort/imports': [
            'error',
            {
              groups: [['^(~)(/.*|$)'], ['^\\u0000'], ['^\\.\\.(?!/?$)', '^\\.\\./?$'], ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']]
            }
          ]
        }
      }
    ]
  }
};
