import { SingleEventEmitter } from './SingleEventEmitter'

export class Dynamic<T> {
  #v: T
  readonly #$ = new SingleEventEmitter<T>()

  constructor(initValue: T) {
    this.#v = initValue
  }

  set(v: T) {
    if (this.#v === v) return
    this.#v = v
    this.#$.emit(v)
  }

  get(): T {
    return this.#v
  }

  onChange(fn: (arg: T) => void) {
    this.#$.on(fn)
  }

  offChange(fn: (arg: T) => void) {
    this.#$.off(fn)
  }

  map<E>(mapper: (v: T) => E): Dynamic<E> {
    const val = new Dynamic(mapper(this.get()))
    this.onChange((v) => {
      val.set(mapper(v))
    })
    return val
  }
}
