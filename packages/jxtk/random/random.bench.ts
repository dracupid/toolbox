import { bench, run } from 'mitata'
import { randomString } from './index.js'
import { randomString as nodeRandomString } from './node.js'
import { randomString as webRandomString } from './web.js'

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
