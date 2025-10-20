import { bench, run } from 'mitata'
import { randomString } from './index.ts'
import { randomString as nodeRandomString } from './node.ts'
import { randomString as webRandomString } from './web.ts'

bench('js', () => {
  randomString(100)
})
bench('node', () => {
  nodeRandomString(100)
})
bench('web', () => {
  webRandomString(100)
})

await run()
