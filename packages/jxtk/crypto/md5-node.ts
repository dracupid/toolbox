import crypto, { type BinaryLike } from 'crypto'

export default function md5(content: BinaryLike) {
  return crypto.createHash('md5').update(content).digest('hex')
}
