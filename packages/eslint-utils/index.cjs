// @ts-check

/**
 * @param {string} pluginName
 * @param {Record<string, ('error' | 'off')|[('error' | 'off'), unknown]>} rules
 * @param {Partial<{isExtension: boolean}>} options
 * @returns {Record<string, unknown>}
 */
function definePluginRules(pluginName, rules, options = {}) {
  return Object.entries(rules).reduce((rules, [name, value]) => {
    // disable the base rule as it can report incorrect errors
    if (options.isExtension) rules[name] = 'off'
    rules[`${pluginName}/${name}`] = value
    return rules
  }, /** @type{Record<string, unknown>} */ ({}))
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
