# this指向问题

## this的绑定规则

### 默认绑定

什么情况下使用默认绑定呢？ ---- 独立函数调用

- 独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用

==**this默认指向window**==

```javascript
// 1. 全局环境下的this指向window
console.log(this); // window
// 2. 函数独立调用时，函数内部的this也指向window
function fn() {
    console.log(this);
}
fn(); // window
// 3.被嵌套的函数独立调用时，this默认指向window
let a = 1;
let obj = {
    a: 2,
    foo: function () {
        // 函数当做对象的方法来调用，this指向obj
        let self = this;
        function test() {
            console.log(self.a); // 2
            console.log(this); //window
        }
        test();
    },
};
obj.foo();
// 3.1 函数调用链（一个函数又调用另外一个函数）
function test1() {
  console.log(this); // window
  test2();
}

function test2() {
  console.log(this); // window
  test3()
}

function test3() {
  console.log(this); // window
}
test1();

// 4.IIFE 自执行函数
var b = 10;
function foo1() {
    console.log(this); // obj1
    // (function test () {
    //   console.log(this); // window
    //   console.log(this.b); // 10
    // })();
    (function test (self) {
        console.log(self.b); // 20
    })(this);
}
var obj1 = {
    b: 20,
    foo1: foo1
};
obj1.foo1();

(function () {
    console.log(this); // window
})();
// 5. 闭包中的this默认指向window
var obj2 = {
    c:40,
    foo2: function () {
        var d = this.c
        return function test () {
            console.log('闭包中的this:' + this); // window
            return d
        }
    }
}
var f = obj2.foo2()
console.log(f()); // 40
// 6. 将函数作为参数传入到另一个函数中
function foo(func) {
  func()
}
function bar() {
  console.log(this); // window
}
foo(bar);
// 6.1 注意:在真正函数调用的位置，并没有进行任何的对象绑定，只是一个独立函数的调用,所以this仍然指向window
function foo(func) {
  func()
}
var obj = {
  name: "why",
  bar: function() {
    console.log(this); // window
  }
}
foo(obj.bar);
```

### 隐式绑定

1. 是通过某个对象进行调用的：
   - 也就是它的调用位置中，是通过某个对象发起的函数调用

2. 隐式绑定有一个前提条件：

   - 必须在调用的`对象内部`有一个对函数的引用（比如一个属性）；

   - 如果没有这样的引用，在进行调用时，会报找不到该函数的错误；

   - 正是通过这个引用，间接的将this绑定到了这个对象上

```javascript
function foo () {
    console.log(this.a); 
}
let obj = {
    a: 1,
    foo: foo,
    obj1: {
        a:2,
        foo: foo
    }
}
// foo()函数的直接对象(.前面的)是obj,this指向了这个直接对象
obj.foo() // 1
// foo()函数的直接对象(.前面的)是obj1,this指向了这个直接对象
obj.obj1.foo() // 2
// 注意点--------------------------------
// 我们通过obj2又引用了obj1对象，再通过obj1对象调用foo函数；
// 那么foo调用的位置上其实还是obj1被绑定了this；
function foo() {
  console.log(this); // obj1对象
}
var obj1 = {
  name: "obj1",
  foo: foo
}
var obj2 = {
  name: "obj2",
  obj1: obj1
}
obj2.obj1.foo();
```

### 隐式丢失

