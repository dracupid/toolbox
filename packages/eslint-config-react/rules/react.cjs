// @ts-check

const { definePluginRules } = require('@jaxonzhao/eslint-utils')

// prefer typescript over the eslint rules, use prettier to handle all layout rules
module.exports = definePluginRules('react', {
  'hook-use-state': 'error',
  'jsx-fragments': 'error',
  'jsx-key': [
    'error',
    {
      checkFragmentShorthand: true,
      checkKeyMustBeforeSpread: true,
      warnOnDuplicates: true,
    },
  ],
  'jsx-no-bind': [
    'error',
    {
      ignoreDOMComponents: true,
      ignoreRefs: true,
    },
  ],
  'jsx-no-constructed-context-values': 'error',
  'jsx-no-leaked-render': 'error',
  'jsx-no-useless-fragment': 'error',
  'jsx-pascal-case': 'error',
  'no-access-state-in-setstate': 'error',
  'no-array-index-key': 'error',
  'no-arrow-function-lifecycle': 'error',
  'no-did-mount-set-state': 'error',
  'no-did-update-set-state': 'error',
  'no-namespace': 'error',
  // 'no-object-type-as-default-prop': 'error',
  'no-redundant-should-component-update': 'error',
  'no-string-refs': [
    'error',
    {
      noTemplateLiterals: true,
    },
  ],
  'no-this-in-sfc': 'error',
  'no-typos': 'error',
  'no-unstable-nested-components': 'error',
  'no-unused-prop-types': 'error',
  'no-unused-state': 'error',
  'no-will-update-set-state': 'error',
  'prefer-es6-class': 'error',
  'prefer-stateless-function': 'error',
})
