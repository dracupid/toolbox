//@ts-check

import tsConfig from '@jaxonzhao/eslint-config-typescript'
import { defineConfig } from 'eslint/config'
import { existsSync, readFileSync } from 'fs'
import path from 'path'

const PRETTIER_IGNORE = '.prettierignore'

/**
 * @param {string} dirname
 * @param {Parameters<typeof defineConfig>} configs
 */
export function useTs(dirname, ...configs) {
  const prettierIgnore = path.join(dirname, PRETTIER_IGNORE)
  /** @type {string[]} */
  let ignores = []
  if (existsSync(prettierIgnore)) {
    const content = readFileSync(prettierIgnore, 'utf8').trim().split('\n')
    ignores = content
  }

  return defineConfig(
    ...tsConfig,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: dirname,
        },
      },
    },
    { ignores },
    ...configs
  )
}
