module.exports = {
  root: true,
  extends: ['@jaxonzhao/typescript', '@jaxonzhao/react'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: {},
}
