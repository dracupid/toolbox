type EName = string | symbol
type ErrorHandler = (
  e: unknown,
  name: EName,
  emitter: EventEmitter<any>
) => void

export class EventEmitter<T extends Record<EName, any> = Record<EName, any>> {
  readonly #$ = new Map<keyof T, Set<(arg: any) => void>>()

  static #onError: ErrorHandler | undefined
  static setOnError(handler: ErrorHandler) {
    EventEmitter.#onError = handler
  }

  emit<E extends keyof T>(event: E, arg: T[E]): boolean {
    const listeners = this.#$.get(event)

    if (listeners && listeners.size > 0) {
      for (const cb of listeners) {
        try {
          cb(arg)
        } catch (e) {
          if (EventEmitter.#onError) {
            try {
              EventEmitter.#onError(e, event as EName, this)
            } catch (e) {
              console.error(e)
            }
          } else {
            console.error(e)
          }
        }
      }
      return true
    }
    return false
  }

  on<E extends keyof T>(event: E, cb: (arg: T[E]) => void): this {
    const listeners = this.#$.get(event)
    if (listeners) {
      listeners.add(cb)
    } else {
      this.#$.set(event, new Set([cb]))
    }
    return this
  }

  onOff<E extends keyof T>(event: E, cb: (arg: T[E]) => void) {
    this.on(event, cb)
    return () => {
      this.off(event, cb)
    }
  }

  off<E extends keyof T>(event: E, cb?: (arg: T[E]) => void): void {
    const listeners = this.#$.get(event)
    if (listeners) {
      if (typeof cb === 'undefined') {
        this.#$.delete(event)
      } else {
        listeners.delete(cb)
        if (listeners.size === 0) {
          this.#$.delete(event)
        }
      }
    }
  }

  clearListeners(): void {
    this.#$.clear()
  }
}
