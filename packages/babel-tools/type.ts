// https://babeljs.io/docs/babel-preset-typescript babel@7.24
export type PresetTypescriptOptions = Partial<{
  isTSX: boolean // false
  jsxPragma: string // 'React'
  jsxPragmaFrag: string // 'React.Fragment'
  allExtensions: boolean // false
  allowNamespaces: boolean // true
  allowDeclareFields: boolean // false
  disallowAmbiguousJSXLike: boolean // true for .mts and .cts files and to false otherwise
  ignoreExtensions: boolean // false
  onlyRemoveTypeImports: boolean // false
  optimizeConstEnums: boolean // false
  rewriteImportExtensions: boolean // false
}>

// https://babeljs.io/docs/babel-preset-env
export type PresetEnvOptions = Partial<{
  targets: string | string[] | Record<string, string>
  bugfixes: boolean // false
  spec: boolean // false. Deprecated, use top level assumptions instead
  loose: boolean // false. Deprecated, use top level assumptions instead
  modules: 'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false // 'auto'
  debug: boolean // false
  include: (string | RegExp)[] // []
  exclude: (string | RegExp)[] // []
  useBuiltIns: 'usage' | 'entry' | false // false
  corejs: string | { version: string; proposals: boolean } // '2.0'
  forceAllTransforms: boolean // false
  configPath: string // process.cwd()
  ignoreBrowserslistConfig: boolean // false
  browserslistEnv: string // undefined
  shippedProposals: boolean // false
}>

// https://babeljs.io/docs/babel-runtime
export type PluginTransformRuntimeOptions = Partial<{
  absoluteRuntime: boolean | string // false
  corejs: false | 2 | 3 | { version: 2 | 3; proposals: boolean } // false
  helpers: boolean // true, deprecated
  moduleName: string // string
  regenerator: boolean // true, deprecated
  useESModules: boolean // false, deprecated
  version: string // undefined
}>
