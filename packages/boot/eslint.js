//@ts-check

import tsConfig from '@jaxonzhao/eslint-config-typescript'

/**
 * @typedef {import('eslint').Linter.Config} ESLintConfig
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
        projectService: true,
        tsconfigRootDir: dirname,
      },
    },
  })
}
