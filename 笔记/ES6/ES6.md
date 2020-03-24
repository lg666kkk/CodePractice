## ES6笔记
### 一、let命令
1. 不存在变量提升，具有暂时性死区，具有块级作用域
```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
// 使用var定义的话最后输出10
```
2. ES6 允许块级作用域的任意嵌套。内层作用域可以定义外层作用域的同名变量
#### 块级作用域与函数声明
1. ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错
2. ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用
3. ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
```javascript
// ES5环境运行得到结果 I am inside
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}());
/**
 * // 以上代码相当于下面代码(if内声明的函数f会被提升到函数头部)
function f() { console.log('I am outside!'); }
(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());
*/
```
```javascript
// 浏览器的 ES6 环境,本应该输出I am outside!，但是会报错
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}());
// Uncaught TypeError: f is not a function
/**
 * // 上面代码相当于下面代码
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }
  f();
}());
// Uncaught TypeError: f is not a function
*/
/**
 * 原因：原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
 *  1. 允许在块级作用域内声明函数。
    2.函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
    3. 函数声明还会提升到所在的块级作用域的头部。
*/
```
### 二、const命令
1. const声明一个只读的常量。一旦声明，常量的值就不能改变
2. const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
3. const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动
4. const声明的常量，也与let一样不可重复声明
5. **对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了**
```javascript
/*
常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。
*/
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```
6. 冻结对象 -- `Object.freeze()`
   - 冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值
   - 冻结一个对象后该对象的原型也不能被修改
```javascript
//常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```
6. 将对象彻底冻结的函数
```javascript
var constantize = (obj) => {
  Object.freeze(obj);
   /**
    * 1. Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
    *      数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 
  */
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```
```javascript
//Object.keys()用法
let obj = {"a": 1, "b": 3}
  Object.keys(obj).forEach((key, index)=>{
    console.log(key + '---' + index);// a --- 0    b --- 1
    console.log(key + '---' + obj[key]); // a --- 1  b --- 3
    console.log(typeof obj[key]); // number
  })
```
#### ES6声明变量的六种方法
1. var命令(ES5也可以用)
2. function命令(ES5也可以用)
3. let命令
4. const命令
5. import命令
6. class命令
#### 顶层对象的属性
1. JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域）
2. 顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象,浏览器和 Web Worker 里面，self也指向顶层对象
   - window对象：全局变量是window对象的属性，全局函数是window对象的方法，所有JavaScript全局对象、函数以及变量均自动成为window对象的成员
3. ES5 之中，顶层对象的属性与全局变量是等价的。
4. 顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。
      - 没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）
      - 很容易不知不觉地就创建了全局变量（比如打字出错）
      - 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
      - window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。
```javascript
window.a = 1;
a // 1

a = 2;
window.a // 2
```
5. ES6规定
   - var命令和function命令声明的全局变量，依旧是顶层对象的属性
   - let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性
   - 从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```
#### 顶层对象和this的关系
同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性
1. 全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。
2. 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
3. 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用。
4. ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。(node12+中才可以使用)
#### 在没有引入globalThis时，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。
> 说实话，我没看懂下面的代码
```javascript
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```
