module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 80,
  endOfLine: 'lf',
  plugins: [require.resolve('prettier-plugin-organize-imports')],
}
