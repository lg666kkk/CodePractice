# bind详解

## 什么是bind

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

## 语法

```javascript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

### 参数

1. thisArg

- 调用绑定函数时作为 `this` 参数传递给目标函数的值。 如果使用[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)运算符构造绑定函数，则忽略该值。当使用 `bind` 在 `setTimeout` 中创建一个函数（作为回调提供）时，作为 `thisArg` 传递的任何原始值都将转换为 `object`。如果 `bind` 函数的参数列表为空，执行作用域的 `this` 将被视为新函数的 `thisArg`。

2. `arg1, arg2, ...`

- 当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

### 返回值

返回一个原函数的拷贝，并拥有指定的 **this** 值和初始参数

## bind特点

1. bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this(js的this是动态的，改变this有三种方式call,apply,bind)，之后的一序列参数将会在传递的实参前传入作为它的参数。

2. 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被略，同时调用时的参数被提供给模拟函数。

## mdn的Polyfill

Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能。

比如说 polyfill 可以让 IE7 使用 Silverlight 插件来模拟 HTML Canvas 元素的功能，或模拟 CSS 实现 rem 单位的支持，或 [`text-shadow`](https://developer.cdn.mozilla.net/zh-CN/docs/Web/CSS/text-shadow)，或其他任何你想要的功能

Poly表示可以使用多种技术来解决它-它不仅限于使用JavaScript完成，而且fill会填补浏览器中需要该技术的空白。它也不意味着“旧的浏览器”（因为我们也需要填充新的浏览器）

### 代码如下

```javascript
if (!Function.prototype.bind) {
     //防止Function.prototype.bind.call(obj,param)这种调用改变this
   Function.prototype.bind = function(oThis) {
     if (typeof this !== 'function') {
       throw new TypeError('Function.prototype.bind - what is trying to be bound is not 			callable');
     }
     var aArgs   = Array.prototype.slice.call(arguments, 1),
         fToBind = this,
         fNOP    = function() {},
         fBound  = function() {
           // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
           return fToBind.apply(this instanceof fBound
                  ? this
                  : oThis,
                  // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                  aArgs.concat(Array.prototype.slice.call(arguments)));
         };
     // 维护原型关系
     if (this.prototype) {
       // 当执行Function.prototype.bind()时, this为Function.prototype 
       // this.prototype(即Function.prototype.prototype)为undefined
       fNOP.prototype = this.prototype; 
     }
     // 下行的代码使fBound.prototype是fNOP的实例,因此
     // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的		实例
     fBound.prototype = new fNOP();
     return fBound;
  };}

```

[polyfill相关文章](https://remysharp.com/2010/10/08/what-is-a-polyfill)

## 词法作用域

==JavaScript 采用的是词法作用域(静态的作用域)，函数的作用域在函数定义的时候就决定了==(一个函数先定义后执行，定义的时候什么都不干，但是已经锁定了其词法作用域，执行的时候有执行机上下文，会用到已经定义的词法作用域)

而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的

```java
 var value = 1;
 function foo() {
     console.log(value);
 }
 function bar() {
     var value = 2;
     foo();
 }
 bar();
```

-  假设JavaScript采用静态作用域，让我们分析下执行过程：
  - 执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

- 假设JavaScript采用动态作用域，让我们分析下执行过程：
  - 执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。

前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1

## 执行顺序

```javascript
// 赋值式函数
var foo = function () {
     console.log('foo1');
 }
 foo();  // foo1
 var foo = function () {
     console.log('foo2');
 }
 foo(); // foo2
```

然而去看这段代码：

```javascript
// 声明式函数
function foo() {
     console.log('foo1');
 }
 foo();  // foo2
 function foo() {
     console.log('foo2');
 }
 foo(); // foo2
```



可执行代码(executable code)的类型:全局代码、函数代码、eval代码。

举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。

### 补充

**事实上，JS的解析过程分为两个阶段：预编译期(预处理)与执行期**

预编译期JS会对本代码块中的所有声明的变量和函数进行处理（类似与C语言的编译），但需要注意的是此时处理函数的只是**声明式函数**，而且变量也只是进行了声明但未进行初始化以及赋值

```javascript
//例子1
<script type="text/javascript">
   Fn(); //执行了定义式函数
   function Fn(){
    alert("执行了定义式函数");
   }
</script>
```

```javascript
// 例子2
<script type="text/javascript">
   Fn(); //报错，提示函数未定义
  var Fun= function(){
    alert("执行了赋值式函数");
   }
</script>
```

```javascript
// 例子3
//因为在js中重名的函数，后定义的会覆盖前面定义的函数，这种策略和js的顺序执行也是有关系的
<script type="text/javascript">
   Fn(); //它执行的结果是：弹出"执行了函数2"
   function Fn(){
    alert("执行了函数1");
   }
   function Fn(){
    alert("执行了函数2");
   }
</script>
```

### **执行上下文栈**

```javascript
//单个函数执行的时候有执行机上下文，多个函数执行的时候有执行上下文栈 
function fun3() {
    console.log('fun3')
 }
 function fun2() {
     fun3();
 }
 function fun1() {
     fun2();
 }
 fun1();
// 伪代码
// fun1()ECStack.push(<fun1> functionContext); -- fun1进栈
// fun1中竟然调用了fun2，还要创建fun2的执行上下文ECStack.push(<fun2> functionContext); -- fun2进栈
// 擦，fun2还调用了fun3！ECStack.push(<fun3> functionContext); -- fun3进栈
// fun3执行完毕ECStack.pop(); -- fun3出栈
// fun2执行完毕ECStack.pop(); -- 。。
// fun1执行完毕ECStack.pop(); -- 。。
// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```

## 变量对象

对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)

