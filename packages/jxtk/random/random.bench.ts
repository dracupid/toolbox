import { bench, run } from 'mitata'
import { randomString } from './index'
import { randomString as nodeRandomString } from './node'
import { randomString as webRandomString } from './web'

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