```javascript
// 隐式丢失:指被隐式绑定的函数丢失了绑定对象 从而默认绑定到了window
// 1. 函数别名导致隐式丢失
function foo () {
    console.log(this.a);
}
var a = 0
let obj = {
    a: 1,
    foo
}
/**
       * 把obj.foo赋值给别名bar,造成隐式丢失情况，bar与obj毫无关系
      */
var bar = obj.foo
bar() // 0
// 以上代码等价于
// var bar = function foo () {....}

// 2. 参数传递
var b = 11
function foo1 () {
    console.log(this.b);
}
function bar1 (fn) {
    fn()
}
var obj1 = {
    b: 12,
    foo1:foo1
}
// 把obj1.foo1当做参数传递到bar1函数中，有隐式的函数赋值(fn=obj1.foo1)，即会出现函数丢失的情况
bar1(obj1.foo1) // 11
/**
       * 以上代码相当于：
          var b = 11
          function bar1 (fn) {
            fn()
          }
          bar1(function foo1(){
            // this指向window
            console.log(this.a);
          })
      */

// 3.内置函数, setTimeout()/setInterval()中的第一个参数的回调函数中的this默认指向了window
// setTimeout(function(){
//   console.log(this); // window
// }, 1000);
var c = 22
function foo3 () {
    console.log(this.c); // 22
}
var obj3 = {
    c: 33,
    foo3: foo3
}
setTimeout(obj3.foo3, 1000)

// 4.间接调用
function foo4 () {
    console.log(this.dd);
}
var dd = 33
var obj4 = {
    dd: 44,
    foo4: foo4
}
var p = {dd: 55}
obj4.foo4() // 44
// 将obj4.foo4函数对象赋值给了p.foo5函数，然后立即执行，相当于仅仅是foo4函数的立即调用，this指向window
!(p.foo5 = obj4.foo4)() // 33
// 将obj.foo4赋值给了p.foo6函数, p.foo()函数再执行，其实是属于p对象的方法执行，this指向当前p对象
p.foo6 = obj4.foo4
p.foo6() // 55

// 5. 其他情况 -- this指向window
var ee = 88
var obj5 = {
    ee: 77,
    foo8: foo8
}
function foo8 () {
    console.log(this.ee);
}
!(obj5.foo8 = obj5.foo8)() // 88 -- this指向window
!(false || obj5.foo8)() // 88 -- this指向window
!(1, obj5.foo8)() // 88 -- this指向window
```

### 显示绑定

```javascript
// 显示绑定：使用bind(), apply(), call()把对象绑定到this上

// 硬绑定：是显示绑定的一种变形，使得this不能再被改变
var a = 0
function foo () {
    console.log(this.a);
}
var obj = {
    a: 2
}
var bar = function () {
    foo.call(obj)
}
bar() // 2
setTimeout(bar, 1000) // 2 
bar.call(window) // 2

// 数组的forEach(fn, 对象)/map() /filter() /some() /every() -- 具有显示绑定this,能改变当前回调函数中this指向
var id = 'window'
function fn (el) {
    console.log(el, this.id);
}
var obj1 = {
    id: 'fn'
}
~[1,2,3].forEach(fn) // 1 'window', 2 'window', 3 'window'
~[1,2,3].forEach(fn, obj1) // 1 'fn', 2 'fn', 3 'fn'
// setTimeout:setTimeout内部是通过apply进行绑定的this对象，并且绑定的是全局对象
setTimeout(function() {
  console.log(this); // window
}, 1000);
```

### new 绑定

使用new关键字来调用函数时，会执行如下的操作：

- 1.创建一个全新的对象；
- 2.这个新对象会被执行Prototype连接；
- 3.这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）；
- 4.如果函数没有返回其他对象，表达式会返回这个新对象

```javascript
// new 绑定
function fn () {
    // 如果是new 关键字来执行函数，相当于构造函数来是实例化对象，那么内部的this指向了当前实例化的对象
    console.log(this); // this指向fn(){}
}
let fn1 = new fn()
console.log(fn1); // this指向fn(){}

function fn2 () {
    console.log(this); // this指向fn2(){}，即this指向当前的实例对象
    // 使用return关键字返回对象时，实例化后的对象的this指向return返回的对象
    return {
        name: 'lg'
    }
}
let f = new fn2()
console.log(f); // f的this指向{name: 'lg'}

var person =  {
    fav: function () {
        return this
    }
}
console.log(person.fav()); // this指向person对象
var p = new person.fav() 
console.log(p, p===person); // p指向fav, false
```

### 规则优先级

1.  **默认规则的优先级最低**

   - 毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this

2.  **显示绑定优先级高于隐式绑定**

   ```javascript
   function foo() {
     console.log(this);
   }
   
   var obj1 = {
     name: "obj1",
     foo: foo
   }
   
   var obj2 = {
     name: "obj2",
     foo: foo
   }
   
   // 隐式绑定
   obj1.foo(); // obj1
   obj2.foo(); // obj2
   
   // 隐式绑定和显示绑定同时存在
   obj1.foo.call(obj2); // obj2, 说明隐式绑定优先级更高
   ```

3.  **new绑定优先级高于隐式绑定**

   ```javascript
   function foo() {
     console.log(this);
   }
   
   var obj = {
     name: "why",
     foo: foo
   }
   
   new obj.foo(); // foo对象, 说明new绑定优先级更高
   ```