- 作用域链(Scope chain)
-  this

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明

### 全局上下文

​	全局上下文中的变量对象就是全局对象！

### 函数上下文

- 在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。

- 活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。

- 活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。(只有函数才具有arguments )

## 执行过程

1. 进入执行上下文

2. 代码执行

### 进入执行上下文

当进入执行上下文时，这时候还没有执行代码，

变量对象会包括：

1. 函数的所有形参 (如果是函数上下文)

   - 由名称和对应值组成的一个变量对象的属性被创建
   - 没有实参，属性值设为 undefined

2. 函数声明

   - 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建

   - 如果变量对象已经存在相同名称的属性，则完全替换这个属性

3. 变量声明

   - 由名称和对应值（undefined）组成一个变量对象的属性被创建；
   -  如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

```java
function foo(a) {
    var b = 2;
    function c() {}
    var d = function() {};

    b = 3;

}
foo(1);
```

在进入执行上下文后，这时候的 AO 是

```javascript
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){}, // 函数提升
    d: undefined
}
```

### 代码执行

在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值

还是上面的例子，当代码执行完后，这时候的 AO:

```javascript
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

## 作用域链

1. 查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链
2. **函数的作用域在函数定义的时候就决定了!!!!!!**
3. 这是因为函数有一个内部属性 [[scope]] (双括号表示引擎内部的变量)，当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！

```javascript
function foo() {
    function bar() {
        ...
    }
}
```

函数创建时，各自的[[scope]]为：

```javascript
//scope可以理解为函数在创建时的一个属性
foo.[[scope]] = [
    globalContext.VO // -- globalContext位于栈底，Vo里存放变量，这就是所有函数为什么能够拿到window变量的原因
];

bar.[[scope]] = [
    fooContext.AO,// bar套在foo中，所以能拿到foo的AO，(定义bar的时候,foo已经执行了)
    globalContext.VO // window的AO与VO相同，不需要激活
];
```

详见下面的例子 -- 图片中只展示出来了层级关系

```javascript
function foo() {
    var a = 10
    function bar() {
        var b = 20
        console.dir(bar)
    }
    bar()
}
foo()
console.dir(foo)
```

![](E:\GitResort\CodePractice\笔记\img\Snipaste_2020-04-26_18-47-19.PNG)

![](E:\GitResort\CodePractice\笔记\img\Snipaste_2020-04-26_18-47-35.PNG)

### 函数激活

当函数激活时(激活通俗的理解就是执行)，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。

这时候执行上下文的作用域链，我们命名为 ScopeChain

```javascript
ScopeChain = [AO].concat([[Scope]]);
```

至此，作用域链创建完毕

## this

其实很复杂，简单来说是**谁调用指向谁**

### 具体执行分析

```javascript
 var scope = "global scope";
 function checkscope(){
     var scope = "local scope";
     function f(){
         return scope;
     }
     return f();
 }
 checkscope();
```

1. 执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈

```javascript
ECStack = [
   globalContext
];
```

2. 全局上下文初始化

```javascript
globalContext = {
    VO: [global],
    Scope: [globalContext.VO],
    this: globalContext.VO
}
```

3. 初始化的同时，checkscope函数被创建，保存作用域链到函数的内部属性[[scope]]

```javascript
checkscope.[[scope]] = [
    globalContext.VO
];
```

4. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈

```javascript
ECStack = [
      checkscopeContext,
      globalContext
];

```

5. checkscope 函数执行上下文初始化：

```javascript
复制函数 [[scope]] 属性创建作用域链，
用 arguments 创建活动对象，
初始化活动对象，即加入形参、函数声明、变量声明，
将活动对象压入 checkscope 作用域链顶端。
同时 f 函数被创建，保存作用域链到 f 函数的内部属性[[scope]]

