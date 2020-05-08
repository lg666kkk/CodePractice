# JS数据类型检测

## JS数据类型检测的四种方法

1. typeof
2. instranceof
3. constructor
4. Object.prototype.toString.call() 

## typeof

```javascript
/**
* typeof:用来检测数据类型的运算符
* 1. typeof [value]
* 2. @return 
*    1) 首先是个字符串
*    2) 字符串中包含对应的数据类型
*        "number", "object", "undefined", "function", "boolean", "symbol", "bigint"
* 3. @局限
*    1) typeof null => "object"
*    2) 不能具体区分对象数据类型的值
*       typeof 数组 => "object"
*       typeof {} => "object"
*       typeof 正则 => "object"
* 4. @优势
*    使用方便，能快速检查undefined,string,number,boolean, function等类型 
*/
    
function func (n, m, callback) {
    /* 形参赋值默认值*/
    //   1. ES6 => function func (n=0, m=0) {} // 若没有传，默认为0
    //   2. typeof m==="undefined" ? m=0 : null
    //   3. n = n || 0 、 m = m || 0  => 不够严谨，若用户传一个false,则也会将其赋值为0

    /* 回调函数执行 */
    //  1. typeof callback === "function" ? callback() : null
    //  2. callback && callback() ==> 传递的为真即执行，不一定是一个函数

}
```

## instanceof && constructor

### instanceof

```javascript
 /**
     * instanceof: 本意是用来检测实例是否隶属于某个类的运算符，我们基于这样的方式也可以用来做某些数据类型的检测，例如数组、正则等
     * @return 
     *    true/false
     * @局限性
     *    1. 不能处理基本数据类型值
     *    2. 只要在当前实例的原型链(__proto__)中出现过的类检测结果都是true(可能会手动修改原型链的指向：example.__proto__或者 原型继承)
    */
    // ----------------------------------------------------
    function func () {
      // arguments 类数组(其原型链直接到Object,没有到Array)
      console.log(arguments instanceof Array); // false

      arguments.__proto__ = Array.prototype
      console.log(arguments instanceof Array); // true
    }
    func()
    // -----------------------------------------------------
    // let s = 11
    // console.log(s instanceof Number); // false
    // let arr =[],
    //     reg = /^$/,
    //     obj = {};
    // console.log(arr instanceof Array); // true
    // console.log(reg instanceof Array); // false
    // console.log(reg instanceof Object); // true
    // console.log(reg instanceof RegExp); // true
    // console.log(obj instanceof Array); // false
    // -----------------------------------------------------
    /**
     * 创建数值的两种方式(不管那种方法创建都是Number类的实例，因为可以使用Number原型上的方法)
     *    1. 字面量 => let n = 12 => 不能使用instanceof检测
     *    2. 构造函数 => let m = new Number('13') => typeof m 的值为"object"、 m instarnceof Number为true
    */
```

### constructor

```javascript
/**
     * constructor: 构造函数
     * @原理：在类的原型上一般都会带有constructor,存储当前类本身，我们也是利用这一点，获取实例的constructor值，验证是否为所属类，从而进行数据类型检测
     * @局限性
     *      1. constructor属性太容易被修改
    */
    let n = 12,
        arr = []
    console.log(n.constructor === Number); // true
    console.log(arr.constructor === Array); // true
    console.log(arr.constructor === Object); // false

    arr.constructor = 111 // => 设置私有属性，每次查找会先看自己有没有，没有再去看原型有没有
    console.log(arr.constructor === Array); // false
    console.log(arr.constructor === Number); // false
    console.log(arr.constructor === 111); // true
    Func.prototype = {} // 这样原型上就没有constructor属性了(重构了)
```

## Object.prototype.toString.call([value])

 ```javascript
/**
     * Object.prototype.toString.call([value]):调用Object原型上的toString方法，让方法执行的时候，方法中的this是要检测的数据类型，从而获取到数据类型所属类的详细信息
     *  @返回信息的模板 => "[object 所属类]" 例如"[object Array]"
     *  在所有的数据类型类中，他们的原型上都有toString方法，除了Object.prototype.toString不是把数据值转换为字符串，其余都转换为字符串
     * 可以检测所有的数据类型
     *    "[object Undefined]" "[object BigInt]" "[object Array]" "[object Boolean]" "[object Null]" "[object String]" 
     *    "[object Number]" "[object RegExp]" "[object Symbol]" "[object Function]" "[object Object]" "[object Date]"
     *    "[object Set]" "[object Math]" ....
    */

    /*let obj1 = {},
        obj2 = {
          name : "lg"
        };
     */
    // console.log([11, 12].toString()); // "11, 12"
    // console.log(/^\d+$/.toString()); // "/^\d+$/"
    // console.log((function func () {}).toString()); // "function func () {}"
    // console.log(obj1.toString()); // "[object Object]"
    // console.log(obj2.toString()); // "[object Object]"
    // console.log([].__proto__.__proto__.toString()); // "[object Object]"
    //obj1.toString() // 基于原型链机制查找，找到Object.prototype.toString，把找到的方法执行，方法中的this执行obj1,方法内部把this(obj1)的所属类信息输出
 ```

## 自定义数据类型检测方法

```javascript
// 使用ES6
<script type="text/javascript">
      let _obj = {
            isNumeric: "Number",
            isFunction: "Function",
            isString: "String",
            isNull: "Null",
            isUndefined: "Undefined",
            isSymbol: "Symbol",
            isPlainObject: "Object", // 纯粹对象
            isArray: "Array",
            isRegExp: "RegExp",
            isDate: "Date",
            isWindow: "Window",
            isBoolean: "Boolean"
          	// .....
          },
          _toString = ({}).toString,
          _type = {};
      for (let key in _obj) {
        if (!_obj.hasOwnProperty(key)) break // 不是私有属性，结束循环
        let reg = new RegExp("\\[object "+ _obj[key] +"\\]")
        _type[key] = function (value) {
          return reg.test(_toString.call(value))
        } 
      }
      console.log(_type.isNumeric(12)); // true
      console.log(_type.isNumeric("sss")); // false
	  console.log(_type.isFunction(Array)); // true
    </script>
```



```javascript
// 使用ES5 => 闭包
var _obj = {
            isNumeric: "Number",
            isFunction: "Function",
            isString: "String",
            isNull: "Null",
            isUndefined: "Undefined",
            isSymbol: "Symbol",
            isPlainObject: "Object", // 纯粹对象
            isArray: "Array",
            isRegExp: "RegExp",
            isDate: "Date",
            isWindow: "Window",
            isBoolean: "Boolean"
          },
          _toString = ({}).toString,
          _type = {};
      for (var key in _obj) {
        if (!_obj.hasOwnProperty(key)) break // 不是私有属性，结束循环
        _type[key] = (function () {
          var reg = new RegExp("\\[object "+ _obj[key] +"\\]")
          return function (value) {
            return reg.test(_toString.call(value))
          } 
        })();
      }
      console.log(_type.isNumeric(12)); // true
      console.log(_type.isNumeric("sss")); // false
      console.log(_type.isFunction(Array)); // true
```

