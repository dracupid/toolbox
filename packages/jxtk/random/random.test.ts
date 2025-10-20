import assert from 'node:assert'
import { test } from 'node:test'
import { randomString } from './index.ts'
import { randomString as nodeRandomString } from './node.ts'
import { randomString as webRandomString } from './web.ts'

void test('randomString', () => {
  for (let i = 1; i <= 100; i++) {
    const string = randomString(i)
    assert(string.length === i)
  }
})

void test('randomString-node', () => {
  for (let i = 1; i <= 100; i++) {
    const string = nodeRandomString(i)
    assert(string.length === i)
  }
})

void test('randomString-web', () => {
  for (let i = 1; i <= 100; i++) {
    const string = webRandomString(i)
    assert(string.length === i)
  }
})
