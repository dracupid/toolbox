import { SingleEventEmitter } from '../event/SingleEventEmitter.js'

type PointerID = symbol | number // 浏览器派发的用 number，模拟生成的用 string

/**
 * 一个为了对齐 Touch 事件设计的 Pointer
 */
export class Pointer {
  prevX = 0
  prevY = 0
  constructor(
    readonly identifier: number,
    readonly id: PointerID,
    public x: number,
    public y: number
  ) {}
  move(x: number, y: number) {
    // 不处理位置不变的情况
    if (this.x === x && this.y === y) return false
    this.prevX = this.x
    this.prevY = this.y
    this.x = x
    this.y = y
    return true
  }
}

export interface JXPointerEvent {
  type: 'start' | 'end' | 'move' | 'cancel'
  timeStamp: number
  pointers: Pointer[]
  current: Pointer
  cause: MouseEvent | undefined
}

const TAG = '[PointerManager]'
/**
 * 使用 pointer/mouse 事件模拟 touch 事件，以实现跨端兼容效果
 */
export class PointerManager {
  readonly #pointerMap = new Map<PointerID, Pointer>()
  readonly #emitter = new SingleEventEmitter<JXPointerEvent>()

  onOffEvent = this.#emitter.onOff.bind(this.#emitter)

  #nextIdentifier() {
    if (this.#pointerMap.size === 0) return 0
    const ids = [...this.#pointerMap.values()].map((info) => info.identifier)
    return Math.max(...ids) + 1
  }

  #emit(name: JXPointerEvent['type'], current: Pointer, cause?: MouseEvent) {
    const timeStamp = cause?.timeStamp ?? performance.now()
    this.#emitter.emit({
      type: name,
      timeStamp,
      pointers: [...this.#pointerMap.values()],
      current,
      cause,
    })
  }

  get pointerCount() {
    return this.#pointerMap.size
  }

  hasPointer(id: PointerID) {
    return this.#pointerMap.has(id)
  }

  addPointer(id: PointerID, x: number, y: number, cause?: MouseEvent) {
    if (this.#pointerMap.has(id)) {
      console.error(TAG, 'add dup pointer', id)
      return
    }
    console.debug(TAG, 'add pointer', id)
    const identifier = this.#nextIdentifier()
    const pointer = new Pointer(identifier, id, x, y)
    this.#pointerMap.set(id, pointer)

    this.#emit('start', pointer, cause)
  }

  movePointer(id: PointerID, x: number, y: number, cause?: MouseEvent) {
    const pointer = this.#pointerMap.get(id)
    if (!pointer) {
      console.warn(TAG, 'move unknown pointer', id)
      return
    }
    if (pointer.move(x, y)) {
      this.#emit('move', pointer, cause)
    }
  }

  removePointer(id: PointerID, cause?: MouseEvent) {
    const pointer = this.#pointerMap.get(id)
    if (!pointer) {
      console.warn(TAG, 'remove unknown pointer', id)
      return
    }
    console.debug(TAG, 'remove pointer', id)

    this.#pointerMap.delete(id)
    this.#emit('end', pointer, cause)
  }

  cancelPointer(id: PointerID, cause?: MouseEvent) {
    const pointer = this.#pointerMap.get(id)
    if (!pointer) {
      console.warn(TAG, 'cancel unknown pointer', id)
      return
    }

    this.#emit('cancel', pointer, cause)
  }
}
