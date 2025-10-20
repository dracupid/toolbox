import { test } from 'node:test'
import { assert } from '../assert/index.ts'
import { checkReachability } from './port.ts'

void test('port:dead', async () => {
  assert(!(await checkReachability(4982)))
})

void test('port:alive', async () => {
  assert(await checkReachability(80, 'qq.com'))
})
