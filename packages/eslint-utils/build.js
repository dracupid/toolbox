//@ts-check

import assert from 'node:assert'
import { writeFile } from 'node:fs/promises'

/**
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 * @typedef {import('eslint').Rule.RuleModule} RuleModule
 */

/**
 * @param {Map<string, RuleModule>} allRules
 * @param {Set<string>} disabledRules
 * @param {import('./index').RuleOptions} rulesOptions
 */
function validateConfigs(allRules, disabledRules, rulesOptions) {
  for (const name of disabledRules) {
    assert(allRules.has(name), `unknown rule ${name}`)
  }
  for (const name of Object.keys(rulesOptions)) {
    assert(
      !disabledRules.has(name),
      `${name} is disabled, should not have options`
    )
    assert(allRules.has(name), `unknown rule ${name}`)
  }
}

/**
 * @param {string} pluginName
 * @param {RulesRecord} baseRules
 * @param {Record<string, string>} extendMap
 * @param {import('./index').RuleOptions} rulesOptions
 * @returns {RulesRecord}
 */
export function defineExtendedPluginRules(
  pluginName,
  baseRules,
  extendMap, // why return-await extends no-return-await with a different name
  rulesOptions
) {
  Object.keys(rulesOptions).forEach((name) => {
    assert(name in extendMap, `rule ${name} not found in extendMap`)
  })

  return Object.entries(extendMap).reduce((rules, [name, baseName]) => {
    assert(
      baseRules[baseName] != null,
      `unknown base rule ${baseName}, extended by ${name}`
    )
    const baseRule = baseRules[baseName]
    if (baseRule === 0 || baseRule === 'off') {
      // baseRule disabled
      assert(!rulesOptions[name], `rule ${rulesOptions} is disabled in base`)
      rules[baseName] = 0
      rules[`${pluginName}/${name}`] = 0
    } else {
      // disable the base rule as it can report incorrect errors
      rules[baseName] = 0
      const extendOptions = rulesOptions[name]
      if (extendOptions) {
        if (Array.isArray(baseRule)) {
          rules[`${pluginName}/${name}`] = baseRule
          assert(
            typeof baseRule[baseRule.length - 1] === 'object',
            `maybe invalid rule ${JSON.stringify(baseRule)}`
          )
          Object.assign(baseRule[baseRule.length - 1], extendOptions)
        } else {
          rules[`${pluginName}/${name}`] = [
            /** @type {any}*/ (baseRule),
            /** @type {any}*/ (extendOptions),
          ]
        }
      } else {
        rules[`${pluginName}/${name}`] = baseRule
      }
    }
    return rules
  }, /** @type{RulesRecord} */ ({}))
}

/**
 * @param {Map<string, RuleModule>} allRules
 * @param {Set<string>} disabledRules
 * @param {import('./index').RuleOptions} rulesOptions
 * @returns {RulesRecord}
 */
export function generateRules(allRules, disabledRules, rulesOptions) {
  validateConfigs(allRules, disabledRules, rulesOptions)

  // group by type
  const generated = {
    /** @type {RulesRecord} */
    problem: {},
    /** @type {RulesRecord} */
    suggestion: {},
  }
  for (const [name, rule] of allRules.entries()) {
    assert(rule.meta && rule.meta.type, `${name} missing rule.metas.type`)
    assert(
      ['problem', 'suggestion', 'layout'].includes(rule.meta.type),
      `unknown type ${rule.meta.type} for ${name}`
    )
    // Ignore all layout or deprecated rules
    if (rule.meta.type !== 'layout' && !rule.meta.deprecated) {
      if (disabledRules.has(name)) {
        // use 0 to be distinguished with error
        generated[rule.meta.type][name] = 0
      } else {
        const option = rulesOptions[name]
        if (option) {
          generated[rule.meta.type][name] = Array.isArray(option)
            ? ['error', ...option]
            : ['error', option]
        } else {
          generated[rule.meta.type][name] = 'error'
        }
      }
    }
  }
  return { ...generated.problem, ...generated.suggestion }
}

/**
 * @param {string} outputFilePath
 * @param {RulesRecord} obj
 * @returns {Promise<void>}
 */
export function writeRules(outputFilePath, obj) {
  return writeFile(
    outputFilePath,
    `// This file is generated by eslint-utils

// @ts-check
// prettier-ignore
/** @type {import('eslint').Linter.RulesRecord} */
export default ${JSON.stringify(obj, null, 2)}
`
  )
}
