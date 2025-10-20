import assert from 'node:assert'
import { test } from 'node:test'
import { randomString } from '../random/node.ts'
import nodeMd5 from './md5-node.ts'
import md5 from './md5.ts'

void test('md5', () => {
  for (let i = 1; i <= 100; i++) {
    const TEST_STRING = randomString(i)
    assert(md5(TEST_STRING) === nodeMd5(TEST_STRING))
  }
})
