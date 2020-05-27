# JS作用域

## JS作用域内部原理

### JS作用域分类

- 全局作用域
- 函数作用域

### 内部原理

内部原理分成5步：**编译、执行、查询、嵌套、异常**

编译阶段：边解释边执行

## 编译阶段

编译过程就是编译器把程序分解成词法单元，将词法单元解析成AST，再把AST转换成机器指令，等待执行的过程

```javascript
  var a = 2;
  // 1.1 分词：
  // 词法单元 ：var, a, =, 2, ;
  /*
    {
      "var":"keyword", // 关键字
      "a" : "indentifier", // 标识符
      "=" : "assignment", // 分配
      "2" : "interger" // 整数
      ";" : "eos" // end of state, 结束语句
     }
  */
  // 1.2解析
  // 解析成抽象语法树(AST Abstract Snatax Tree)
     
  // 1.3代码生成： 将AST转换成可执行代码的过程,转换成一组机器指令 var a = 2
```

## 执行阶段

执行阶段：

- 引擎首次运行代码时，首先查找作用域，看是否在当前的作用域下，如果是，引擎会直接使用这个变量，如果否，引擎会继续查找该变量
- 如果找到了变量，就会将当前值赋给变量，否则抛出异常

## 查询

1. **LHS查询/RHS查询**

   变量出现在复制操作的左边是进行LHS查询，出现在右边就是进行RHS查询

2. 区别：

   - 如果RHS 查询在所有嵌套的作用域中遍寻不到所需的变量，引擎就会抛出ReferenceError异常

   - 当引擎执行LHS 查询时，如果在顶层（全局作用域）中也无法找到目标变量，全局作用域中就会创建一个具有该名称的变量，并将其返还给引擎，前提是程序运行在非“严格模式”下(严格模式下变量必须先声明再赋值)。

```java
var a = 2;
function foo (a) {
    console.log(a);
}
foo(a)
// 1. foo()对foo函数对象进行RHS引用
// 2. 函数传参a=2对a进行了LHS引用 
// 3. console.log(a) 对console对象进行了RHS传值, 并检查console中是否有log()方法
// 4. console.log(a) 对a进行RSH引用，并把得到的值传给了console.log(..)
```

## 嵌套

==所谓的嵌套就是作用域变量的查找机制==

```javascript
 // 在当前作用域下无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，知道找到该对象，或者抵达全局作用域为止
function foo (a) {
    //console.log(a + b); // 5
    function f () {
        console.log(a + b) // 5
    }
}
var b = 3
foo(2)
```

## 异常

```javascript
// LSH错误
function fn (a) {
    a = b
}
fn(4) // Uncaught ReferenceError: b is not defined
```

```javascript
// RSH错误
function fn2() {
    var b = 0
    b()
}
fn2() // Uncaught TypeError: b is not a function
```

```javascript
function fn () {
    a = 1 // 在函数作用域中没有找到a的声明，会去全局找，全局找不到，会声明一个
}
fn()
console.log(a); // 1
```

## 词法作用域

就是说作用域是由代码里函数声明时决定的,你在哪里声明,他所在的执行上下文就被决定了,通过词法作用域才可以预测代码在执行过程中如何查找标识符

==JS中只有词法作用域，没有动态作用域==

## 遮蔽效应

作用域查找从运行时所处的最内部作用域开始，逐级向上进行查找，直到遇到第一个匹配的标识符为止

==在多层的嵌套作用域中，可以定义同名标识符，这叫做遮蔽效应==

```javascript
// 遮蔽效应
var a = 0
function test (a) {
     a = 2 
    console.log(a);// 2
}
test(a)
```

```javascript
// 注意这种情况
var a = 0
function test (a) {
    console.log(a);
    a = 2
}
test(a)
```

## 变量的声明提升

预解释(变量的提升)

```javascript
console.log(a)
var a = 2
// --------
// 以上代码相当于
var a;
console.log(a) // undefined
a = 2
```

```javascript
console.log(a); // undefined
var a = 0
function fn () {
    // 只能在当前作用域进行变量提升
    console.log(b); // undefined
    var b = 1
    function test () {
        console.log(c); // undefined
        var c = 2
        }
    test()
}
fn()
```

## 函数声明提升

声明式函数可以提升

函数表达式不可以提升

### 注意

```javascript
// 变量的声明优先于函数声明，函数声明会覆盖未定义的同名变量
var a;
function a () {}
console.log(a) // f a(){}
// ---------------------
// 注意以下情况
var a = 10
function a () {}
console.log(a) // 10
/*
// 相当于
var a;
function a () {}
a = 10 
console.log(a) // 10
*/
```

1. 变量的重复声明是无用的，但是函数的重复声明会覆盖前面的声明(无论是函数声明还是变量声明)

   ```javascript
   var a;
   a = 1
   var a
   console.log(a) // 1
   ```

2. 函数的声明提升优先级高于变量的声明提升

3. 声明式函数，后面的函数声明会覆盖前面的函数声明

4. ==应该避免在同一作用域中重复声明==

## 作用域链

### 作用域

作用域是一套规则，用来确定在何处以及如何查找标识符。

**在js中作用域分为全局作用域和函数作用域，另外函数作用域可以互相嵌套**

![](E:\Typra文档\img\Snipaste_2020-05-18_10-32-26.PNG)

### 作用域链

==各个作用域的嵌套关系组成了一条作用域链。==例子中bar函数的作用域链式bar->fn>全局，fn函数保存的作用域链式fn->全局

 使用作用域链主要是进行标识符(变量和函数)的查询，标识符(变量和哈数)解析就是沿着作用域链一级一级地搜索标识符的过程，而作用域链就是保证对变量和函数的有序访问。

