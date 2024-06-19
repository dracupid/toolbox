export function assert(cond: boolean, msg = 'assert failed'): asserts cond {
  if (!cond) {
    throw new Error(msg)
  }
}

export function assertPositiveInteger(
  name: string,
  n: number
): asserts n is number {
  assert(Number.isInteger(n), `${name} should be integer, but got ${n}`)
  assert(n > 0, `${name} should be > 0, but got ${n}`)
}