4.  **new绑定优先级高于bind**

   - new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高

   - 但是new绑定可以和bind一起使用:

     ```javascript
     function foo() {
       console.log(this);
     }
     
     var obj = {
       name: "obj"
     }
     
     // var foo = new foo.call(obj);
     var bar = foo.bind(obj);
     var foo = new bar(); // 打印foo, 说明使用的是new绑定
     ```

### 严格模式下的this指向

```javascript
// 严格模式下this的指向
// 1. 独立调用的函数内部的this指向了undefined
function fn () {
    'use strict'
    console.log(this); // undefined
}
fn()
// 2. 在严格模式下，函数apply()和call()内部的this始终是它们的第一个参数
var color = 'blue'
function f () {
    'use strict'
    console.log(this); // null
    console.log(this.color);
}
f.call(null) // 报错，在严格模式下，call中传入什么，this就是什么
```

### 忽略显示绑定

如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则：

```javascript
function foo() {
  console.log(this);
}

var obj = {
  name: "why"
}

foo.call(obj); // obj对象
foo.call(null); // window
foo.call(undefined); // window

var bar = foo.bind(null);
bar(); // window
```

### 间接函数引用

创建一个函数的 `间接引用`，这种情况使用默认绑定规则

```javascript
// 1.1
var num1 = 100;
var num2 = 0;
var result = (num2 = num1);
console.log(result); // 100
// 1.2 -- foo函数被直接调用，那么是默认绑定
function foo() {
  console.log(this);
}
var obj1 = {
  name: "obj1",
  foo: foo
}; 
var obj2 = {
  name: "obj2"
}
obj1.foo(); // obj1对象
(obj2.foo = obj1.foo)();  // window
```

### ES6箭头函数

- 箭头函数不使用this的四种标准规则(即默认绑定、隐式绑定、new绑定、显示绑定 -- 也就是不绑定this)，而是根据外层作用域来决定this

```javascript
// 1. 模拟网络请求的案例
// 1.1 在未使用ES6之前
// 1.1.1 使用setTimeout来模拟网络请求，请求到数据后如何可以存放到data中
// 1.1.2 我们需要拿到obj对象，设置data；
// 1.1.3 但是直接拿到的this是window，我们需要在外层定义：var _this = this
// 1.1.4 在setTimeout的回调函数中使用_this就代表了obj对象
var obj = {
  data: [],
  getData: function() {
    var _this = this;
    setTimeout(function() {
      // 模拟获取到的数据
      var res = ["abc", "cba", "nba"];
      _this.data.push(...res);
    }, 1000);
  }
}
obj.getData();

// 1.2 使用ES6箭头函数
// 1.2.1 为什么在setTimeout的回调函数中可以直接使用this呢？
// 1.2.2 因为箭头函数并不绑定this对象，那么this引用就会从上层作用域中找到对应的this
var obj = {
  data: [],
  getData: function() {
    setTimeout(() => {
      // 模拟获取到的数据
      var res = ["abc", "cba", "nba"];
      this.data.push(...res);
    }, 1000);
  }
}
obj.getData();

// 1.3 如果getData也是一个箭头函数，那么setTimeout中的回调函数中的this指向谁呢？
// 1.3.1 答案是window；
// 1.3.2 依然是不断的从上层作用域找，那么找到了全局作用域；
// 1.3.3 在全局作用域内，this代表的就是window
var obj = {
  data: [],
  getData: () => {
    setTimeout(() => {
      console.log(this); // window
    }, 1000);
  }
}
obj.getData();
```

```javascript
var name = 'why'
var obj = {
    name: "111",
    f1: () => console.log(this.name) // why
}
obj.f1()
```



### 总结

```markdown
1. 默认绑定
2. 隐式绑定
3. 显示绑定
4. new绑定
这四种绑定分别对应函数的四种调用：
- 独立调用
- 方法的调用
- 间接调用
   call(), bind(), apply()
- 构造函数调用

隐式丢失
  - 函数别名
  - 函数做参数传递
  - 内置函数
  - 间接调用
优先级规则总结:
	new绑定 > 显示绑定（bind）> 隐式绑定 > 默认绑定
```

### 面试题

```javascript
// 面试题1
var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};
function sayName() {
  var sss = person.sayName;
  sss(); 
  person.sayName(); 
  (person.sayName)(); 
  (b = person.sayName)(); 
}
sayName();
```

