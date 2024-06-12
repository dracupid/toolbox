#!/usr/bin/env node
// @ts-check
import esRules from '@jaxonzhao/eslint-config/rules/eslint-generated.js'
import { definePluginRules, disableRules } from '@jaxonzhao/eslint-utils'
import {
  defineExtendedPluginRules,
  generateRules,
  writeRules,
} from '@jaxonzhao/eslint-utils/build.js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import path from 'path'
import {
  deprecatedInESLintBlock,
  disabledRules,
  extendRulesOptions,
  rulesOptions,
} from './override.js'

const rules = Object.entries(tsPlugin.rules)

const tsBaseRules = new Map(
  rules.filter(([_, rule]) => !rule.meta.docs?.extendsBaseRule)
)

const result = {
  ...Object.fromEntries(
    Object.entries(
      definePluginRules(
        '@typescript-eslint',
        generateRules(tsBaseRules, disabledRules, rulesOptions)
      )
    ).sort((a, b) => a[0].localeCompare(b[0]))
  ),
  ...defineExtendedPluginRules(
    '@typescript-eslint',
    esRules,
    Object.fromEntries(
      rules
        .filter(
          ([name, rule]) =>
            !deprecatedInESLintBlock.has(name) &&
            !!rule.meta.docs?.extendsBaseRule &&
            rule.meta.type !== 'layout' &&
            rule.meta.docs?.extendsBaseRule !== 'no-return-await' // TODO: this rule is deprecated in ESLint
        )
        .map(([name, rule]) => {
          const extendsBaseRule = rule.meta.docs?.extendsBaseRule
          return typeof extendsBaseRule === 'string'
            ? [name, extendsBaseRule]
            : [name, name]
        })
    ),
    extendRulesOptions
  ),
  // https://github.com/xojs/xo/blob/main/lib/options-manager.js
  ...disableRules('unicorn', [
    // prefer no-extraneous-class
    'no-static-only-class',
    // prefer await-thenable
    'no-unnecessary-await',
    // allow use commonJS function in TS for now
    'prefer-module',
  ]),
}

writeRules(
  path.join(
    path.dirname(new URL(import.meta.url).pathname),
    '../rules-generated.js'
  ),
  result
)
