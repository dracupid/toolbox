/* eslint-disable n/no-unsupported-features/node-builtins */
import { assertPositiveInteger } from '../assert'

export function randomString(length: number): string {
  assertPositiveInteger('length', length)

  const arr = new Uint8Array(Math.ceil(length / 2))
  globalThis.crypto.getRandomValues(arr)
  let result = ''
  for (let i = 0; i < arr.length; i++) {
    const c = i.toString(16)
    result += c.length === 2 ? c : '0' + c
  }

  return result.slice(0, length)
}
