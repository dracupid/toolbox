import zlib from 'node:zlib'

export async function decompressBody(
  encoding: string,
  body: Buffer
): Promise<Buffer> {
  if (!['gzip', 'deflate', 'br'].includes(encoding)) {
    return body
  }
  switch (encoding) {
    case 'gzip': {
      return new Promise((resolve, reject) => {
        zlib.gunzip(body, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      })
    }
    case 'deflate': {
      return new Promise((resolve, reject) => {
        zlib.deflate(body, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      })
    }
    case 'br': {
      return new Promise((resolve, reject) => {
        zlib.brotliDecompress(body, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      })
    }
    default:
      return body
  }
}
