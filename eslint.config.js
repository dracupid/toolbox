//@ts-check

import { useESLintConfig, useTs } from '@jaxonzhao/preset/eslint/index.mjs'

export default useESLintConfig(...useTs(import.meta.dirname))
