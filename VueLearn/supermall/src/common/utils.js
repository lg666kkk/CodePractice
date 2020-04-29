export function debounce(func, wait, immediate) {
  let context, args, timeout
  return function() {
    context = this
    args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(function(){
        timeout = null
      }, wait)
      if (timeout) func.apply(context, args)
    } else {
      timeout = setTimeout(function(){
        func.apply(context, args)
      }, wait)
    }
  }
}
