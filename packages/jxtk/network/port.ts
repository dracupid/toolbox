// modified from https://github.com/sindresorhus/is-port-reachable

import net from 'node:net'

export async function checkReachability(
  port: number,
  host = '127.0.0.1',
  options: Partial<{ timeout: number; debug?: boolean }> = {}
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const socket = new net.Socket()

    const onError = (e: any) => {
      if (options.debug) {
        console.log(`connect to ${host}:${port} failed: ${e}`)
      }
      socket.destroy()
      resolve(false)
    }

    socket.setTimeout(options.timeout || 1000)
    socket.once('error', onError)
    socket.once('timeout', onError)

    socket.connect(port, host, () => {
      socket.end()
      resolve(true)
    })
  })
}