```javascript
// 面试题2
var name = 'window'
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }

// 隐式绑定，肯定是person1
person1.foo1(); 
// 隐式绑定和显示绑定的结合，显示绑定生效，所以是person2
person1.foo1.call(person2); 

person1.foo2(); // foo2()是一个箭头函数，不适用所有的规则 所以为window
person1.foo2.call(person2); // window

// 获取到foo3，但是调用位置是全局作用于下，所以是默认绑定window
person1.foo3()(); 
// foo3显示绑定到person2中,但是拿到的返回函数依然是在全局下调用，所以依然是window
person1.foo3.call(person2)(); 
// 拿到foo3返回的函数，通过显示绑定到person2中，所以是person2
person1.foo3().call(person2); 
// foo4()的函数返回的是一个箭头函数,箭头函数的执行找上层作用域，是person1
person1.foo4()();
//foo4()显示绑定到person2中，并且返回一个箭头函数,箭头函数找上层作用域，是person2
person1.foo4.call(person2)();
//  foo4返回的是箭头函数，箭头函数只看上层作用域,所以是person2
person1.foo4().call(person2); 
```

```javascript
// 面试题3
var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1() 
person1.foo1.call(person2) 

person1.foo2() 
person1.foo2.call(person2) 

person1.foo3()() 
person1.foo3.call(person2)() 
person1.foo3().call(person2) 

person1.foo4()() 
person1.foo4.call(person2)() 
person1.foo4().call(person2) 
/ **
    // 隐式绑定
    person1.foo1() // peron1
    // 显示绑定优先级大于隐式绑定
    person1.foo1.call(person2) // person2

    // foo2是一个箭头函数，会找上层作用域中的this，那么就是person1
    person1.foo2() // person1
    // foo2是一个箭头函数，使用call调用不会影响this的绑定，和上面一样向上层查找
    person1.foo2.call(person2) // person1

    // 调用位置是全局直接调用，所以依然是window（默认绑定）
    person1.foo3()() // window
    // 最终还是拿到了foo3返回的函数，在全局直接调用（默认绑定）
    person1.foo3.call(person2)() // window
    // 拿到foo3返回的函数后，通过call绑定到person2中进行了调用
    person1.foo3().call(person2) // person2

    // foo4返回了箭头函数，和自身绑定没有关系，上层找到person1
    person1.foo4()() // person1
    // foo4调用时绑定了person2，返回的函数是箭头函数，调用时，找到了上层绑定的person2
    person1.foo4.call(person2)() // person2
    // foo4调用返回的箭头函数，和call调用没有关系，找到上层的person1
    person1.foo4().call(person2) // person1
*/
```

```javascript
// 面试题4
var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() 
person1.obj.foo1.call(person2)() 
person1.obj.foo1().call(person2) 

person1.obj.foo2()()
person1.obj.foo2.call(person2)() 
person1.obj.foo2().call(person2)
/// --------------------------答案
// obj.foo1()返回一个函数
// 这个函数在全局作用于下直接执行（默认绑定）
person1.obj.foo1()() // window
// 最终还是拿到一个返回的函数（虽然多了一步call的绑定）
// 这个函数在全局作用于下直接执行（默认绑定）
person1.obj.foo1.call(person2)() // window
person1.obj.foo1().call(person2) // person2

// 拿到foo2()的返回值，是一个箭头函数
// 箭头函数在执行时找上层作用域下的this，就是obj
person1.obj.foo2()() // obj
// foo2()的返回值，依然是箭头函数，但是在执行foo2时绑定了person2
// 箭头函数在执行时找上层作用域下的this，找到的是person2
person1.obj.foo2.call(person2)() // person2
// foo2()的返回值，依然是箭头函数
// 箭头函数通过call调用是不会绑定this，所以找上层作用域下的this是obj
person1.obj.foo2().call(person2) // obj
```

### 补充

```javascript
function f1() {
    console.log(this); // 指向Array 
}
let arr = [f1, 100, 200];
arr[0]() 
/**
* let obj = {id:1}
* // 有两种取值方式，上面的数组类似
*  obj.id 
*  obj['id']
*/
// 阿里面试题:写出下列代码的结果
var length = 100
function f1 () {
    console.log(this.length);
}
var obj = {
    length: 10,
    f2: function (f1) {
        f1()
        arguments[0]()
    }
}
obj.f2(f1, 1)
// 美团面试题
// 全局变量和局部变量同名，全局变量是不会作用于局部变量的作用域
var a = 10
function  f1 () {
    var b = 2*a
    var a =20
    var c = a+1
    console.log(b);
    console.log(c);
}
f1()
```

