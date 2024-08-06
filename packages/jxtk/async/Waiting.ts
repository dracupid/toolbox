export const enum WaitingState {
  PENDING,
  FULFILLED,
  REJECTED,
}

export class Waiting<T> {
  #value: T | undefined
  #state: WaitingState = WaitingState.PENDING
  readonly #pending = new Set<(val: T) => void>()

  getSync() {
    return this.#value
  }

  unwrap(): T {
    if (this.isPending) {
      throw new Error('Waiting value is not ready yet')
    }
    return this.#value as T
  }

  onReady(cb: (val: T) => void): void {
    if (typeof cb !== 'function') return

    if (this.#state === WaitingState.FULFILLED) {
      cb(this.#value!)
    } else if (this.#state === WaitingState.PENDING) {
      this.#pending.add(cb)
    }
  }

  set(val: T) {
    if (!this.isPending) {
      throw new Error('Cannot set a non-pending waiting value')
    }

    this.#value = val
    this.#state = WaitingState.FULFILLED
    try {
      this.#pending.forEach((cb) => {
        cb(val)
      })
    } finally {
      this.#pending.clear()
    }
  }

  replace(val: T) {
    if (this.#state !== WaitingState.FULFILLED) {
      throw new Error('Can only replace a fulfilled waiting value')
    }
    this.#value = val
  }

  setOrReplace(val: T) {
    if (this.isPending) {
      this.set(val)
    } else {
      this.replace(val)
    }
  }

  abort() {
    if (!this.isPending) {
      throw new Error('Cannot abort a non-pending waiting value')
    }
    this.#state = WaitingState.REJECTED
    this.#pending.clear()
  }

  get state() {
    return this.#state
  }

  get isPending(): boolean {
    return this.#state === WaitingState.PENDING
  }
}
