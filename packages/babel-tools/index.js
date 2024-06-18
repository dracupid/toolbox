//@ts-check

import Module from 'node:module'
import path from 'node:path'

/**
 * @template T
 * @typedef {[string, Partial<T>]} Preset<T>
 */

/**
 * @template T
 * @typedef {Preset<T>} Plugin<T>
 */

/**
 * @typedef {import("./type").PresetTypescriptOptions} PresetTypescriptOptions
 * @typedef {import("./type").PresetEnvOptions} PresetEnvOptions
 * @typedef {import("./type").PluginTransformRuntimeOptions} PluginTransformRuntimeOptions
 */

/**
 * @typedef {Object} CompileOptions
 * @property {'bundler' | 'runtime'} usedBy
 * @property {boolean} debug
 * @property {string} importMetaUrl
 */

export const BabelScope = {
  JS: 0b1,
  TS: 0b10,
  JSX: 0b100,
  TSX: 0b1000,
  ALL: 0b1111,
}

const BabelType = {
  PRESET: 'preset',
  PLUGIN: 'plugin',
}

/**
 * @template T
 * @typedef {Object} Component
 * @property {string} id
 * @property {string} type
 * @property {number} scope
 * @property {T} options
 */

export class BabelConfig {
  /** @type {NodeRequire} */
  #require
  /** @type {Component<any>[]} */
  #components = []
  /** @type {CompileOptions} */
  #options = { usedBy: 'bundler', debug: false, importMetaUrl: import.meta.url }

  /**
   * @param {Partial<CompileOptions>} [options]
   */
  constructor(options) {
    if (options) {
      this.#options = { ...this.#options, ...options }
    }
    this.#require = Module.createRequire(
      this.#options.importMetaUrl || import.meta.url
    )
  }

  /**
   * @param {string} moduleName
   * @returns {string}
   */
  getVersion(moduleName) {
    return this.#require(path.join(moduleName, 'package.json')).version
  }

  /**
   * @template T
   * @param {string} id
   * @param {number} scope
   * @param {T} options
   */
  addPreset(id, scope, options) {
    /** @type {Preset<T>} */
    this.#components.push({
      id,
      type: BabelType.PRESET,
      scope,
      options,
    })
    return this
  }

  /**
   * @template T
   * @param {string} id
   * @param {number} scope
   * @param {T} options
   */
  addPlugin(id, scope, options) {
    /** @type {Plugin<T>} */
    this.#components.push({
      id,
      type: BabelType.PLUGIN,
      scope,
      options,
    })
    return this
  }

  /**
   * @param {PresetTypescriptOptions} [options]
   */
  usePresetTS(options) {
    /** @type {PresetTypescriptOptions} */
    options = {
      allowDeclareFields: true, // will be enabled by default in Babel 8
      optimizeConstEnums: true, // for better uglify
      rewriteImportExtensions: true, // for ESM
      ...options,
    }
    return this.addPreset(
      this.#require.resolve('@babel/preset-typescript'),
      // eslint-disable-next-line no-bitwise
      BabelScope.TS | BabelScope.TSX,
      options
    )
  }

  /**
   * @param {PresetEnvOptions} [options]
   */
  usePresetEnv(options) {
    /** @type {PresetEnvOptions} */
    options = {
      bugfixes: true, // will be enabled by default in Babel 8
      debug: this.#options.debug,
      useBuiltIns: 'usage',
      corejs: this.getVersion('core-js'),
      ...options,
    }
    return this.addPreset(
      this.#require.resolve('@babel/preset-env'),
      BabelScope.ALL,
      options
    )
  }

  /**
   * @param {PluginTransformRuntimeOptions} [options]
   */
  useBabelRuntime(options) {
    /** @type {PluginTransformRuntimeOptions} */
    options = {
      version: this.getVersion('@babel/runtime'),
      absoluteRuntime:
        this.#options.usedBy === 'bundler'
          ? path.dirname(this.#require.resolve('@babel/runtime/package.json'))
          : undefined,
      ...options,
    }
    return this.addPlugin(
      this.#require.resolve('@babel/plugin-transform-runtime'),
      BabelScope.ALL,
      options
    )
  }

  get preferredAssumptions() {
    return {
      noDocumentAll: true, // document.all is deprecated
      noNewArrows: true, // defaults to true in Babel 7.
      setPublicClassFields: true, // I like it
      privateFieldsAsSymbols: true, // safe enough and easy to debug
    }
  }

  /** @returns {import('@babel/core').TransformOptions} */
  build(scope = BabelScope.ALL) {
    /* eslint-disable no-bitwise */
    return {
      assumptions: this.preferredAssumptions,
      presets: this.#components
        .filter((c) => c.type === BabelType.PRESET && scope & c.scope)
        .map((c) => [c.id, c.options]),
      plugins: this.#components
        .filter((c) => c.type === BabelType.PLUGIN && scope & c.scope)
        .map((c) => [c.id, c.options]),
      sourceType: 'unambiguous',
    }
  }

  /**
   * @param {RegExp} test
   * @returns {import('webpack').RuleSetRule}
   */
  toWebpackRule(test = /\.(c|m)?(t|j)sx?$/) {
    const loadOptions = { cacheDirectory: true }
    return {
      test,
      oneOf: [
        {
          // match JS
          test: /\.(c|m)?js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            ...loadOptions,
            ...this.build(BabelScope.JS),
          },
        },
        {
          // match JSX
          test: /\.(c|m)?jsx$/,
          loader: 'babel-loader',
          options: {
            ...loadOptions,
            ...this.build(BabelScope.JSX),
          },
        },
        {
          // match TS
          test: /\.(c|m)?ts$/,
          loader: 'babel-loader',
          options: {
            ...loadOptions,
            ...this.build(BabelScope.TS),
          },
        },
        {
          // match TSX
          test: /\.(c|m)?tsx$/,
          loader: 'babel-loader',
          options: {
            ...loadOptions,
            ...this.build(BabelScope.TSX),
          },
        },
      ],
    }
  }
}
