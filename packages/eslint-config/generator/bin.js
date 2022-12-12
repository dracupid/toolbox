#!/usr/bin/env node
// @ts-check
/**
 * It is very tedious to enable so many ESLint rules.
 * And eslint:recommended is far from enough.
 * Pregenerate to avoid unknown new rules.
 */
import { generateRules, writeRules } from '@jaxonzhao/eslint-utils/build.js'
import eslint from 'eslint'
import path from 'path'
import { disabledRules, rulesOptions } from './override.js'

const linter = new eslint.Linter()
const rules = linter.getRules()

writeRules(
  path.join(
    path.dirname(new URL(import.meta.url).pathname),
    '../rules/eslint-generated.cjs'
  ),
  generateRules(rules, disabledRules, rulesOptions)
)
