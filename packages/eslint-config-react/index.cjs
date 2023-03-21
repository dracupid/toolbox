// @ts-check

/**
 * reference:
 * - https://github.com/standard/eslint-config-standard-react
 * - https://github.com/xojs/eslint-config-xo-react
 */
module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // default use React >= 17
    'plugin:react-hooks/recommended',
  ],
  rules: {
    ...require('./rules/react.cjs'),
  },
}
