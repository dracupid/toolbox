type TaskFn<T> = () => Promise<T>

interface TaskContext<T> {
  fn: TaskFn<T>
  resolve: (args: T) => void
  reject: (e: unknown) => void
}

export class TaskRunner {
  readonly #maxTaskNum: number
  #runningCnt = 0
  readonly #pending: TaskContext<any>[] = []
  constructor(maxTaskNum: number) {
    this.#maxTaskNum = maxTaskNum
  }
  readonly #next = () => {
    this.#runningCnt--
    if (this.#pending.length === 0) return
    const task = this.#pending.shift()
    if (task) {
      this.#runningCnt++
      task.fn().finally(this.#next).then(task.resolve, task.reject)
    }
  }
  async add<T>(fn: TaskFn<T>) {
    if (this.#runningCnt >= this.#maxTaskNum) {
      return new Promise<T>((resolve, reject) => {
        this.#pending.push({ fn, resolve, reject })
      })
    } else {
      this.#runningCnt++
      return fn().finally(this.#next)
    }
  }
}
