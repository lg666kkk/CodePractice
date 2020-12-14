# JS原型与原型链

## \[\[Prototype\]\]

**==JS中的对象有一个特殊的\[\[Prototype\]\]内置属性。其实就是对于其他对象的引用。几乎所有的对象在创建[\[Prototype\]\]属性时会被赋予一个非空值==**

## 使用构造函数创建对象

```javascript
function Person () {}
var person1 = new Person()
person.name = "name"
```

在这个例子中，Person就是一个构造函数，我们使用new创建了一个实例对象person

### Prototype

每个函数都有一个prototype属性,函数的prototype属性指向了一个对象，这个对象正是调用该构造函数而创建的**实例**的原型,即==**person的原型**==

那么什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性

![](E:\Typra文档\img\Snipaste_2020-12-10_21-14-59.PNG)

### \_\_proto\_\_

这是每一个JavaScript对象(除了null)都具有的一个属性，叫\_\_proto_\_，这个属性会指向该对象的原型。

![](E:\Typra文档\img\Snipaste_2020-12-10_21-16-32.PNG)

### constructor

每个原型都有一个constructor属性指向关联的构造函数

![](E:\Typra文档\img\Snipaste_2020-12-10_21-19-00.PNG)

![](E:\Typra文档\img\Snipaste_2020-12-10_21-19-34.PNG)

### 实例与原型

![](E:\Typra文档\img\Snipaste_2020-12-10_21-20-38.PNG)

![](E:\Typra文档\img\Snipaste_2020-12-10_21-21-31.PNG)

![Snipaste_2020-12-10_21-21-40](E:\Typra文档\img\Snipaste_2020-12-10_21-21-40.PNG)

### 原型链

![](E:\Typra文档\img\Snipaste_2020-12-10_21-26-42.PNG)

![Snipaste_2020-12-10_21-26-49](E:\Typra文档\img\Snipaste_2020-12-10_21-26-49.PNG)

### 补充

![](E:\Typra文档\img\Snipaste_2020-12-10_21-27-57.PNG)

