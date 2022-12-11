// @ts-check

// update: 2022.12.6
// https://github.com/xojs/eslint-config-xo-typescript/blob/main/index.js
// https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/src/configs

const { definePluginRules, disableRules } = require('@jaxonzhao/eslint-utils')
const pluginName = '@typescript-eslint'

module.exports = {
  // Typescript Rules
  ...definePluginRules(pluginName, {
    'adjacent-overload-signatures': 'error',
    'array-type': 'error',
    'await-thenable': 'error',
    'ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        minimumDescriptionLength: 4,
      },
    ],
    'ban-tslint-comment': 'error',
    'ban-types': 'error',
    'class-literal-property-style': 'off', // no strong preference
    'consistent-generic-constructors': 'error',
    'consistent-indexed-object-style': 'error',
    'consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
    'consistent-type-definitions': 'off', // no strong preference
    'consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    'consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    'explicit-function-return-type': 'off', // too annoying
    'explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    'explicit-module-boundary-types': 'off', // too annoying
    'member-ordering': 'off', // no decision yet
    'method-signature-style': 'off', // no strong preference
    'naming-convention': 'off',
    'no-base-to-string': 'error',
    'no-confusing-non-null-assertion': 'error',
    'no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true, ignoreVoidOperator: true },
    ],
    'no-duplicate-enum-values': 'error',
    'no-dynamic-delete': 'error',
    'no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    'no-explicit-any': 'off', // I cannot always avoid using any
    'no-extra-non-null-assertion': 'error',
    'no-extraneous-class': [
      'error',
      {
        allowWithDecorator: true,
      },
    ],
    'no-floating-promises': [
      'error',
      {
        ignoreVoid: true,
        ignoreIIFE: true,
      },
    ],
    'no-for-in-array': 'error',
    'no-inferrable-types': 'error',
    'no-invalid-void-type': 'off', // no decision yet
    'no-meaningless-void-operator': 'error',
    'no-misused-new': 'error',
    'no-misused-promises': [
      'error',
      {
        checksVoidReturn: false, // disable for async handler
      },
    ],
    'no-namespace': 'error',
    'no-non-null-asserted-nullish-coalescing': 'error',
    'no-non-null-asserted-optional-chain': 'error',
    'no-non-null-assertion': 'off', // too many bad cases
    'no-redundant-type-constituents': 'error',
    'no-require-imports': 'error',
    'no-this-alias': 'error',
    'no-type-alias': 'off', // type alias is useful
    'no-unnecessary-boolean-literal-compare': 'error',
    'no-unnecessary-condition': 'off', // force type checking is necessary sometimes
    'no-unnecessary-qualifier': 'error',
    'no-unnecessary-type-arguments': 'error',
    'no-unnecessary-type-assertion': 'error',
    'no-unnecessary-type-constraint': 'error',
    'no-unsafe-argument': 'error',
    'no-unsafe-assignment': 'error',
    'no-unsafe-call': 'error',
    'no-unsafe-declaration-merging': 'error',
    'no-unsafe-member-access': 'error',
    'no-unsafe-return': 'error',
    'no-useless-empty-export': 'error',
    'no-var-requires': 'off', // enable no-require-imports
    'non-nullable-type-assertion-style': 'error',
    'parameter-properties': 'off', // no strong preference
    'prefer-as-const': 'error',
    'prefer-enum-initializers': 'off', // it's not a good idea
    'prefer-for-of': 'error',
    'prefer-includes': 'error',
    'prefer-literal-enum-member': [
      'error',
      {
        allowBitwiseExpressions: true,
      },
    ],
    'prefer-namespace-keyword': 'error',
    'prefer-nullish-coalescing': 'error',
    'prefer-optional-chain': 'error',
    'prefer-readonly': 'error',
    'prefer-readonly-parameter-types': 'off', // too annoying
    'prefer-reduce-type-parameter': 'error',
    'prefer-regexp-exec': 'error',
    'prefer-return-this-type': 'error',
    'prefer-string-starts-ends-with': 'error',
    'prefer-ts-expect-error': 'error',
    'promise-function-async': 'error',
    'require-array-sort-compare': [
      'error',
      {
        ignoreStringArrays: true,
      },
    ],
    'restrict-plus-operands': [
      'error',
      {
        checkCompoundAssignments: true,
      },
    ],
    'restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: true,
      },
    ],
    'sort-type-constituents': 'off', // no need
    'strict-boolean-expressions': 'off', // too strict
    'switch-exhaustiveness-check': 'error',
    'triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'never',
        lib: 'never',
      },
    ],
    typedef: 'off', // Let tsc do this
    'unbound-method': 'off', // too annoying
    'unified-signatures': [
      'error',
      {
        ignoreDifferentlyNamedParameters: true,
      },
    ],
  }),

  // Extension Rules
  ...definePluginRules(
    pluginName,
    {
      'default-param-last': 'error',
      'dot-notation': 'error',
      'init-declarations': 'off',
      'no-array-constructor': 'error',
      'no-dupe-class-members': 'error',
      'no-duplicate-imports': 'off', // TODO: use import
      'no-empty-function': 'off', // harmless
      'no-implied-eval': 'error',
      'no-invalid-this': 'error', // remain to be seen
      'no-loop-func': 'error',
      'no-loss-of-precision': 'error',
      'no-magic-numbers': 'off', // no decision yet
      'no-redeclare': 'error',
      'no-restricted-imports': 'off', // Set accroding to project needs, TODO: use eslint-plugin-node
      'no-shadow': 'error', // remain to be seen
      'no-throw-literal': [
        'error',
        {
          allowThrowingUnknown: true, // needed for rethrow error
        },
      ],
      'no-unused-expressions': 'error',
      'no-unused-vars': 'off', // Let tsc do this
      'no-use-before-define': 'off', // no strong preference
      'no-useless-constructor': 'error',
      'require-await': 'error',
      'return-await': 'error',
    },
    { isExtension: true }
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
