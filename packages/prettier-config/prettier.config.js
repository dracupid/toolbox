import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export default {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 80,
  endOfLine: 'lf',
  plugins: [require.resolve('prettier-plugin-organize-imports')],
}
