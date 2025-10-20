import { assertPositiveInteger } from '../assert/index.ts'
import { Charset } from './charset.ts'

export function randomString(
  length: number,
  charset = Charset.DEFAULT
): string {
  assertPositiveInteger('length', length)

  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return result
}
