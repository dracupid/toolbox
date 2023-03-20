// @ts-check

const { definePluginRules } = require('@jaxonzhao/eslint-utils')

module.exports = definePluginRules('import', {
  /**
   * It is not easy for an ESLint plugin to recognize all imports and exports.
   * This should be done by a compiler or a bundler.
   *
   * We use prettier-plugin-organize-imports to reorganize imports.
   */

  // Helpful warnings
  'no-empty-named-blocks': 'error',

  // Module systems

  // Static analysis
  'no-absolute-path': 'error',
  'no-useless-path-segments': 'error',

  // Style guide
  // prefer n/file-extension-in-import for only ES module
  // extensions: [
  //   // prefer ES module
  //   'error',
  //   'always',
  //   {
  //     ignorePackages: true,
  //   },
  // ],
  // 'consistent-type-specifier-style': ['error', 'prefer-top-level'], // not decided yet
  first: 'error',
  'no-named-default': 'error',
  'no-namespace': 'error',
})
