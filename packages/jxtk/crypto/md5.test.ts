import { test } from 'bun:test'
import assert from 'node:assert'
import { randomString } from '../random/node'
import md5 from './md5'
import nodeMd5 from './md5-node'

test('md5', () => {
  for (let i = 1; i <= 100; i++) {
    const TEST_STRING = randomString(i)
    assert(md5(TEST_STRING) === nodeMd5(TEST_STRING))
  }
})
