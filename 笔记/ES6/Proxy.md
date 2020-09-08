Proxy

## 概述

> **==Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写==**

**ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例**

```javascript
var proxy = new Proxy(target, handler);

// 用法详解
/**
	Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为
*/
```

**注意，要使得`Proxy`起作用，必须针对`Proxy`实例（上例是`proxy`对象）进行操作，而不是针对目标对象（上例是空对象）进行操作**

- 如果`handler`没有设置任何拦截，那就等同于直接通向原对象

  ```javascript
  var target = {};
  var handler = {};
  var proxy = new Proxy(target, handler);
  proxy.a = 'b';
  target.a // "b"
  // 上面代码中，handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target。
  ```

- Proxy 实例也可以作为其他对象的原型对象

  ```javascript
  var proxy = new Proxy({}, {
    get: function(target, propKey) {
      return 35;
    }
  });
  
  let obj = Object.create(proxy);
  obj.time // 35
  //上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截
  ```

## Proxy支持的拦截

**Proxy 支持的拦截操作共13种**

### get() 

- `get`方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

  ```javascript
  var person = {
    name: "张三"
  };
  
  var proxy = new Proxy(person, {
    get: function(target, propKey) {
      if (propKey in target) {
        return target[propKey];
      } else {
        throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
      }
    }
  });
  
  proxy.name // "张三"
  proxy.age // 抛出一个错误
  //上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined
  ```

- `get`方法可以继承

  ```javascript
  let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
      console.log('GET ' + propertyKey);
      return target[propertyKey];
    }
  });
  
  let obj = Object.create(proto);
  obj.foo // "GET foo"
  //上面代码中，拦截操作定义在Prototype对象上面，所以如果读取obj对象继承的属性时，拦截会生效
  ```

- 实现数组读负数的索引

  ```javascript
  function createArray (...element) {
      let handler = {
          get(target, propKey, receiver) {
              let index = Number(propKey)
              if (index < 0) {
                  propKey = String(target.length + index)
              }
              return Reflect.get(target, propKey, receiver);
          }
      }
      let target = [];
      target.push(...elements);
      return new Proxy(target, handler);
  }
  let arr = createArray('a', 'b', 'c');
  arr[-1] // c
  ```

- `get`方法的第三个参数，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例

  ```javascript
  const proxy = new Proxy({}, {
    get: function(target, key, receiver) {
      return receiver;
    }
  });
  proxy.getReceiver === proxy // true
  ```

- **==如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错==**

  ```javascript
  const target = Object.defineProperties({}, {
    foo: {
      value: 123,
      writable: false,
      configurable: false
    },
  });
  
  const handler = {
    get(target, propKey) {
      return 'abc';
    }
  };
  
  const proxy = new Proxy(target, handler);
  
  proxy.foo
  // TypeError: Invariant check failed
  ```

### set() 

