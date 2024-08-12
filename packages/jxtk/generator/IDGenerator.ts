export interface IDGenerator<T> {
  next(): T
}

export class NumberIDGenerator implements IDGenerator<number> {
  #counter: number

  constructor(start = 0) {
    this.#counter = start
  }

  next(): number {
    return this.#counter++
  }
}

export class AtoZIDGenerator implements IDGenerator<string> {
  #counter: number

  constructor(start = 0) {
    this.#counter = start
  }

  next(): string {
    let id = ++this.#counter
    let idStr = ''
    do {
      const n = (id - 1) % 52
      const c =
        n >= 26 ? String.fromCharCode(n - 26 + 97) : String.fromCharCode(n + 65)
      idStr += c
      id = Math.floor((id - 1) / 52)
    } while (id > 0)
    return idStr
  }
}
