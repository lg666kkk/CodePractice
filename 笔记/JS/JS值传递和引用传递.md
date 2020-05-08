# JS值传递和引用传递

首先，JS中数据类型分为两大类：基本数据类型和引用数据类型

基本数据类型：Number, String, Boolean, Null, Undefined, Bigint

引用数据类型： Object, Symbol

## 基本类型和引用类型的区别

- 基本类型的变量保存的是变量值，引用类型的变量保存的是内存地址
- 基本类型在赋值的时候拷贝值，引用类型在赋值的时候只拷贝地址，不拷贝值
- 基本类型长度固定，在内存中占据固定大小的空间，数据存放在栈内存中；引用类型可以给对象添加属性和方法，长度不固定，数据存放在堆内存中。引用类型的存储需要栈区和堆区（堆区是指内存里的堆内存）共同完成，栈区内存保存变量标识符和指向堆内存中该对象的指针，也可以说是该对象在堆内存的地址

## 基本类型与引用类型的复制

### 基本类型的复制

```javascript
let num1 = 5
let num2 = num1
```

![](E:\GitResort\CodePractice\笔记\img\1215304877-5a5853527a7e8_articlex.png)

### 引用类型的复制

```javascript
let obj1 = {}
let obj2 = obj1
```

![](E:\GitResort\CodePractice\笔记\img\3037351122-5a585368920e8_articlex.png)

## JS中的传值方式

在JS高程中有这样一句话：==ECMAScript中的所有参数传递的都是值，不可能通过引用传递参数==(也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。基本类型的传递如同基本类型的复制一样，而引用类型值的传递，如同引用类型变量的复制一样)

==这也就是说JS中所有的函数的参数都是按值传递的==

==基本类型传的是值本身（因为直接把值存在栈内），引用类型传的是对象在内存里面的地址 （因为复杂对象存在堆内，所以在栈里存对象所在的堆地址）==。

```javascript
function addTen(num) {
   num = num + 10;
   return num;
}
var count = 20;
var result = addTen(count);
console.log(count); // 20
console.log(result); // 30
```

```javascript
function setName(obj){
   obj.name = 'xxx';
   obj = {name: 'ppp'}; // obj指向一个新的地址，与person不再指向同一个地址
   console.log(obj.name); // 'ppp'
}
const person = {name : 'oo'};
setName(person);
console.log(person.name); // ‘xxx’
```

