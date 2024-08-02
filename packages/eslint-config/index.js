// @ts-check

import { definePluginRules } from '@jaxonzhao/eslint-utils'
import globals from 'globals'

import prettier from 'eslint-config-prettier'
import nPlugin from 'eslint-plugin-n'
import unicornPlugin from 'eslint-plugin-unicorn'

import eslintRules from './rules/eslint-generated.js'
import nRules from './rules/n.js'
import unicornRules from './rules/unicorn.js'
/**
 * reference
 * - https://github.com/xojs/xo
 * - https://github.com/xojs/eslint-config-xo v0.43.1
 * - https://github.com/standard/eslint-plugin-standard v5.0.0
 * - https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb v15.0.0
 */

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.es2024,
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      'import/core-modules': ['electron', 'atom'],
    },
    plugins: {
      n: nPlugin,
      unicorn: /** @type {any}*/ (unicornPlugin),
      // WON't use eslint-plugin-promise: prefer to use typescript/typescript-eslint to avoid these problems
    },
    rules: {
      ...eslintRules,
      ...nRules,
      ...unicornRules,
    },
  },
  // WON't use eslint-plugin-prettier, see https://prettier.io/docs/en/integrating-with-linters.html
  prettier,
  {
    files: ['**/*.config.js'],
    rules: definePluginRules('unicorn', {
      'prefer-module': 'off',
    }),
  },
]
