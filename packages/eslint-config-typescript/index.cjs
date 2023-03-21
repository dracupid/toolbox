// @ts-check
const { disableRules } = require('@jaxonzhao/eslint-utils')

const tsPluginName = '@typescript-eslint'
/**
 * reference:
 * - https://github.com/standard/eslint-config-standard-with-typescript
 * - https://github.com/xojs/eslint-config-xo-typescript
 */
module.exports = {
  extends: ['@jaxonzhao'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
      parser: require.resolve('@typescript-eslint/parser'),
      plugins: [tsPluginName],
      extends: [
        // disable unnecessary eslint-rules
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
        'plugin:@typescript-eslint/eslint-recommended',
      ],
      rules: require('./rules-generated.cjs'),
    },
    {
      files: ['**/*.cts'],
      rules: {
        ...disableRules(tsPluginName, [
          'no-require-imports', // disable for commonJS module
        ]),
      },
    },
    {
      files: ['**/*.d.ts', '**/*.d.mts', '**/*.d.cts'],
      rules: {
        ...disableRules(tsPluginName, [
          'triple-slash-reference', // allow using in .d.ts
        ]),
      },
    },
  ],
}
