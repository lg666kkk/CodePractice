// IIFE: 匿名函数自调用

(function () {
  let msg = "ddd"
  function foo () {
    console.log("foo", msg);
  }
  // 必须把foo暴露出来
  window.module3 = {
    foo
  }
})()
