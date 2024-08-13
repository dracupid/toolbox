import { bench, run } from 'mitata'
import { randomString } from '../random/node.js'
import nodeMd5 from './md5-node.js'
import md5 from './md5.js'

const testString = randomString(200)

bench('md5', () => {
  md5(testString)
})
bench('md5-node', () => {
  nodeMd5(testString)
})

await run()
