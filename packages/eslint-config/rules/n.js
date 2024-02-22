// @ts-check

import { definePluginRules } from '@jaxonzhao/eslint-utils'

export default definePluginRules('n', {
  /**
   * See import.js for the reason why not enable import/require relared-rules.
   */

  // Best Practices
  'no-deprecated-api': 'error',

  // Possible Errors
  /**
   * It is not a good idea to regard a function as a node-style callback by name,
   * like in no-callback-literal
   */
  'handle-callback-err': ['error', '^(err|error)$'],
  'no-exports-assign': 'error',
  'no-new-require': 'error',
  'no-path-concat': 'error',
  'no-unpublished-bin': 'error',
  // we can use babel/core-js/typescript, not use no-unsupported-features/es-*
  'no-unsupported-features/node-builtins': 'error',
  'process-exit-as-throw': 'error',

  // Stylistic Issues
  'file-extension-in-import': [
    'error',
    'always',
    {
      // TypeScript doesn't yet support using extensions and fails with error TS2691.
      '.ts': 'never',
      '.tsx': 'never',
      '.cts': 'never',
      '.mts': 'never',
    },
  ],
})
