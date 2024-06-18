//@ts-check

import { useESLintConfig, useTs } from '@jaxonzhao/boot/eslint'

export default useESLintConfig(...useTs(import.meta.dirname))
