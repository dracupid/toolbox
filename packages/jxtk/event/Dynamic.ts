import { SingleEventEmitter } from './SingleEventEmitter'

type EqualFn<T> = (v1: T, v2: T) => boolean

export class Dynamic<T> {
  #v: T
  readonly #$ = new SingleEventEmitter<T>()
  readonly #isEqual: EqualFn<T> | undefined

  constructor(initValue: T, isEqual?: EqualFn<T>) {
    this.#v = initValue
    this.#isEqual = isEqual
  }

  set(v: T) {
    if (this.#isEqual ? this.#isEqual(this.#v, v) : this.#v === v) return false
    this.#v = v
    this.#$.emit(v)
    return true
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

export type DynamicType<T> = T extends Dynamic<infer P> ? P : never
export type DynamicObject<T extends Record<string, any>> = {
  [K in keyof T]: Dynamic<T[K]>
}
