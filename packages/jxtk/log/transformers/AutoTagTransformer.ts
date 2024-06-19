import type { LogObject, LogTransformer } from '../types'

function isTag(arg: unknown): arg is string {
  if (typeof arg !== 'string') return false
  return (
    arg.length >= 3 &&
    arg.startsWith('[') &&
    arg.endsWith(']') &&
    !arg.includes('[', 1) // 除了第一个字符外不能有 [
  )
}

export default class AutoTagTransformer implements LogTransformer {
  transform(logObj: LogObject): LogObject {
    if (isTag(logObj.args[0])) {
      const tag = logObj.args[0].slice(1, -1)
      if (logObj.tag) {
        logObj.tag += ':' + tag
      } else {
        logObj.tag = tag
      }
      logObj.args.shift()
    }
    return logObj
  }
}
