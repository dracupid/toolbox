import { test } from 'bun:test'
import assert from 'node:assert'
import { randomString } from './index'
import { randomString as nodeRandomString } from './node'
import { randomString as webRandomString } from './web'

test('randomString', () => {
  for (let i = 1; i <= 100; i++) {
    const string = randomString(i)
    assert(string.length === i)
  }
})

test('randomString-node', () => {
  for (let i = 1; i <= 100; i++) {
    const string = nodeRandomString(i)
    assert(string.length === i)
  }
})
test('randomString-web', () => {
  for (let i = 1; i <= 100; i++) {
    const string = webRandomString(i)
    assert(string.length === i)
  }
})
