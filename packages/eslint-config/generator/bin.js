#!/usr/bin/env node
// @ts-check
/**
 * It is very tedious to enable so many ESLint rules.
 * And eslint:recommended is far from enough.
 * Pre-generate to avoid unknown new rules.
 */
import { generateRules, writeRules } from '@jaxonzhao/eslint-utils/build.js'
import eslint from 'eslint/use-at-your-own-risk'
import path from 'path'
import { disabledRules, rulesOptions } from './override.js'

const rules = eslint.builtinRules

writeRules(
  path.join(
    path.dirname(new URL(import.meta.url).pathname),
    '../rules/eslint-generated.js'
  ),
  generateRules(rules, disabledRules, rulesOptions)
)
