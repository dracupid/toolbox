export class Mutex {
  #locked = false
  readonly #waitingList: (() => void)[] = []

  async lock(): Promise<void> {
    if (this.#locked) {
      return new Promise((resolve) => {
        this.#waitingList.push(resolve)
      })
    } else {
      this.#locked = true
    }
  }

  unlock(): void {
    this.#locked = false
    if (this.#waitingList.length > 0) {
      const resolve = this.#waitingList.shift()!
      resolve()
    }
  }

  async run<T>(cb: () => Promise<T> | T): Promise<T> {
    await this.lock()
    try {
      return await cb()
    } finally {
      this.unlock()
    }
  }
}
