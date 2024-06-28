type EName = string | symbol
type ErrorInfo = {
  error: unknown
  event: EName
}

const EVT_ERROR = Symbol('error')

export class EventEmitter<T extends Record<EName, any> = Record<EName, any>> {
  readonly #$ = new Map<keyof T, Set<(arg: any) => void>>()

  #emitError(event: EName, e: unknown) {
    const listeners = this.#$.get(EVT_ERROR)

    if (listeners && listeners.size > 0) {
      for (const cb of listeners) {
        try {
          cb({
            event,
            error: e,
          } satisfies ErrorInfo)
        } catch (e) {
          console.error('error in error handler', e)
        }
      }
    } else {
      console.error(`error in [${event.toString()}] event listener`, e)
    }
  }

  onError(cb: (errorInfo: ErrorInfo) => void): this {
    return this.on(EVT_ERROR, cb)
  }

  emit<E extends keyof T>(event: E, arg: T[E]): boolean {
    const listeners = this.#$.get(event)

    if (listeners && listeners.size > 0) {
      for (const cb of listeners) {
        try {
          cb(arg)
        } catch (e) {
          this.#emitError(event as EName, e)
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
