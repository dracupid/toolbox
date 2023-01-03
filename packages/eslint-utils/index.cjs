// @ts-check

/**
 * @typedef {Record<string, boolean|string|number> | string} _RuleOption
 * @typedef {string|_RuleOption|[string, _RuleOption]} RuleOption
 */

/**
 * We don't use warn
 * @typedef {'error'|'off'|0|2|_RuleOption|['error'|'off', _RuleOption]|['error'|'off', string, _RuleOption]} Rule
 */

/**
 * @param {string} pluginName
 * @param {Record<string, Rule>} rules
 * @returns {Record<string, Rule>}
 */
function definePluginRules(pluginName, rules) {
  return Object.entries(rules).reduce((rules, [name, value]) => {
    // disable the base rule as it can report incorrect errors
    rules[`${pluginName}/${name}`] = value
    return rules
  }, /** @type{Record<string, Rule>} */ ({}))
}

/**
 * @param {string} pluginName
 * @param {string[]} ruleNameList
 * @returns {Record<string, string>}
 */
function disableRules(pluginName, ruleNameList) {
  return ruleNameList.reduce((obj, rule) => {
    obj[pluginName ? `${pluginName}/${rule}` : rule] = 'off'
    return obj
  }, /** @type{Record<string, string>} */ ({}))
}

module.exports = {
  definePluginRules,
  disableRules,
}
