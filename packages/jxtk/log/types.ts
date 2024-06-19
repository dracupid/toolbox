export type LogLevelName =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'log'
  | 'debug'
  | 'silent'
  | 'verbose'

export enum LogLevel {
  fatal = 0,
  error = 1,
  warn = 2,
  info = 3,
  log = 4,
  debug = 5,
  silent = -9999,
  verbose = 9999,
}

export interface Logger {
  fatal(...args: unknown[]): void
  error(...args: unknown[]): void
  warn(...args: unknown[]): void
  info(...args: unknown[]): void
  log(...args: unknown[]): void
  debug(...args: unknown[]): void
  verbose(...args: unknown[]): void
}

export interface LogObject {
  appName: string
  level: LogLevel
  levelStr: LogLevelName
  tag: string
  args: any[]
  date: Date
  file?: string
  line?: number
}

export interface LogReporter {
  log: (logObj: LogObject) => void
  logDone?: (logObj: LogObject) => void
}

export interface LogTransformer {
  transform: (logObj: LogObject) => LogObject
}
