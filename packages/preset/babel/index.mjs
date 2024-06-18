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

// pnpm add -D @babel/preset-typescript @babel/preset-env core-js @babel/plugin-transform-runtime @babel/runtime
export class BabelConfig {
  /** @type {NodeRequire} */
  #require
  /** @type {Preset<any>[]} */
  #presets = []
  /** @type {Plugin<any>[]} */
  #plugins = []
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
   * @param {T} options
   */
  addPreset(id, options) {
    /** @type {Preset<T>} */
    const preset = [id, options]
    this.#presets.push(preset)
    return this
  }

  /**
   * @template T
   * @param {string} id
   * @param {T} options
   */
  addPlugin(id, options) {
    /** @type {Plugin<T>} */
    const plugin = [id, options]
    this.#plugins.push(plugin)
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
    return this.addPreset(this.#require.resolve('@babel/preset-env'), options)
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
  build() {
    return {
      assumptions: this.preferredAssumptions,
      presets: this.#presets,
      plugins: this.#plugins,
      sourceType: 'unambiguous',
    }
  }
}
