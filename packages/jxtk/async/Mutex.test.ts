import assert from 'assert'
import { test } from 'bun:test'
import { sleep } from './index.js'
import { Mutex } from './Mutex.js'

test('Mutex', async () => {
  const mutex = new Mutex()
  let i = 0
  await Promise.all([
    mutex.run(async () => {
      assert(i === 0)
      i = 1
      await sleep(100)
      assert(i === 1)
      i = 2
    }),
    mutex.run(async () => {
      assert(i === 2)
      i = 3
      await sleep(100)
      assert(i === 3)
      i = 4
    }),
    mutex.run(async () => {
      assert(i === 4)
      i = 5
      await sleep(100)
      assert(i === 5)
      i = 6
    }),
  ])
  assert(i === 6)
})
