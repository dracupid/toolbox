// @ts-check

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
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        // disable unnecessary eslint-rules
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
        'plugin:@typescript-eslint/eslint-recommended',
      ],
      rules: require('./rules-generated.cjs'),
    },
    {
      files: ['**/*.d.ts', '**/*.d.mts', '**/*.d.cts'],
      rules: {
        // allow using in .d.ts
        'triple-slash-reference': 'off',
      },
    },
  ],
}
