import crypto from 'crypto'
import { assertPositiveInteger } from '../assert'

export function randomString(length: number): string {
  assertPositiveInteger('length', length)

  if (length % 2 === 0) {
    return crypto.randomBytes(length / 2).toString('hex')
  } else {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length)
  }
}
