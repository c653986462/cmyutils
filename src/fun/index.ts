/**
 * 防抖
 * @param {Function} fn 添加防抖的函数
 * @param {number} delay 防抖延迟，defult: 500
 * @version 1.0
 */
export const debounce = function (fn: Function, delay: number = 500) {
  let time: any = null
  return function (...args: any) {
    if (time !== null) {
      clearTimeout(time)
    }
    time = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流
 * @param {Function} fn 添加节流的函数
 * @param {number} wait 节流时间，defult: 500
 * @version 1.0
 */
export const throttle = function (fn: Function, wait: number = 500) {
  var timer: any = null
  var startTime = Date.now()

  return function () {
    var curTime = Date.now()
    var remaining = wait - (curTime - startTime)
    // @ts-ignore
    var context = this
    var args = arguments

    clearTimeout(timer)

    if (remaining <= 0) {
      fn.apply(context, args)

      startTime = Date.now()
    } else {
      timer = setTimeout(fn, remaining)
    }
  }
}

/**
 * 轮询函数
 * @param {*} fn  轮询函数
 * @param {number} t  轮询时间 default 60000
 */
export function requestCirculation(fn: Function, t: number = 60000, immediate: boolean = true): void {
  if (immediate) {
    fn()
  }
  let timer: any = setTimeout(() => {
    fn()
    clearTimeout(timer)
    timer = null
    requestCirculation(fn, t, false)
  }, t)
}
