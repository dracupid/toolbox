export class SingleEventEmitter<T> {
  readonly #$ = new Set<(arg: T) => void>()

  emit(arg: T): boolean {
    const cbs = this.#$
    for (const cb of cbs) {
      // TODO: ErrorHandler
      cb(arg)
    }
    return cbs.size > 0
  }

  on(cb: (arg: T) => void): this {
    this.#$.add(cb)
    return this
  }

  off(cb: (arg: T) => void): void {
    this.#$.delete(cb)
  }

  offAll(): void {
    this.#$.clear()
  }
}
