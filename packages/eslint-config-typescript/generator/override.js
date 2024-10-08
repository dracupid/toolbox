// @ts-check
/**
 * By default, we enable all excluding formatting rules.
 */

// Disable following rules, and reason.
// Note: Extension rules are diabled in eslint-config
/** @type Set<string> */
export const disabledRules = new Set([
  'class-literal-property-style', // no strong preference
  'consistent-type-definitions', // no strong preference
  'explicit-function-return-type', // too annoying
  'explicit-module-boundary-types', // too annoying
  'member-ordering', // No final decision yet
  'method-signature-style', // no strong preference
  'naming-convention', // No final decision yet
  'no-explicit-any', // I cannot always avoid using any
  'no-invalid-void-type', // No final decision yet
  'no-non-null-assertion', // too many bad cases
  'no-restricted-types', // no strong preference
  'no-unnecessary-condition', // force type checking is necessary sometimes
  'parameter-properties', // no strong preference
  'prefer-enum-initializers', // it's not a good idea
  'prefer-nullish-coalescing', // No final decision yet
  'prefer-readonly-parameter-types', // too annoying
  'strict-boolean-expressions', // too strict
  'typedef', // Let tsc do this
  'unbound-method', // too annoying

  'no-unnecessary-type-parameters', // ! experimental
])

export const deprecatedInESLintBlock = new Set(['no-extra-semi'])

// Config rules
/**
 * @type {Record<string, import('@jaxonzhao/eslint-utils').RuleOption>}
 */
export const rulesOptions = {
  'ban-ts-comment': {
    'ts-expect-error': 'allow-with-description',
    minimumDescriptionLength: 4,
  },
  'consistent-type-assertions': {
    assertionStyle: 'as',
    objectLiteralTypeAssertions: 'allow-as-parameter',
  },
  'consistent-type-exports': {
    fixMixedExportsWithInlineTypeSpecifier: true,
  },
  'consistent-type-imports': {
    fixStyle: 'inline-type-imports',
  },
  'explicit-member-accessibility': {
    accessibility: 'no-public',
  },
  'no-confusing-void-expression': {
    ignoreArrowShorthand: true,
    ignoreVoidOperator: true,
  },
  'no-empty-object-type': {
    allowInterfaces: 'with-single-extends',
  },
  'no-extraneous-class': {
    allowEmpty: true,
    allowWithDecorator: true,
  },
  'no-floating-promises': {
    ignoreVoid: true,
    ignoreIIFE: true,
  },
  'no-misused-promises': {
    checksVoidReturn: false, // disable for async handler
  },
  'prefer-literal-enum-member': {
    allowBitwiseExpressions: true,
  },
  'require-array-sort-compare': {
    ignoreStringArrays: true,
  },
  'restrict-template-expressions': {
    allowNumber: true,
    allowBoolean: true,
  },
  'triple-slash-reference': {
    path: 'never',
    types: 'never',
    lib: 'never',
  },
  'unified-signatures': {
    ignoreDifferentlyNamedParameters: true,
  },
}

// Config extend rules
/**
 * @type {import('@jaxonzhao/eslint-utils').RuleOptions}
 */
export const extendRulesOptions = {
  'only-throw-error': {
    allowThrowingUnknown: true, // needed for rethrow error
  },

  'no-use-before-define': {
    enums: false,
    typedefs: false,
  },
}
