// @ts-check

const { definePluginRules } = require('@jaxonzhao/eslint-utils')

/**
 * reference
 * - https://github.com/xojs/xo
 * - https://github.com/xojs/eslint-config-xo v0.43.1
 * - https://github.com/standard/eslint-plugin-standard v5.0.0
 * - https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb v15.0.0
 */

module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
    commonjs: true,
  },
  reportUnusedDisableDirectives: true,
  settings: {
    'import/core-modules': ['electron', 'atom'],
  },
  plugins: [
    'import',
    'n',
    'unicorn',
    // WON't use eslint-plugin-promise: prefer to use typescript/typescript-eslint to avoid these problems
  ],
  extends: [
    // WON't use eslint-plugin-prettier, see https://prettier.io/docs/en/integrating-with-linters.html
    require.resolve('eslint-config-prettier'),
  ],
  rules: {
    ...require('./rules/eslint-generated.cjs'),
    ...require('./rules/import.cjs'),
    ...require('./rules/n.cjs'),
    ...require('./rules/unicorn.cjs'),
  },
  overrides: [
    {
      files: ['**/*.config.js'],
      rules: {
        ...definePluginRules('unicorn', {
          'prefer-module': 'off',
        }),
      },
    },
  ],
}