checkscopeContext = {
         AO: {
             arguments: {
                 length: 0
             },
             scope: undefined,
             f: reference to function f(){}
         },
         Scope: [AO, globalContext.VO], //ScopeChan
         this: undefined
}
```

6. 执行 f 函数，创建 f 函数执行上下文，f 函数执行上下文被压入执行上下文栈

```javascript
ECStack = [
       fContext,
       checkscopeContext,
       globalContext
];

```

7. f 函数执行上下文初始化, 以下跟第 4 步相同:

```javascript
复制函数 [[scope]] 属性创建作用域链
用 arguments 创建活动对象
初始化活动对象，即加入形参、函数声明、变量声明
将活动对象压入 f 作用域链顶端

fContext = {
         AO: {
             arguments: {
                 length: 0
            }
        },
        Scope: [AO, checkscopeContext.AO, globalContext.VO],
        this: undefined
}

```

8. f 函数执行，沿着作用域链查找 scope 值，返回 scope 值

9. f 函数执行完毕，f 函数上下文从执行上下文栈中弹出
10. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出

```javascript
ECStack = [
        globalContext
];

```

## 闭包

### 定义

闭包是指那些能够访问自由变量的函数（MDN）、闭包是指有权访问另外一个函数作用域中的变量的函数（红宝书p178）、《JavaScript权威指南》中就讲到：从技术的角度讲，所有的JavaScript函数都是闭包。

从实践角度：以下函数才算是闭包：

1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）

2. 在代码中引用了自由变量

### 例子

```javascript
var scope = "global scope";
function checkscope(){
     var scope = "local scope";
     function f(){
         return scope;
     }
     return f;
}
var foo = checkscope();
foo();
```

这里直接给出简要的执行过程：

- 进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈
- 全局执行上下文初始化
- 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
- checkscope 执行上下文初始化，创建变量对象、作用域链、this等
- checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
- 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
- f 执行上下文初始化，创建变量对象、作用域链、this等
- f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

了解到这个过程，我们应该思考一个问题，那就是:

当 f 函数执行的时候，checkscope 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出)，怎么还会读取到 checkscope 作用域下的 scope 值呢？

我们知道 f 执行上下文维护了一个作用域链：

```javascript
fContext = {
     Scope: [AO, checkscopeContext.AO, globalContext.VO],
}
```

## **call和apply的模拟实现**

call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法

```javascript
Function.prototype.call2 = function (context) {
     var context = context || window;
     context.fn = this;
     var args = [];
     for(var i = 1, len = arguments.length; i < len; i++) {
         args.push('arguments[' + i + ']');
     }
     var result = eval('context.fn(' + args +')');
     delete context.fn
     return result;
}

Function.prototype.apply = function (context, arr) {
     var context = Object(context) || window;
     context.fn = this;
     var result;
     if (!arr) {
         result = context.fn();
     }
     else {
         var args = [];
         for (var i = 0, len = arr.length; i < len; i++) {
             args.push('arr[' + i + ']');
         }
         result = eval('context.fn(' + args + ')')
     }
     delete context.fn
     return result;
}

```

## new

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

```javascript
function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
};
function Otaku (name, age) {
    this.name = name;
     this.age = age;
 
     this.habit = 'Games';
 }
 Otaku.prototype.strength = 60;
 Otaku.prototype.sayYourName = function () {
     console.log('I am ' + this.name);
}
var person = objectFactory(Otaku, 'Kevin', '18')
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60
console.log(person.age) // 18
console.log(person.sayYourName())//I am Kevin

```

## 柯里化

在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

```javascript
//乞丐版：完整版很深
var curry = function (fn) {
     var args = [].slice.call(arguments, 1);
     return function() {
         var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};
function add(a, b) {
    return a + b;
}
var addCurry = curry(add, 1, 2);
addCurry() // 3//或者var addCurry = curry(add, 1);addCurry(2) // 3//或者var addCurry = curry(add);addCurry(1, 2) // 3

```

## **继承**

```javascript
function Rectangle(length,width){
    this.l = length
    this.w = width
}
Rectangle.prototype.getArea = function(){
     return this.l*this.w
}
function Square(length){
    Rectangle.call(this,length,length)
}
Square.prototype = Object.create(Rectangle.prototype,{
     constructor:{
     	value:Square
    }
}) // 相当于Rectangle.prototype.constructor = Square
var square = new Square(3)
console.log(square.getArea())
console.log(square instanceof Square)
console.log(square instanceof Rectangle)
```

## 原型链

![1587983972640](C:\Users\bihi\AppData\Roaming\Typora\typora-user-images\1587983972640.png)

爸爸的父亲等于妈妈的老公？？？

## 后续

![1587985219960](C:\Users\bihi\AppData\Roaming\Typora\typora-user-images\1587985219960.png)

bind()创建的function上没有prototype/箭头函数上也没有prototype

![](E:\GitResort\CodePractice\笔记\img\Snipaste_2020-04-27_19-04-41.PNG)

