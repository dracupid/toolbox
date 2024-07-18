export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timer: ReturnType<typeof setTimeout> | undefined
  return function fn(...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
    timer = setTimeout(() => {
      timer = undefined
      func(...args)
    }, wait)
  } as T
}
