export class SingleEventEmitter<T> {
  readonly #$ = new Set<(arg: T) => void>()

  emit(arg: T): boolean {
    const cbs = this.#$
    for (const cb of cbs) {
      try {
        cb(arg)
      } catch (e) {
        console.error(`error in single listener`, e)
      }
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

  onOff(cb: (arg: T) => void) {
    this.on(cb)
    return () => {
      this.off(cb)
    }
  }

  offAll(): void {
    this.#$.clear()
  }
}
