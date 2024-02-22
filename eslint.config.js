//@ts-check

import jaxonTSConfig from '@jaxonzhao/eslint-config-typescript'
import { dirname } from 'node:path'
import { fileURLToPath } from 'url'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...jaxonTSConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
      },
    },
  },
]
