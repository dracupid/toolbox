export default {
  '*.{js,ts,cjs,mjs,mts,cts,jsx,tsx}': [
    'prettier --check --cache',
    'eslint --cache',
  ],
  '*.{css,md,html,scss,less}': 'prettier --check --cache',
}
