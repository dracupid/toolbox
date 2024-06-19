import {
  LogLevel,
  type LogLevelName,
  type LogObject,
  type LogReporter,
  type LogTransformer,
  type Logger,
} from './types'

export class JLogger implements Logger {
  #reporters: LogReporter[] = []
  #transformers: LogTransformer[] = []
  readonly #appName: string
  #level = LogLevel.verbose

  constructor(appName = '') {
    this.#appName = appName
  }

  fatal(...args: unknown[]): void {
    this.#logFn('fatal', args)
  }

  error(...args: unknown[]): void {
    this.#logFn('error', args)
  }

  warn(...args: unknown[]): void {
    this.#logFn('warn', args)
  }

  log(...args: unknown[]): void {
    this.#logFn('log', args)
  }

  info(...args: unknown[]): void {
    this.#logFn('info', args)
  }

  debug(...args: unknown[]): void {
    this.#logFn('debug', args)
  }

  verbose(...args: unknown[]): void {
    this.#logFn('verbose', args)
  }

  addReporter(reporter: LogReporter, prepend = false) {
    if (prepend) {
      this.#reporters.unshift(reporter)
    } else {
      this.#reporters.push(reporter)
    }
  }

  addTransformer(transformer: LogTransformer, prepend = false) {
    if (prepend) {
      this.#transformers.unshift(transformer)
    } else {
      this.#transformers.push(transformer)
    }
  }

  setLevel(level: LogLevel) {
    this.#level = level
  }

  #logFn(levelName: LogLevelName, args: unknown[]) {
    const level = LogLevel[levelName]
    if (level > this.#level) return
    let logObj: LogObject = {
      appName: this.#appName,
      level,
      levelStr: levelName,
      tag: '',
      args,
      date: new Date(),
    }
    for (const t of this.#transformers) logObj = t.transform(logObj)
    for (const r of this.#reporters) r.log(logObj)
    for (const r of this.#reporters) r.logDone?.(logObj)
  }

  clone(newAppName: string) {
    const logger = new JLogger(newAppName)
    logger.setLevel(this.#level)
    logger.#reporters = [...this.#reporters]
    logger.#transformers = [...this.#transformers]
    return logger
  }

  wrapConsole(consoleObj: any) {
    const methods = ['debug', 'log', 'info', 'warn', 'error'] as const

    for (const name of methods) {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
      if (!(name in consoleObj)) continue // 只 hook console 上存在的方法
      if (!consoleObj['__' + name]) {
        consoleObj['__' + name] = consoleObj[name]
      }
      consoleObj[name] = this[name].bind(this).bind(consoleObj)
    }
  }

  get appName() {
    return this.#appName
  }

  get level(): LogLevel {
    return this.#level
  }
}

export { LogLevel, type LogLevelName } from './types'
