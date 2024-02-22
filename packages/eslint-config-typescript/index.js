// @ts-check
import eslintConfig from '@jaxonzhao/eslint-config'
import { disableRules } from '@jaxonzhao/eslint-utils'
import tseslint from 'typescript-eslint'
import customTSRules from './rules-generated.js'

const tsPluginName = '@typescript-eslint'
const tsFiles = ['**/*.{ts,tsx,mts,cts}']
/**
 * reference:
 * - https://github.com/standard/eslint-config-standard-with-typescript
 * - https://github.com/xojs/eslint-config-xo-typescript
 */

export default /** @type {import('eslint').Linter.FlatConfig[]} */ (
  tseslint.config(
    ...eslintConfig,
    {
      files: tsFiles,
      languageOptions: {
        parser: tseslint.parser,
      },
      plugins: { [tsPluginName]: tseslint.plugin },
      rules: customTSRules,
    },
    {
      // disable unnecessary eslint-rules
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts
      ...tseslint.configs.eslintRecommended,
      files: tsFiles,
    },
    {
      files: ['**/*.cts'],
      rules: disableRules(tsPluginName, [
        'no-require-imports', // disable for commonJS module
      ]),
    },
    {
      files: ['**/*.d.ts', '**/*.d.mts', '**/*.d.cts'],
      rules: {
        ...disableRules(tsPluginName, [
          'triple-slash-reference', // allow using in .d.ts
        ]),
      },
    }
  )
)
