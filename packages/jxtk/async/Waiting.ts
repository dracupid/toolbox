export const enum WaitingState {
  PENDING,
  FULFULLED,
  REJECTED,
}

export class Waiting<T> {
  #value: T | undefined
  #state: WaitingState = WaitingState.PENDING
  #pending: ((val: T) => void)[] = []

  getSync() {
    return this.#value
  }

  onReady(cb: (val: T) => void): void {
    if (typeof cb !== 'function') return

    if (this.#state === WaitingState.FULFULLED) {
      cb(this.#value!)
    } else if (this.#state === WaitingState.PENDING) {
      this.#pending.push(cb)
    }
  }

  set(val: T) {
    if (!this.isPending) {
      throw new Error('Cannot set a non-pending waiting value')
    }

    this.#value = val
    this.#state = WaitingState.FULFULLED
    try {
      this.#pending.forEach((cb) => {
        cb(val)
      })
    } finally {
      this.#pending = []
    }
  }

  abort() {
    if (!this.isPending) {
      throw new Error('Cannot abort a non-pending waiting value')
    }
    this.#state = WaitingState.REJECTED
    this.#pending = []
  }

  get state() {
    return this.#state
  }

  get isPending(): boolean {
    return this.#state === WaitingState.PENDING
  }
}
