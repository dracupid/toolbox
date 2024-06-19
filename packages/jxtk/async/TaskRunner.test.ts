import { test } from 'bun:test'
import assert from 'node:assert'
import { sleep } from '.'
import { TaskRunner } from './TaskRunner'

test('TaskRunner', async () => {
  const runner = new TaskRunner(2)
  let i = 0
  await Promise.all([
    runner.add(async () => {
      assert(i++ === 0)
      await sleep(100)
      assert(i++ === 2)
    }),
    runner.add(async () => {
      assert(i++ === 1)
      await sleep(100)
      assert(i++ === 4)
    }),
    runner.add(async () => {
      assert(i++ === 3)
      await sleep(100)
      assert(i++ === 6)
    }),
    runner.add(async () => {
      assert(i++ === 5)
      await sleep(100)
      assert(i++ === 8)
    }),
    runner.add(async () => {
      assert(i++ === 7)
      await sleep(100)
      assert(i++ === 9)
    }),
  ])
  assert(i === 10)
})
