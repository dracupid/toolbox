import { Console } from 'console'
import { LogLevel, type LogObject, type LogReporter } from '../types'

export default class NodeConsoleReporter implements LogReporter {
  readonly #console: Console
  constructor(console?: Console) {
    this.#console =
      console ||
      new Console({
        stdout: process.stdout,
        stderr: process.stderr,
      })
  }

  log(logObj: LogObject): void {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    const { level, args } = logObj
    if (level >= LogLevel.log) {
      this.#console.log(...args)
    } else {
      this.#console.error(...args)
    }
  }
}
