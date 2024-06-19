import chalk from 'chalk'
import cluster from 'cluster'
import { inspect } from 'util'
import type { LogObject, LogTransformer } from '../types'

function pad2(num: number) {
  return ('' + num).padStart(2, '0')
}

function pad3(num: number) {
  return ('' + num).padStart(3, '0')
}

function formatTime(date: Date): string {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(
    date.getSeconds()
  )}.${pad3(date.getMilliseconds())}`
}

function buildTag(appName: string, tag: string) {
  return tag && appName ? `${appName}/${tag}` : appName || tag
}

inspect.defaultOptions.breakLength = 280

let ids =
  process.ppid !== process.pid ? `${process.ppid},${process.pid}` : process.pid

if (cluster.isWorker) {
  ids += '/' + (cluster.worker?.id ?? '-')
}

const colorMap: Record<string, (...text: unknown[]) => string> = {
  fatal: chalk.redBright,
  error: chalk.red,
  warn: chalk.yellowBright,
  info: chalk.greenBright,
  debug: chalk.grey,
  verbose: chalk.grey,
}

interface Options {
  showTime: boolean
  showPid: boolean
}

export default class NodePrettyTransformer implements LogTransformer {
  readonly #options: Options = {
    showTime: false,
    showPid: false,
  }
  constructor(options?: Options) {
    if (options) {
      this.#options = { ...this.#options, ...options }
    }
  }

  transform(logObj: LogObject): LogObject {
    let prefix = ''
    if (this.#options.showTime) {
      prefix += `[${formatTime(logObj.date)}]`
    }

    if (this.#options.showPid) {
      prefix += `[${ids}]`
    }

    const tagStr = buildTag(logObj.appName, logObj.tag)
    const levelMark = logObj.levelStr[0]!.toUpperCase()
    prefix += `[${tagStr ? `${levelMark}/${tagStr}` : levelMark}]`

    const colorFn = colorMap[logObj.levelStr]

    // 兼容第一个参数为 format string 的情况. TODO: 上色会影响 format，还需再解决
    if (logObj.args.length > 0 && typeof logObj.args[0] === 'string') {
      logObj.args[0] = `${prefix} ${logObj.args[0]}`
    } else {
      logObj.args.unshift(prefix)
    }

    if (colorFn) {
      logObj.args = logObj.args.map((arg) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        typeof arg === 'string' || typeof arg === 'number' ? colorFn(arg) : arg
      )
    }

    return logObj
  }
}
