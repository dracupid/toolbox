export const enum WaitingState {
  PENDING,
  FULFILLED,
  REJECTED,
}

export class Waiting<T> {
  #value: T | undefined
  #state: WaitingState = WaitingState.PENDING
  readonly #waiters = new Set<(val: T) => void>()

  getSync() {
    return this.#value
  }

  unwrap(): T {
    if (this.pending) {
      throw new Error('Waiting value is not ready yet')
    }
    return this.#value as T
  }

  onReady(cb: (val: T) => void): void {
    if (typeof cb !== 'function') return

    if (this.fulfilled) {
      cb(this.#value!)
    } else if (this.pending) {
      this.#waiters.add(cb)
    }
  }

  set(val: T) {
    if (!this.pending) {
      throw new Error('Cannot set a non-pending waiting value')
    }

    this.#value = val
    this.#state = WaitingState.FULFILLED
    try {
      this.#waiters.forEach((cb) => {
        cb(val)
      })
    } finally {
      this.#waiters.clear()
    }
  }

  abort() {
    if (!this.pending) {
      throw new Error('Cannot abort a non-pending waiting value')
    }
    this.#state = WaitingState.REJECTED
    this.#waiters.clear()
  }

  get pending(): boolean {
    return this.#state === WaitingState.PENDING
  }

  get fulfilled(): boolean {
    return this.#state === WaitingState.FULFILLED
  }

  get rejected(): boolean {
    return this.#state === WaitingState.REJECTED
  }
}
