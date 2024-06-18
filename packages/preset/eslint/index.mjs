//@ts-check

import tsConfig from '@jaxonzhao/eslint-config-typescript'

/**
 * @typedef {import('eslint').Linter.FlatConfig} ESLintConfig
 */

/**
 * @param  {ESLintConfig[]} args
 */
export function useESLintConfig(...args) {
  return args
}

/**
 * @param {string} dirname
 */
export function useTs(dirname) {
  return useESLintConfig(...tsConfig, {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: dirname,
      },
    },
  })
}
