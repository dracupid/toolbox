import type { PointerManager } from './PointerManager'

const pointerEvents = [
  'pointerdown',
  'pointermove',
  'pointerup',
  'pointercancel',
] as const

/**
 * 将鼠标事件和触屏的指针事件转换成 WMPF 抽象的 pointer
 */
export class PointerBuilder {
  #leftMouseDown = false
  readonly #mouseMockPointer = Symbol('mouse')

  constructor(
    el: HTMLElement,
    private readonly pointerManager: PointerManager,
    private readonly isValidTarget?: (e: HTMLElement) => boolean
  ) {
    el.style.touchAction = 'none'

    pointerEvents.forEach((key) => {
      el.addEventListener(key, this.#feedPointer, { capture: true })
    })

    el.addEventListener('contextmenu', (e) => e.preventDefault())
  }

  readonly #feedPointer = (e: PointerEvent) => {
    const target = e.target as HTMLElement
    if (this.isValidTarget && !this.isValidTarget(target)) return

    // 鼠标指针锁定时，不响应指针事件
    if (e.pointerType === 'mouse' && document.pointerLockElement) {
      return
    }

    if (e.type === 'pointerdown') {
      // touch 事件的默认行为就是捕获指针，所以这里统一处理
      target.setPointerCapture(e.pointerId)
    }

    const { offsetX: x, offsetY: y, type } = e
    const pm = this.pointerManager

    if (e.pointerType === 'mouse') {
      // 仅在左键按下的情况认为指针存在，这里不对齐指针事件的行为
      // 非首个鼠标按键按下的情况，不会触发 pointerdown，只会触发 pointermove。
      // eslint-disable-next-line no-bitwise
      const isMouseLeftDown = (e.buttons & 1) === 1
      const pointerId = this.#mouseMockPointer

      if (this.#leftMouseDown !== isMouseLeftDown) {
        this.#leftMouseDown = isMouseLeftDown
        if (isMouseLeftDown) {
          pm.addPointer(pointerId, x, y, e)
        } else if (e.type === 'pointercacel') {
          pm.cancelPointer(pointerId, e)
        } else {
          pm.removePointer(pointerId, e)
        }
      } else if (type === 'pointermove' && pm.hasPointer(pointerId)) {
        pm.movePointer(pointerId, x, y, e)
      }
    } else {
      // 非鼠标设备对齐指针事件
      const pointerId = e.pointerId
      if (type === 'pointerdown') {
        pm.addPointer(pointerId, x, y, e)
      } else if (type === 'pointermove') {
        if (pm.hasPointer(pointerId)) {
          pm.movePointer(pointerId, x, y, e)
        }
      } else if (type === 'pointerup') {
        pm.removePointer(pointerId, e)
      } else if (type === 'pointercacel') {
        pm.cancelPointer(pointerId, e)
      }
    }
  }
}
