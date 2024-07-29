// @ts-check

import { definePluginRules } from '@jaxonzhao/eslint-utils'

// prefer typescript over the eslint rules
export default definePluginRules('unicorn', {
  'better-regex': [
    'error',
    {
      sortCharacterClasses: false,
    },
  ],
  'custom-error-definition': 'error',
  'error-message': 'error',
  'escape-case': 'error',
  'new-for-builtins': 'error',
  'no-anonymous-default-export': 'error',
  'no-await-in-promise-methods': 'error',
  'no-for-loop': 'error',
  'no-instanceof-array': 'error',
  'no-invalid-remove-event-listener': 'error',
  'no-length-as-slice-end': 'error',
  'no-negation-in-equality-check': 'error',
  'no-object-as-default-parameter': 'error',
  'no-single-promise-in-promise-methods': 'error',
  'no-static-only-class': 'error',
  'no-unnecessary-await': 'error',
  'no-useless-fallback-in-spread': 'error',
  'no-useless-length-check': 'error',
  'no-useless-promise-resolve-reject': 'error',
  'no-useless-spread': 'error',
  // 'number-literal-case': 'error', // conflict with prettier: https://github.com/prettier/prettier/pull/498
  'prefer-array-flat': 'error',
  'prefer-array-flat-map': 'error',
  'prefer-array-index-of': 'error',
  'prefer-array-some': 'error',
  'prefer-date-now': 'error',
  'prefer-dom-node-append': 'error',
  'prefer-dom-node-dataset': 'error',
  'prefer-dom-node-remove': 'error',
  'prefer-dom-node-text-content': 'error',
  'prefer-export-from': 'error',
  'prefer-includes': 'error',
  'prefer-logical-operator-over-ternary': 'error',
  'prefer-modern-dom-apis': 'error',
  'prefer-module': 'error', // force use cjs for common js file
  'prefer-negative-index': 'error',
  'prefer-number-properties': 'error',
  'prefer-regexp-test': 'error',
  'prefer-spread': 'error',
  'prefer-string-replace-all': 'error',
  'prefer-string-slice': 'error',
  'prefer-string-starts-ends-with': 'error',
  'prefer-ternary': ['error', 'only-single-line'],
})
