// @ts-check

/**
 * @typedef {Record<string, boolean|string|number> | string} _RuleOption
 * @typedef {string|_RuleOption|[string, _RuleOption]} RuleOption
 * @typedef {Record<string, RuleOption>} RuleOptions
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 */

/**
 * @param {string} pluginName
 * @param {RulesRecord} rules
 * @returns {RulesRecord}
 */
export function definePluginRules(pluginName, rules) {
  return Object.entries(rules).reduce((rules, [name, value]) => {
    // disable the base rule as it can report incorrect errors
    rules[`${pluginName}/${name}`] = value
    return rules
  }, /** @type{RulesRecord} */ ({}))
}

/**
 * @param {string} pluginName
 * @param {string[]} ruleNameList
 * @returns {RulesRecord}
 */
export function disableRules(pluginName, ruleNameList) {
  return ruleNameList.reduce((obj, rule) => {
    obj[pluginName ? `${pluginName}/${rule}` : rule] = 'off'
    return obj
  }, /** @type{RulesRecord} */ ({}))
}
