import { test } from 'bun:test'
import { assert } from '../assert'
import request from './request'

test('request:success', async () => {
  const res = await request(
    'https://mmbiz.qpic.cn/sz_mmbiz_jpg/I8txyBI0a2JF5lKEuMKGzq5vCUic33ibE94icbSTruE4PWtNwrpaUXPOcWrz4wlmenXFcGpvweXddJcyD2bnI4UFA/0?wx_fmt=jpeg'
  )
  assert(res.body.length === 38593)
  assert(res.response.statusCode === 200)
})
