/**
 * 节流函数 -- 第一次会触发
 * @param func 执行的函数
 * @param wait 等待的时间
 */
// function trottle (func, wait) {
//   let context, args
//   // 之前的时间戳
//   let old = 0 // 默认为0
//   return function () {
//     context = this
//     args = arguments
//     // 获取当前的时间戳
//     let now = new Date().valueOf()
//     if (now-old > wait) {
//       // 立即执行
//       func.apply(context, args)
//       old = now
//     }
//   }
// }

/**
 * 节流函数 -- 第一次不会触发，最后一次会触发
 */
// function trottle (func, wait) {
//   let context, args, timeout
//   return function () {
//     context = this
//     args = arguments
//     if (!timeout) {
//       timeout = setTimeout(() => {
//         timeout = null
//         func.apply(context, args)
//       }, wait)
//     }
//   }
// }

// /**
//  * 节流函数
//  * 第一次会触发，最后一次会触发
//  */
// function trottle (func, wait) {
//   let context, args, timeout
//   let old = 0 // 时间戳
//   let later = function () {
//     old = new Date().valueOf()
//     timeout = null
//     func.apply(context, args)
//   }
//   return function () {
//     context = this
//     args = arguments
//     let now = new Date().valueOf()
//     if (now - old > wait) {
//       if (timeout) {
//         clearTimeout(timeout)
//         timeout = null 
//       }
//       func.apply(context, args)
//       old = now
//     }

//     if (!timeout) {
//       timeout = setTimeout(later, wait)
//     }
//   }
// }
/**
 * 节流函数
 * 最终版本
 * 第一次不会触发，最后一次会调用 leading:false, trailing:true
 * 第一次会触发，最后一次不会触发 leading:true, trailing:false
 */
function trottle (func, wait, options) {
  let context, args, timeout, result
  let old = 0 // 时间戳
  if (!options) options = {} 
  let later = function () {
    old = new Date().valueOf()
    timeout = null
    result = func.apply(context, args)
  }
  let trottled = function () {
    context = this
    args = arguments
    let now = new Date().valueOf()
    if (options.leading === false  && !old) {
      old = now;
    }
    if (now - old > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null 
      }
      result = func.apply(context, args)
      old = now
    }

    if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, wait)
    }
    return result
  }
  trottled.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return trottled
}
let count = 0
let container = document.querySelector('#container')
let btn = document.querySelector('#btn')

function doSomething(e) {
  console.log(e);
  console.log(this);
  container.innerHTML = count++;
};

let doSome = trottle(doSomething, 3000, {
  leading:true, 
  trailing:true
});

btn.onclick = function () {
  doSome.cancel()
};

container.onmousemove = doSome