**`set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。**

- 假定`Person`对象有一个`age`属性，该属性应该是一个不大于 200 的整数，那么可以使用`Proxy`保证`age`的属性值符合要求

  ```javascript
  let validator = {
      set(obj, prop, value) {
          if (prop === 'age') {
              if (!Number.isInteger(value)) {
                  throw new TypeError("not integer")
              }
              if (value > 200) {
                  throw new TypeError("age invalid")
              }
          }
          obj[prop] = value
      }
  }
  let person = new Proxy({}, validator)
  person.age = 100;
  person.age // 100
  person.age = 'young' // 报错
  person.age = 300 // 报错
  ```

- **==利用`set`方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。==**

- 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合`get`和`set`方法，就可以做到防止这些内部属性被外部读写。

  ```javascript
  const handler = {
    get (target, key) {
      invariant(key, 'get');
      return target[key];
    },
    set (target, key, value) {
      invariant(key, 'set');
      target[key] = value;
      return true;
    }
  };
  function invariant (key, action) {
    if (key[0] === '_') {
      throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
  }
  const target = {};
  const proxy = new Proxy(target, handler);
  proxy._prop
  // Error: Invalid attempt to get private "_prop" property
  proxy._prop = 'c'
  // Error: Invalid attempt to set private "_prop" property
  
  // 上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。
  ```

- 注意，如果目标对象自身的某个属性，不可写且不可配置，那么`set`方法将不起作用。

  ```javascript
  const obj = {};
  Object.defineProperty(obj, 'foo', {
    value: 'bar',
    writable: false,
  });
  
  const handler = {
    set: function(obj, prop, value, receiver) {
      obj[prop] = 'baz';
    }
  };
  
  const proxy = new Proxy(obj, handler);
  proxy.foo = 'baz';
  proxy.foo // "bar"
  ```

- 严格模式下，`set`代理如果没有返回`true`，就会报错

  ```javascript
  'use strict';
  const handler = {
    set: function(obj, prop, value, receiver) {
      obj[prop] = receiver;
      // 无论有没有下面这一行，都会报错
      return false;
    }
  };
  const proxy = new Proxy({}, handler);
  proxy.foo = 'bar';
  // TypeError: 'set' on proxy: trap returned falsish for property 'foo'
  
  // 严格模式下，set代理返回false或者undefined，都会报错
  ```

### apply()

- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`

- `apply`方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（`this`）和目标对象的参数数组

- 例子1

  ```javascript
  var target = function () { return 'I am the target'; };
  var handler = {
    apply: function () {
      return 'I am the proxy';
    }
  };
  
  var p = new Proxy(target, handler);
  
  p()
  // "I am the proxy"
  
  //上面代码中，变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串
  ```

- 例子2

  ```javascript
  var twice = {
    apply (target, ctx, args) {
      return Reflect.apply(...arguments) * 2;
    }
  };
  function sum (left, right) {
    return left + right;
  };
  var proxy = new Proxy(sum, twice);
  proxy(1, 2) // 6
  proxy.call(null, 5, 6) // 22
  proxy.apply(null, [7, 8]) // 30
  // 上面代码中，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。
  ```

- 例子3

  另外，直接调用`Reflect.apply`方法，也会被拦截

  ```javascript
  Reflect.apply(proxy, null, [9, 10]) // 38
  ```

### has()

- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值

- `has`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符

- 使用`has`方法隐藏某些属性，不被`in`运算符发现

  ```javascript
  var handler = {
    has (target, key) {
      if (key[0] === '_') {
        return false;
      }
      return key in target;
    }
  };
  var target = { _prop: 'foo', prop: 'foo' };
  var proxy = new Proxy(target, handler);
  '_prop' in proxy // false
  ```

- 如果原对象不可配置或者禁止扩展，这时`has`拦截会报错

  ```javascript
  var obj = { a: 10 };
  Object.preventExtensions(obj);
  
  var p = new Proxy(obj, {
    has: function(target, prop) {
      return false;
    }
  });
  
  'a' in p // TypeError is thrown
  ```

  上面代码中，`obj`对象禁止扩展，结果使用`has`拦截就会报错。也就是说，如果某个属性不可配置（或者目标对象不可扩展），则`has`方法就不得“隐藏”（即返回`false`）目标对象的该属性

  **==值得注意的是，`has`方法拦截的是`HasProperty`操作，而不是`HasOwnProperty`操作，即`has`方法不判断一个属性是对象自身的属性，还是继承的属性==**

- 虽然`for...in`循环也用到了`in`运算符，但是`has`拦截对`for...in`循环不生效

  ```javascript
  let stu1 = {name: '张三', score: 59};
  let stu2 = {name: '李四', score: 99};
  
  let handler = {
    has(target, prop) {
      if (prop === 'score' && target[prop] < 60) {
        console.log(`${target.name} 不及格`);
        return false;
      }
      return prop in target;
    }
  }
  
  let oproxy1 = new Proxy(stu1, handler);
  let oproxy2 = new Proxy(stu2, handler);
  
  'score' in oproxy1
  // 张三 不及格
  // false
  
  'score' in oproxy2
  // true
  
  for (let a in oproxy1) {
    console.log(oproxy1[a]);
  }
  // 张三
  // 59
  
  for (let b in oproxy2) {
    console.log(oproxy2[b]);
  }
  // 李四
  // 99
  ```
  
  上面代码中，`has`拦截只对`in`运算符生效，对`for...in`循环不生效，导致不符合要求的属性没有被`for...in`循环所排除
  

### construct()

construct方法用于拦截new命令，下面是拦截对象的写法

```javascript
var handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};
```

```markdown
- construct方法可以接受三个参数。
	- target：目标对象
	- args：构造函数的参数对象
	- newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）
// 例子
var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
// "called: 1"
// 10
```

- `construct`方法返回的必须是一个对象，否则会报错

  ```javascript
  var p = new Proxy(function() {}, {
    construct: function(target, argumentsList) {
      return 1;
    }
  });
  
  new p() // 报错
  // Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
  ```

### deleteProperty() 

**`deleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除**

```javascript
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
// 上面代码中，deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错
```

**注意，目标对象自身的不可配置（configurable）的属性，不能被`deleteProperty`方法删除，否则报错**

### defineProperty()

**`defineProperty()`方法拦截了`Object.defineProperty()`操作**

```javascript
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
```

上面代码中，`defineProperty()`方法内部没有任何操作，只返回`false`，导致添加新属性总是无效。注意，这里的`false`只是用来提示操作失败，本身并不能阻止添加新属性

注意，如果目标对象不可扩展（non-extensible），则`defineProperty()`不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则`defineProperty()`方法不得改变这两个设置。

### getOwnPropertyDescriptor()

**`getOwnPropertyDescriptor()`方法拦截`Object.getOwnPropertyDescriptor()`，返回一个属性描述对象或者`undefined`**

```javascript
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```

上面代码中，`handler.getOwnPropertyDescriptor()`方法对于第一个字符为下划线的属性名会返回`undefined`

### getPrototypeOf()

`getPrototypeOf()`方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

```javascript
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```

注意，`getPrototypeOf()`方法的返回值必须是对象或者`null`，否则报错。另外，如果目标对象不可扩展（non-extensible）， `getPrototypeOf()`方法必须返回目标对象的原型对象

### isExtensible() 

`isExtensible()`方法拦截`Object.isExtensible()`操作

```javascript
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true
```

**注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值**

### ownKeys() 

`ownKeys()`方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `for...in`循环

```javascript
let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'a' ]
// 上面代码拦截了对于target对象的Object.keys()操作，只返回a、b、c三个属性之中的a属性
```

**注意，使用`Object.keys()`方法时，有三类属性会被`ownKeys()`方法自动过滤，不会返回。**

- 目标对象上不存在的属性
- 属性名为 Symbol 值
- 不可遍历（`enumerable`）的属性

```javascript
let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
};

Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
});

