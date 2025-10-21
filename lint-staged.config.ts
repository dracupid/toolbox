import type { Configuration } from 'lint-staged'

export default {
  '*.{js,ts,cjs,mjs,mts,cts,jsx,tsx}': [
    'prettier --check --cache',
    'eslint --cache --concurrency=auto',
  ],
  '*.{css,md,html,scss,less}': 'prettier --check --cache',
} satisfies Configuration
