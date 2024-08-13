import { Dynamic } from './Dynamic.js'
import { EventEmitter } from './EventEmitter.js'
import { SingleEventEmitter } from './SingleEventEmitter.js'

export type ToStatic<T> = {
  [K in keyof T]: T[K] extends Dynamic<infer P> ? P : never
}

export type ToPartialDynamic<T> = {
  [K in keyof T]: T[K] | Dynamic<T[K]>
}

export class DynamicRecord<T extends Record<string | symbol, any>> {
  readonly #v: ToPartialDynamic<T>
  readonly #proxy: T
  readonly #$ = new EventEmitter<T>()
  readonly #$any = new SingleEventEmitter<Partial<T>>()

  constructor(initValue: ToPartialDynamic<T>) {
    this.#v = initValue

    Object.entries(this.#v).forEach(([key, value]) => {
      // NOTICE: possibly memory leak if this Dynamic is hold by others
      if (value instanceof Dynamic) {
        value.onChange((v) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          ;(this.#proxy as any)[key] = v
        })
      }
    })

    this.#proxy = new Proxy(this.#v as T, {
      set: <K extends keyof T>(target: T, key: K, value: T[K]) => {
        if (target[key] === value) return false
        target[key] = value

        this.#$.emit(key, value)

        const obj: Partial<T> = {}
        obj[key] = value
        this.#$any.emit(obj)
        return true
      },
      get(target, key) {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
        const value = target[key]
        if (value instanceof Dynamic) {
          return value.get()
        }
        return target[key]
      },
    })
  }

  get proxy() {
    return this.#proxy
  }

  onChange<K extends keyof T>(key: K, fn: (arg: T[K]) => void) {
    this.#$.on(key, fn)
  }

  offChange<K extends keyof T>(key: K, fn: (arg: T[K]) => void) {
    this.#$.off(key, fn)
  }

  onAnyChange(fn: (arg: Partial<T>) => void) {
    this.#$any.on(fn)
  }

  offAnyChange(fn: (arg: Partial<T>) => void) {
    this.#$any.off(fn)
  }
}
