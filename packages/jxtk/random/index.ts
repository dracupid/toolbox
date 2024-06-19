import { assertPositiveInteger } from '../assert'
import { Charset } from './charset'

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
