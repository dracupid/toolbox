export class InOutToggle {
  #in = false
  enter() {
    if (this.#in) return false
    this.#in = true
    return true
  }
  leave() {
    if (!this.#in) return false
    this.#in = false
    return true
  }
}