- 如果自身作用域中声明该变量，则无需使用作用域链

  ```javascript
  // 在下面的例子中，如果要在bar函数中查询变量a，则直接使用LHS查询，赋值为100即可
  var a = 1;
  var b = 2;
  function fn(x){
      var a = 10;
      function bar(x){
          var a = 100;
          b = x + a;
          return b;
      }
      bar(20);
      bar(200);
  }
  fn(0);
  ```

  

- 如果自身作用域中未声明该变量，则需要使用作用域链进行查找

  + 这时，就引出了另一个概念——自由变量。**==在当前作用域中存在但未在当前作用域中声明的变量叫自由变量==**

  + 一旦出现自由变量就肯定会出现作用域链，再根据作用域链的查找机制，查找到对应的变量

  + 在下面的例子中，如果要在bar函数中查询变量b，由于b并没有在当前作用域中声明，所以b是自由变量。bar函数的作用域链是bar -> fn -> 全局。到上一级fn作用域中查找b没有找到，继续到再上一级全局作用域中查找b，找到了b。
  
    ```javascript
    var a = 1;
    var b = 2;
    function fn(x){
        var a = 10;
        function bar(x){
            var a = 100;
            b = x + a;
            return b;
        }
        bar(20);
        bar(200);
    }
    fn(0);
    //如果标识符找不到，则抛出ReferenceError(引用错误)异常。
    ```

## 执行环境和执行流

### 执行环境

==执行环境(execution context) 也叫执行上下文、执行上下文环境==

每个执行环境都有一个与之关联的变量对象(variable object),环境中定义的所有变量和函数都保存在这个对象中。		

 ```javascript
var a = 1
var b = 2
function fn (x) {
    var a = 10
    function bar (x) {
        var a = 100
        b = x + a
        return b
    }
    bar(20)
    console.log(b);
    bar(200)
    console.log(b);
}
fn(0)
 ```

![](E:\Typra文档\img\Snipaste_2020-05-18_10-53-44.PNG)

![](E:\Typra文档\img\Snipaste_2020-05-18_11-20-45.PNG)

### 执行流

**代码的执行顺序**叫做执行流，程序源代码并不是按照代码的书写顺序一行一行往下执行，而是和函数的调用顺序有关

```javascript
var a = 1
var b = 2
function fn (x) {
    var a = 10
    function bar (x) {
        var a = 100
        b = x + a
        return b
    }
    bar(20)
    console.log(b);
    bar(200)
    console.log(b);
}
fn(0)
// 例子中的执行流是：第1行 ->第2行->第3行->第15行 ->第4行->第5行->第10行 ->第6行->第7行->第8行 ->第9行->第11行->第12行 ->第6行->第7行->第8行 ->第9行->第13行->第14行
```

## 执行环境栈

[原文文档]([https://book.apeland.cn/details/402/#%E4%BD%9C%E7%94%A8%E5%9F%9F](https://book.apeland.cn/details/402/#作用域))

 执行环境栈类似于作用域链，有序地保存着当前程序中存在的执行环境。当执行流进入一个函数时，函数的环境会被**压入一个环境栈中**。而在函数执行之后，**栈将其环境弹出**，把控制权返回给之前的执行环境。javascript程序中的执行流正是由这个机制控制。

```javascript
var a = 1
var b = 2
function fn (x) {
    var a = 10
    function bar (x) {
        var a = 100
        b = x + a
        return b
    }
    bar(20)
    console.log(b);
    bar(200)
    console.log(b);
}
fn(0)
```

![](E:\Typra文档\img\Snipaste_2020-05-18_12-13-58.PNG)

![](E:\Typra文档\img\Snipaste_2020-05-18_12-22-49.PNG)

==**整个执行流程如下**==

![](E:\Typra文档\img\11.png)

​						【1】代码执行刘进入全局执行环境，并对全局执行环境中的代码进行**声明提升**

​						![](E:\Typra文档\img\12.png)

​						【2】执行流执行第1行代码`var a = 1;`,对a进行LHS查询，对a赋值；执行流执行第2行代码`var b = 2;`								对b进行LHS查询，给b赋值2。

​							![](E:\Typra文档\img\13.png)



![](E:\Typra文档\img\Snipaste_2020-05-18_13-02-13.PNG)

![](E:\Typra文档\img\Snipaste_2020-05-18_13-02-58.PNG)

![](E:\Typra文档\img\Snipaste_2020-05-18_13-03-16.PNG)

![Snipaste_2020-05-18_13-03-30](E:\Typra文档\img\Snipaste_2020-05-18_13-03-30.PNG)

![Snipaste_2020-05-18_13-03-42](E:\Typra文档\img\Snipaste_2020-05-18_13-03-42.PNG)

![Snipaste_2020-05-18_13-03-50](E:\Typra文档\img\Snipaste_2020-05-18_13-03-50.PNG)

![Snipaste_2020-05-18_13-03-58](E:\Typra文档\img\Snipaste_2020-05-18_13-03-58.PNG)

## 总结

1. 在javascript中，除了全局作用域外，每个函数都会创建自己的作用域，**作用域在函数定义的时候就已经确定了，与函数是否被调用无关**。通过作用域，可以知道作用域范围内的变量和函数有哪些，却不知道变量的值是什么。所以作用域是静态的。
2. 对于函数来说，执行上下文环境在函数调用时确定的，执行上下文环境包含了作用域内所有的变量和函数的值。在同一个作用域下，不同的调用(如上面的bar(20)和bar(200)的调用)会产生不同的执行上下文环境，从而产生不同的变量和值。所以执行上下文环境是动态的