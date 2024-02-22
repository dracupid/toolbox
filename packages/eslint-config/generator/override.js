// @ts-check
/**
 * By default, we enable all ESLint problem & suggestion rules
 */

// Disable following rules, and reason
export const disabledRules = new Set([
  // Problems
  'no-duplicate-imports', // handled by prettier-plugin-organize-imports

  // Suggestions
  'camelcase', // No final decision yet
  'capitalized-comments', // no strong preference
  'class-methods-use-this', // harmless
  'complexity', // No final decision yet
  'consistent-return', // no strong preference
  'consistent-this', // no strong preference
  'curly', // Disabled by prettier
  'func-style', // no strong preference
  'grouped-accessor-pairs', // no strong preference
  // no strong preference to how to name a variabel
  'id-denylist',
  'id-length',
  'id-match',
  'init-declarations', // No final decision yet
  'logical-assignment-operators', // no strong preference & syntax support
  // no strong preference to max-* rules
  'max-classes-per-file',
  'max-depth',
  'max-lines',
  'max-lines-per-function',
  'max-nested-callbacks',
  'max-params',
  'max-statements',
  'multiline-comment-style', // no strong preference
  'no-await-in-loop', // await in loop is useful
  'no-console', // I need it
  'no-continue', // I need it
  'no-div-regex', // Syntax highlighting is good enough
  'no-else-return', // I prefer consistent
  'no-empty-function', // harmless
  'no-empty-static-block', // harmless
  'no-eq-null', // I prefer using this to detect null or undefined
  'no-implicit-coercion', // no strong preference
  'no-inline-comments', // no strong preference
  'no-magic-numbers', // No final decision yet
  'no-multi-str', // no strong preference
  'no-negated-condition', // no strong preference
  'no-nested-ternary', // A good formatter will make it readable
  'no-param-reassign', // no strong preference
  'no-plusplus', // no strong preference
  'no-restricted-exports', // no strong preference
  'no-restricted-globals', // use eslint-pluign-n or others
  'no-restricted-imports', // use eslint-pluign-n
  'no-restricted-properties', // no strong preference
  'no-restricted-syntax', // No final decision yet
  'no-shadow', // no strong preference
  'no-ternary', // I prefer using ternary
  'no-underscore-dangle', // no strong preference
  'no-warning-comments', // no strong preference
  'one-var', // no strong preference
  'one-var-declaration-per-line', // no strong preference
  'operator-assignment', // harmless
  'prefer-destructuring', // no strong preference
  'prefer-named-capture-group', // no strong preference
  'prefer-object-has-own', // need ES2022
  'prefer-template', // harmless
  'require-unicode-regexp', // No final decision yet
  'sort-imports', // handled by prettier-plugin-organize-imports
  'sort-keys', // no strong preference
  'sort-vars', // no strong preference
  'strict', // maybe unnecessary now
  'vars-on-top', // annoying
])

// Config rules
/** @type {import('@jaxonzhao/eslint-utils').RuleOptions} */
export const rulesOptions = {
  // Problems
  'array-callback-return': {
    allowImplicit: true,
    checkForEach: true,
    allowVoid: true,
  },
  'no-self-assign': { props: true },
  'no-unsafe-negation': {
    enforceForOrderingRelations: true,
  },
  'no-unsafe-optional-chaining': {
    disallowArithmeticOperators: true,
  },
  'no-unused-vars': {
    vars: 'all',
    args: 'after-used',
    ignoreRestSiblings: true,
    argsIgnorePattern: /^_/.source,
    destructuredArrayIgnorePattern: /^_/.source,
    caughtErrors: 'all',
    caughtErrorsIgnorePattern: /^_$/.source,
  },
  'no-use-before-define': {
    functions: false,
    classes: false,
    allowNamedExports: true,
  },
  'require-atomic-updates': {
    allowProperties: true,
  },
  'use-isnan': {
    enforceForSwitchCase: true,
    enforceForIndexOf: true,
  },
  'valid-typeof': {
    requireStringLiterals: true,
  },

  // Suggestions
  'accessor-pairs': {
    enforceForClassMembers: true,
  },
  'arrow-body-style': [
    'as-needed',
    {
      requireReturnForObjectLiteral: true,
    },
  ],
  eqeqeq: 'smart',
  'func-name-matching': {
    considerPropertyDescriptor: true,
  },
  'func-names': 'as-needed',
  'no-empty': {
    allowEmptyCatch: true,
  },
  'no-multi-assign': {
    ignoreNonDeclaration: true,
  },
  'no-unused-expressions': {
    allowShortCircuit: true,
    allowTernary: true,
    allowTaggedTemplates: true,
    enforceForJSX: true,
  },
  'no-useless-computed-key': {
    enforceForClassMembers: true,
  },
  'no-void': {
    allowAsStatement: true,
  },
  'object-shorthand': [
    'always',
    {
      avoidExplicitReturnArrows: true,
    },
  ],
  'prefer-arrow-callback': {
    allowNamedFunctions: true,
  },
  'prefer-const': {
    destructuring: 'all',
  },
  'prefer-promise-reject-errors': {
    allowEmptyReject: true,
  },
  'prefer-regex-literals': {
    disallowRedundantWrapping: true,
  },
  radix: 'as-needed',
}
