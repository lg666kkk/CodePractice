// IIFE增强模式: 引入依赖

(function (window, $) {
  let msg = "kkk"
  function foo () {
    console.log("foo()", msg);
  }
  window.module4 = foo
  $('body').css("red") // 引入Jquery依赖
})(window, Jquery)
