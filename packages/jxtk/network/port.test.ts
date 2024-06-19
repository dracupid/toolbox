import { test } from 'bun:test'
import { assert } from '../assert'
import { checkReachability } from './port'

test('port:dead', async () => {
  assert(!(await checkReachability(4982)))
})

test('port:alive', async () => {
  assert(await checkReachability(80, 'qq.com'))
})
