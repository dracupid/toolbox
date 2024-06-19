import type { IncomingMessage, RequestOptions } from 'node:http'
import http from 'node:http'
import https from 'node:https'
import { types } from 'node:util'
import { decompressBody } from './body'

export class Response {
  #bodyString: string | null = null
  #bodyJSON: unknown = null
  constructor(
    readonly body: Buffer,
    readonly response: IncomingMessage
  ) {}

  get isJSON() {
    return this.response.headers['content-type']?.includes('application/json')
  }
  get bodyJSON(): any {
    if (this.#bodyJSON === null) {
      this.#bodyJSON = JSON.parse(this.bodyString)
    }
    return this.#bodyJSON
  }
  get bodyString(): string {
    if (this.#bodyString === null) {
      this.#bodyString = this.body.toString('utf-8')
    }
    return this.#bodyString
  }
}

/* a very simple and stupid http request client */
export default async function request(
  url: string,
  options: RequestOptions & {
    body?: ArrayBuffer | string | Record<string, unknown>
  } = {}
): Promise<Response> {
  const reqModule = url.startsWith('https') ? https : http

  const reqOptions = {
    ...options,
    timeout: 10000,
    headers: { ...options.headers },
  }

  let bodyBuffer: Buffer | null = null
  if (typeof options.body === 'string') {
    bodyBuffer = Buffer.from(options.body)
  } else if (types.isAnyArrayBuffer(options.body)) {
    bodyBuffer = Buffer.from(options.body)
  } else if (options.body) {
    bodyBuffer = Buffer.from(JSON.stringify(options.body))
    reqOptions.headers['content-type'] = 'application/json'
  }

  reqOptions.headers['accept-encoding'] = 'gzip, deflate'
  reqOptions.headers['user-agent'] = reqOptions.headers['user-agent'] || 'jtk'
  if (bodyBuffer) {
    reqOptions.headers['content-length'] = bodyBuffer.byteLength
  }
  delete reqOptions.body

  return new Promise((resolve, reject) => {
    const req = reqModule.request(url, reqOptions, (res) => {
      const { statusCode = 500 } = res
      // redirect
      if (
        statusCode >= 300 &&
        statusCode < 400 &&
        res.headers.location &&
        (!options.method || options.method.toUpperCase() === 'GET')
      ) {
        resolve(request(res.headers.location, reqOptions))
        return
      }

      let buf = Buffer.alloc(0)
      res
        .on('data', (chunk) => {
          buf = Buffer.concat([buf, chunk])
          return buf
        })
        .on('end', () => {
          decompressBody(res.headers['content-encoding'] || '', buf).then(
            (result) => {
              resolve(new Response(result, res))
            },
            reject
          )
        })
        .on('error', reject)
    })

    if (bodyBuffer) {
      req.write(bodyBuffer)
    }
    req.on('error', reject)
    req.end()
  })
}
