#!/usr/bin/env node
// @ts-check
import esRules from '@jaxonzhao/eslint-config/rules/eslint-generated.cjs'
import { definePluginRules, disableRules } from '@jaxonzhao/eslint-utils'
import {
  defineExtendedPluginRules,
  generateRules,
  writeRules,
} from '@jaxonzhao/eslint-utils/build.js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import path from 'path'
import { disabledRules, extendTulesOptions, rulesOptions } from './override.js'

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
    /** @type {any}*/ (esRules),
    Object.fromEntries(
      rules
        .filter(
          ([_, rule]) =>
            !!rule.meta.docs?.extendsBaseRule && rule.meta.type !== 'layout'
        )
        .map(([name, rule]) => {
          const extendsBaseRule = rule.meta.docs?.extendsBaseRule
          return typeof extendsBaseRule === 'string'
            ? [name, extendsBaseRule]
            : [name, name]
        })
    ),
    extendTulesOptions
  ),
  // https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js
  // https://github.com/xojs/xo/blob/main/lib/options-manager.js
  ...disableRules('import', [
    'named',
    // not needed for ts now
    'extensions',
  ]),
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
    '../rules-generated.cjs'
  ),
  result
)
