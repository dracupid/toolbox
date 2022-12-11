// @ts-check

import tsPlugin from '@typescript-eslint/eslint-plugin'
import assert from 'assert'
import eslint from 'eslint'
import rules from './rules.cjs'

const linter = new eslint.Linter()

const tsRules = new Set(Object.keys(tsPlugin.configs.all.rules || {}))
const definedRules = new Set(
  Object.keys(rules).map((name) =>
    name.replace('typescript', '@typescript-eslint')
  )
)
const definedESRules = new Set(
  Object.keys(rules).filter((name) => !name.startsWith('typescript'))
)
const definedTSRules = new Set(
  Object.keys(rules)
    .filter((name) => name.startsWith('typescript'))
    .map((name) => name.replace('typescript/', ''))
)
const esRules = new Set(linter.getRules().keys())

assert.ok(tsRules.size > 0 && definedRules.size > 0, 'missing rules')

let hasError
/**
 * @param {string} msg
 */
function logError(msg) {
  hasError = true
  console.error(msg)
}

for (const rule of definedESRules) {
  if (!esRules.has(rule)) logError('ESRule notFound: ' + rule)
}

for (const rule of definedTSRules) {
  if (esRules.has(rule) && !definedRules.has(rule))
    logError('ESRule should be disabled: ' + rule)
}

for (const rule of tsRules) {
  if (!definedRules.has(rule)) logError('Rule Missing: ' + rule)
}

for (const rule of definedRules) {
  if (!tsRules.has(rule)) logError('Rule notFound: ' + rule)
}

if (hasError) {
  process.exit(1)
} else {
  console.log('OK!')
}
