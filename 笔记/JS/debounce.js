/**
 * 防抖函数的自定义实现
 * @param func 执行的函数
 * @param wait 等待的时间
 * @param immediate 是否立即执行
 */
function debounce (func, wait, immediate) {
  // result -- 返回值
  let timeout, result;
  let debounced = function () {
    let self = this
    let args = arguments
    clearTimeout(timeout)
    if (immediate) {
      // callNow是立即执行的变量
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      // 由于最开始timeout为undefined,取反为true,故立即执行
      if (callNow) result = func.apply(self, args)
    } else {
      // 不会立即执行
      timeout = setTimeout(function() {
        //解决执行函数内部this指向问题以及event指向问题
        result = func.apply(self, args)
      }, wait)
    }
    return result
  }
  // 取消
  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null // 防止内存泄露
  }
  return debounced
}

let count = 0
let container = document.querySelector('#container')
let btn = document.querySelector('#btn')

function doSomething(e) {
  console.log(e);
  console.log(this);
  container.innerHTML = count++;
  return 'wwww'
};

let doSome = debounce(doSomething, 1000, true);

btn.onclick = function () {
  doSome.cancel()
};

container.onmousemove = doSome
