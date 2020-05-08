# ES5基础

1. ==当函数名和变量名相同时，如果变量没有被赋值，函数生效，否则变量生效==

   > 1. 考察了函数提升和变量提升
   > 2. var s = function g() {}
   >    - g是只读的
   >    - g只能在函数内部访问

   ```javascript
   alert(a) // function
   a()// 10
   var a = 3
   function a () {
       alert(10)
   }
   /**
   以上代码相当于：
   function a () {
   	alert(10)
   }
   var a;
   alert(a)
   a()
   a = 3
   */
   ```

   ```javascript
   //变量赋值后，变量生效
   function a () {
         alert(10)
   }
   var a
   alert(a) // f a() { alert(10) }
   a = 3
   alert(a) // 3
   ```

   ```javascript
   console.log(a); // f a () { console.log(10) }
   a() // 10
   var a = 3
   function a () {
       console.log(10);
   }
   console.log(a); // 3
   // 声明时函数没有被变量覆盖，变量赋值后变量覆盖函数
   // a() // Uncaught TypeError: a is not a function
   a = 6 
   a() // Uncaught TypeError: a is not a function
   ```

   ```javascript
   var a = function fn (num) {
       fn = num
       console.log(typeof fn); // function
       return 1
   }
   a(1)
   console.log(typeof fn()); // Uncaught ReferenceError: fn is not defined
   ```

   2. ==this谁调用指向谁，没人调用就指向window==

      > this当函数创建的时候，this指向当前函数的实例

      ```javascript
      this.a = 20 // this指向window
      var test = {
          a:40,
          init: function () {
              console.log(this.a);
          }
      } 
      test.init() // 40
      ```

      ```javascript
      this.a = 20 // this指向window
      var test = {
          a:40,
          init: function () {
              console.log(this.a);
          }
      } 
      var fn = test.init
      fn() // 20
      ```

      ```javascript
      this.a = 20 // this指向window
      var test = {
          a:40,
          init: function () {
              function go () {
                  console.log(this.a);
              }
              go() // 闭包，指向window
          }
      } 
      test.init() // 20
      ```

      ```javascript
       this.a = 20 // this指向window
      var test = {
          a:40,
          init: function () {
              function go () {
                  console.log(this.a); // 20，谁调用指向谁
              }
              return go
          }
      } 
      var s = test.init() 
      s()
      ```

      ```javascript
      // 构造函数的值优先于原型链上的值
      function test (a) {
          this.a = a
      }
      test.prototype.a = 20
      test.prototype.init = function () {
          console.log(this.a);
      }
      var s = new test(30)
      s.init() // 30
      ```

      ```javascript
      this.a = 20 // this指向window
      var test = {
          a:40,
          init: function () {
              console.log(this.a);
          }
      } // 闭包前面要加分号
      (function () {
          var s = test.init 
          s()
      })()
      // Uncaught TypeError: {(intermediate value)(intermediate value)} is not a function
      // -------------------------------------------------------
      this.a = 20 // this指向window
      var test = {
          a:40,
          init: function () {
              console.log(this.a);
          }
      }; // 闭包前面要加分号
      (function () {
          var s = test.init 
          s()
      })() // 20
      ```

      ```javascript
      // 箭头函数会绑定作用域，使其this指向父级
      this.a = 20 // this指向window
      var test = {
          a:40,
          init: () => {
              console.log(this.a);
          }
      };
      test.init()
      /**
      // 以上代码相当于：
      this.a = 20 // this指向window
      var test = {
          a:40,
          init: () => {
              console.log(this.a);
          }
      };
      var s = test.init.bind(this)
      s() // 20
      */
      ```

      ```javascript
      this.test = 11 // this指向window
      var s = {
          // test : 3, // 若这儿加一个test,不影响结果
          a: function () {
              // 若这儿加一个this.test=3，则无论是new还是执行，都输出4
              // 若这儿加一个var test = 3,不影响结果，还是NaN和12
              console.log(1 + this.test);
          },
          b() { // ES6的这种写法不支持new,但可以直接执行
              console.log(this.test);
          },
          c:function () {
              console.log(this.test);
          },
          d: () => {
              console.log(this.test);
          }
      };
      var f = s.a.bind(this) // 相当于暴露出了a函数
      new f() // NaN => undefined+1 = NaN => new之后this指向a的实例，谁调用指向谁
      f() // 12
      
      var c = s.c.bind(this)
      new c() // undefined
      c() // 11
      
      var p = s.b.bind(this)
      p() // 11
      new p() // 报错
      
      var d = s.d
      new d() // 报错 d is not a constructor => ES6写法无法new
      ```

      3. 原型相关

      ```javascript
      function C (name) {
          this.name = name
      }
      C.prototype.name = 'lao'
      console.log(new C()); //  {name: undefined}
      console.log((new C().name)); // undefined
      console.log((new C()).name); // undefined
      ```

      ```javascript
      function C1 (name) {
          // 不传name则去原型上找
          if (name) this.name = name 
      }
      function C2 (name) {
          this.name = name
      }
      function C3 (name) {
          this.name = name || 'fe'
      }
      C1.prototype.name = 'yideng'
      C2.prototype.name = 'lao'
      C3.prototype.name = 'yuan'
      console.log((new C1().name) + (new C2().name) + new C3().name);
      // yidengundefinedfe
      ```

      4. 写出如下点击的输出值，并用三种方法正确输出li中的数字

      ```javascript
       <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
       </ul>
       <script type='text/javascript'>
          var list_li = document.getElementsByTagName('li')
          for (var i=0; i<list_li.length; i++) {
            list_li[i].onclick = function () {
              console.log(i);
            }
         }
      </script>
      ```

      - let
      - 闭包
      - 将console.log(i)改为console.log(this.innerHTML)

   5. 按引用传递和按值传递

      ```javascript
      function test (m) { //函数的值时按值传递的
          m = {
              v:5
          }
      }
      var m = {
          k: 30
      }
      test(m)
      alert(m.v) // undefined
      ```

      ![](E:\GitResort\CodePractice\笔记\img\Snipaste_2020-05-07_14-22-04.PNG)

   6. 易犯错

      ```javascript
      /**
           * 以下题的答案
           *    1. 在IE6和7中结果是2 => 函数提升
           *        (function () {
           *            function yideng() {
           *               console.log(2);
           *            }
           *           if (false) {
           *             
           *            }
           *            yideng()
           *        })()
           *    2. 在目前的浏览器中报错
           *        (function () {
           *             var yideng; // 将变量放到作用域顶端
           *             if (false) {
           *               function yideng() {
           *                 console.log(2);
           *               }
           *             }
           *             console.log(typeof yideng) // undefined
           *             yideng() // 报错
           *         })()
       */
      function yideng () {
           console.log(1);
       };
      (function () {
          if (false) {
              function yideng() {
                  console.log(2);
              }
          }
          yideng()
      })()
      
      ```

      ```javascript
      function yideng () {
          console.log(1);
      };
      if (false) {
          function yideng() {
              console.log(2);
          }
      }
      yideng() 
      // 结果为1
      // 原因
      /*
      var yideng;
      function yideng () {
          console.log(1);
      };
      if (false) {
          function yideng() {
              console.log(2);
          }
      }
      yideng() 
      */
      ```

      

      ```javascript
      console.log([,,].length);
      // IE6、7 => 输出为3
      // 别的浏览器输出为2
      ```

   7. 请用一句话算出0\~100之间的学生等级，如90\~100为1等生，80~90位2等生，以此类推，不允许使用if/else

      ```javascript
      // 考察思维
      // 实际项目中少用if..else,若if...else过多，肯定是你的逻辑有问题
      10 - x / 10 = n等生
      ```

   8. 请用一句话遍历遍历a（禁用for, 已知var a = 'abc'）

      > 目的是对ES6的熟悉

      - Array.from(a)
      - [... new Set(a)]
      - Array.prototy.slice.call

   9. 请写出js面向对象编程的混合式继承，并写出es6版本的继承

      要求：汽车时父类，cruze是子类，父类有颜色价格属性，有售卖的方法，cruze子类实现父类的颜色是红色，价格是140000，售卖方法实现如下输出语句:将红色的curize买给了小王，价格是14万

      ```javascript
      // ES5
      function Car (color) {
          this.color = color
      }
      Car.prototype.show = function () {
          console.log(this.color);
      }
      function BWM () {
          Car.call(this, color)
      }
      let __prototype = Object.create(Car.prototype)
      __prototype.constructor = BWM
      BWM.prototype = __prototype
      BWM.prototype.test = function () {
          // ....
      }
      let b = new BWM('red')
      ```

      ```javascript
      // ES6 使用class 
      ```

      ==注意==

      ```javascript
      // es6可以认为是es5的语法糖
      class Car {
          constructor (color) {
              this.color = color 
          }
          show () {
              console.log(this.color);
          }
      }
      class BWM extends Car{
          constructor (color) {
              super(color)
              super.xx = 'lllg' // super如果不当函数使用相当于this
          }
          test () {
              console.log(1);
          }
      }
      BWM.prototype.test = function () {
          console.log(2);
      }
      let b = new  BWM('yello')
      let c = new Car('red')
      console.log(b.xx); // lllg
      console.log(c.xx); // undefined
      b.test() // 2 => js中只有函数有原型链的属性，所以class可以认为是function
          /**
           * js中只有函数有原型链的属性
           *  1. var s = 'sss'
           *     s.prototype // undefined
           *  2. var obj = {}
           *     obj.prototype // undefined
           *  3. function a () {}
           *     a.prototype // {constructor f}
          */
      ```

      ==注意==

      ```javascript
      function yideng () {}
      yideng.prototype.a = 11
      console.log(yideng.a) // undefined
      // 只有对一个函数new过后才会去原型链上查找
      ```

      ==原型链神图必须看，必须记得非常清楚==