let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// ['a']
```

上面代码中，`ownKeys()`方法之中，显式返回不存在的属性（`d`）、Symbol 值（`Symbol.for('secret')`）、不可遍历的属性（`key`），结果都被自动过滤掉

- `for...in`循环也受到`ownKeys()`方法的拦截

  ```javascript
  const obj = { hello: 'world' };
  const proxy = new Proxy(obj, {
    ownKeys: function () {
      return ['a', 'b'];
    }
  });
  
  for (let key in proxy) {
    console.log(key); // 没有任何输出
  }
  ```

  上面代码中，`ownkeys()`指定只返回`a`和`b`属性，由于`obj`没有这两个属性，因此`for...in`循环不会有任何输出

- `ownKeys()`方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错

- 如果目标对象是不可扩展的（non-extensible），这时`ownKeys()`方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错

  ```javascript
  var obj = {
    a: 1
  };
  
  Object.preventExtensions(obj);
  
  var p = new Proxy(obj, {
    ownKeys: function(target) {
      return ['a', 'b'];
    }
  });
  
  Object.getOwnPropertyNames(p)
  // Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
  ```

  上面代码中，`obj`对象是不可扩展的，这时`ownKeys()`方法返回的数组之中，包含了`obj`对象的多余属性`b`，所以导致了报错

### preventExtensions()

**`preventExtensions()`方法拦截`Object.preventExtensions()`。该方法必须返回一个布尔值，否则会被自动转为布尔值**

这个方法有一个限制，只有目标对象不可扩展时（即`Object.isExtensible(proxy)`为`false`），`proxy.preventExtensions`才能返回`true`，否则会报错

### setPrototypeOf()

`setPrototypeOf()`方法主要用来拦截`Object.setPrototypeOf()`方法

## Proxy.revocable()

**`Proxy.revocable()`方法返回一个可取消的 Proxy 实例**

```javascript
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```

`Proxy.revocable()`方法返回一个对象，该对象的`proxy`属性是`Proxy`实例，`revoke`属性是一个函数，可以取消`Proxy`实例。上面代码中，当执行`revoke`函数之后，再访问`Proxy`实例，就会抛出一个错误。

`Proxy.revocable()`的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问

## this指向问题

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的`this`关键字会指向 Proxy 代理

```javascript
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
```

上面代码中，一旦`proxy`代理`target.m`，后者内部的`this`就是指向`proxy`，而不是`target`

此外，有些原生对象的内部属性，只有通过正确的`this`才能拿到，所以 Proxy 也无法代理这些原生对象的属性。

```javascript
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
```

上面代码中，`getDate()`方法只能在`Date`对象实例上面拿到，如果`this`不是`Date`对象实例就会报错。这时，`this`绑定原始对象，就可以解决这个问题

```javascript
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```

