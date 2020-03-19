## Ts笔记
### Ts数据类型
typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，写Ts代码必须指定类型
#### 布尔类型
```typescript
var flag:boolean = true
// flag = 123 错误写法
flag = false
console.log(flag);//false
```
#### 数字类型
```typescript
/**数字类型number */
let num:Number = 123
num = 456
console.log(num);
```
#### 字符串类型
```typescript
/**string类型 */
let str:String = 'sssss'
console.log(str);
```
#### 数组类型
```typescript
/**数组类型 */
//1.第一种定义数组的方式
let arr:Number[] = [11,12,13,14]//数组中的所有元素都是number类型
console.log(arr);
//2.第二种定义数组的方式
let arr1:Array<Number> = [11,12,13,14,15]//数组中的所有元素都是number类型
console.log(arr1);
//3.第三种定义数组的类型
let arr2:any[] = [11,12,13,'333',false]
```
#### 元组类型
```typescript
/**元组类型---属于数组的一种 */
let arr2:[number, string,number,boolean] = [123,'234',222,false]
console.log(arr2);
```
#### 枚举类型
随着计算机的不断普及，程序不仅只用于数值计算，还更广泛的用于处理非数值数据。例如：性别、月份、星期几、颜色、单位名称、简历、职业等，都不是数值数据，在其他程序设计语言中，一般用一个数值来代表某一状态，这种处理方法不直观，阅读性差，如果能在程序中用自然语言中有相应含义的单词来代表某一状态，则程序就很容易阅读和理解，也就是说，实现考虑到某一变量可能的取值，尽量用自然语言中涵义清楚地单词来表示他的每一个值，这种方法称为枚举法，用这种方法定义的类型为枚举类型
```typescript
/**枚举类型 */
/**
 * enum 枚举名 {
 *  标识符[=整型常数]
 *  标识符[=整型常数]
 *  标识符[=整型常数]
 *  ...
 *  标识符[=整型常数]
 * }
 */
enum Flag {success=1, flase=2,pending}
let f:Flag = Flag.success
let f1:Flag = Flag.pending
console.log(f);//1
console.log(f1);//3
enum Color {blue, 'yellow', white}
let c:Color = Color.yellow
//如果标识符没有赋值，那么它的值就是下标
console.log(c);//1
```
#### 任意类型(any)
```typescript
/**任意类型(any) */
//1.基本使用
let n:any = 111
n = 'str'
n = true
console.log(n);
//2.用处:不加any会报错
let obx:any = document.getElementById('id')
obx.style.color = 'red'
```
#### null和undefined --- 其他数据类型(never类型)的子类型
```typescript
/**null和undedined */
//let n1:number
//console.log(n1);//可以浏览器输出，但Ts报错
let n3:number | undefined
n3 = 12311
console.log(n3); //12311
//定义未赋值
let n4:number | undefined
console.log(n4); //undefined

let n5:null | number | undefined
n5 = 3333
console.log(n5);
```
#### void类型：Ts中的void表示没有任何类型，一般用于定义方法的时候方法没有返回值
```typescript
/**void类型 */
//es5定义方法
function run () {
  console.log('run');
}
run()
//void定义方法:没有返回值
function run1():void {
  console.log('run1');
}
run1()
//如果方法有返回值，返回值什么类型就给方法指定什么类型
function number():number {
  return 1
}
console.log(number());
```
#### never类型：代表从不会出现的值，这意味着声明never的变量只能被never类型所赋值
```typescript
/**never类型 --- 一般不用 */
let a:undefined
//a = 123 //报错
a = undefined //正确

let b:null
//b = 222 //报错
b = null //正确

let d:never
//d = 123 //报错
a = (() => { //正确
  throw new Error('报错')
})()
```
### 函数
```typescript
/**函数 */
/**3.1 ES5定义函数两种方法 */

1.函数声明法
function run () {
  return 'run'
}
//2.匿名函数
let run2 = function () {
  return 'run2'
}

/**3.2 ts中函数定义方法 */
1.函数声明法
function run():string {

  //return 123 //错误写法
  return 'run'
}
//匿名函数写法
let run2 = function ():number {
  return 123
}
alert(run2())
/**3.3 ts中定义方法传参 */

function getInfo (name:string, age:number):string {
  return `${name} --- ${age}`
}
console.log(getInfo('111',23));

let get1 = function (name:string, age:number):string {
  return `${name} --- ${age}`
}
console.log(get1('www',45));
/**3.4 Ts方法的可选参数
 * 可选参数必须配置到参数最后面
 */
//1.ES5里面的实参和形参可以不一样，但Ts中必须一样，如果不一样，就需要配置可选参数
function getInfo (name:string, age?:number):string {//age加个？表示可选参数
    if (age) {
      return `${name} --- ${age}`
    } else {
      return `${name} --- 年龄保密`
    }
}
console.log(getInfo('111'));
/**3.5 Ts方法的默认参数
 * ES5没有办法设置默认参数，ES6和Ts中都可以设置默认参数
 */

function getInfo (name:string, age:number=20):string {//age加个？表示可选参数
    if (age) {
      return `${name} --- ${age}`
    } else {
      return `${name} --- 年龄保密`
    }
}
console.log(getInfo('111',40));
/**
 * 3.6 剩余参数--三点运算符
 */
//1.三点运算符，接受形参传过来的值
function sum (a:number, ...result:number[]):number {
  let sum = 0
  for(let i=0; i<result.length; i++) {
    sum += result[i]
  }
  return sum
}
console.log(sum(1,2,3,4,5));//14,把1赋值给了a
/**3.7 ts函数的重载
 * 1. java中的方法的重载：重载指的是两个或两个以上的同名函数，但他们的参数不一样，这时会出现函数重载的情况
 * 2. Ts的重载：通过为同一个函数提供多个函数类型定义，ts为了兼容es5和es6，所以重载的写法与java中有区别
 */
//ES5出现同名方法，下面的会替换上面的
// function css (config) {}
// function css (config, value) {}
//ts中的重载(1)
function getInfo (name:string):string;
function getInfo (age:number):number;
function getInfo (str:any):any {
  if (typeof str === 'string') {
    return '我叫' + str
  } else {
    return '年龄' + str
  }
}
console.log(getInfo('zhangsan'));//正确
console.log(getInfo(20)); //正确
console.log(getInfo(true)); //报错，错误写法
//ts中的重载(2)
function getInfo (name:string):string;
function getInfo (name:string, age:number):string;
function getInfo (name:any, age?:any):any {
  if (age) {
    return '我叫' + name + '，今年' + age
  } else {
    return '我叫' + name
  }
}
console.log(getInfo('wwwq',30));//正确
console.log(getInfo(222)); //错误
/**3.8 箭头函数 es6 
 * this指向问题，箭头函数里面的this指向上下文
*/
```
## ES5中的类和静态方法以及继承
```javascript
/**ES5里面的类 */
/** 1.对象冒充实现继承  */
function Person () {
  this.name = 'ww'
  this.age = 30
  this.run = function () {} //实例方法
}
Person.getInfo = function () {} //静态方法
Person.prototype.work = function () {} //
Person.getInfo() //调用静态方法
const p = new Person()
console.log(p.name);
//web类继承Person类  原型链+对象冒充的组合继承模式
function Web () {
  Person.call(this) //对象冒充实现继承
}
let w = new Web()
w.run() //调用Person的run方法，对象冒充可以继承构造函数里面的属性和方法
w.work() //报错，对象冒充没法继承原型链上的属性和方法
/** 2.原型链实现继承 
 *   问题：实例化子类的时候没法给父类传参
 */
function Person () {
  this.name = 'ww'
  this.age = 30
  this.run = function () {} //实例方法
}
Person.getInfo = function () {} //静态方法
Person.prototype.work = function () {} //
Person.getInfo() //调用静态方法
const p = new Person()
console.log(p.name);
function Web () {}
Web.prototype = new Person() //原型链实现继承，即可以继承构造函数中的属性和方法，也可以继承原型链上的属性和方法
let w = new Web()
w.run()//正确
w.work() //正确
/** 3.原型链+构造函数的组合继承模式 */
function Person (name, age) {
  this.name = name
  this.age = age
  this.run = function () {
        alert(this.name + '吃饭')
   } //实例方法
}
Person.getInfo = function () {} //静态方法
Person.prototype.work = function () {} //
Person.getInfo() //调用静态方法
const p = new Person()
console.log(p.name);
function Web (name, age) {
    Person.call(this, name, age) //对象冒充实现继承,实例化子类可以给父类传参
}
Web.prototype = new Person() //或者可以写为：Web.prototype = Person.prototype
let w = new Web('333',34) //实例化子类可以给父类传参
```
## ES6中的类
```javascript
/** es6中定义类 */
class Person {
  //定义属性，前面省略了public关键词
  name:string
  constructor (name:string) { //构造函数，实例化类的时候触发的方法
    this.name = name
  }
  run():void {
    alert(this.name)
  }
}
let p = new Person('张三')
p.run()
```
## ts中的类
```typescript
/**ts中定义类 */
class Person {
  //定义属性，前面省略了public关键词
  name:string
  constructor (name:string) { //构造函数，实例化类的时候触发的方法
    this.name = name
  }
  getName():string {
    return this.name
  }
  setName(name:string):void {
    this.name = name
  }
}
let p = new Person('张三')
console.log(p.getName());
p.setName('李四')
console.log(p.getName());
/** 1.ts中实现继承 -- extends  super*/
class Person {
  name:string
  constructor (name:string) {
    this.name = name
  }
  run():string {
    return `${this.name}在运动`
  }
}
class Web extends Person {
  constructor (name:string) {
    super(name)/**初始化父类构造函数 */
  }
}
let w = new Web('网五')
console.log(w.run());
/** 2.ts中继承的探讨 
 *   父类的方法和子类的方法一致 -- 先在子类中找
 * */
class Person {
  name:string
  constructor (name:string) {
    this.name = name
  }
  run():string {
    return `${this.name}在运动`
  }
  work():string {
    return `${this.name}在工作`
  }
}
class Web extends Person {
  constructor (name:string) {
    super(name)/**初始化父类构造函数 */
  }
  work():string {
    return `${this.name}在在在工作111`
  }
}
let w = new Web('网五')
console.log(w.run());
console.log(w.work());
/** 3.类里面的修饰符
 * ts里面定义属性时，给我们提供了三种修饰符
 *   public -- 公有的，在当前类里面，子类，类外面都可以访问
 *   private -- 私有的，在当前类里面可以访问，子类和类外部无法访问
 *   protected -- 保护类型 在当前类里面和子类里面可以访问，类外部无法访问
 *   属性如果不加修饰符，默认是公有的
 */
/** 4.静态属性，静态方法 */
class Person {
  name:string
  static age:number = 20 //静态属性
  constructor (name:string) {
    this.name = name
  }
  run () { //实例方法
    alert(`${this.name}在运动`)
  }
  work () { //实例方法
    alert(`${this.name}在工作`)
  } 
  static Print () { //静态方法，在静态方法中没法调用类里面的属性，但可以调用静态属性
    console.log('qqq');
    console.log(Person.age + 'www');
  }
}
let p = new Person('张三')
Person.Print() //调用静态方法
console.log(Person.age); //调用静态属性
/** 5.多态：父类定义一个方法不实现，让继承他的子类去实现，每一个子类有不同表现
 *  多态属于继承
 */
class Animal {
  name:string
  constructor (name:string) {
    this.name = name
  }
  eat () {
    console.log('吃的方法');
  }
}

class Dog extends Animal {
    constructor (name:string) {
      super(name)
  }
  eat () {
    return `${this.name}吃肉`
  }
}

class Cat extends Animal {
    constructor (name:string) {
      super(name)
  }
  eat () {
    return `${this.name}耻笑没`
  }
}
/**6.抽象方法
 *  ts中的抽象类：是提供其他类继承的基类，不能直接被实例化
 *  用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方不包含具体实现并且必须在派生类中实现
 *  abstract抽象方法只能放在抽象类中
 */
abstract class Animal {
  name:string
  constructor (name:string) {
    this.name = name
  } 
  abstract eat():any
}
class Dog extends Animal {
  constructor (name:string) {
    super(name)
  }
  //抽象类的子类必须实现抽象类里面的抽象方法
  eat () {
    console.log(`${this.name}吃粮食`);
  }
} 
let dog = new  Dog('小狗')
dog.eat()
```
## 接口
1. 接口作用:在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用，接口定义了一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里面方法的实现细节，他只规定这些类里必须提供某些方法，提供这些方法的类就可以满足实际需要
2. interface定义接口
3. 属性类型接口
```typescript
/**属性接口 -- 对json的约束 */
//ts中自定义方法传入参数时对json进行约束
function printLabel (labelInfo:{label:string}):void {
  console.log('printLabel');
}
printLabel({label : '张三'}) //正确写法
//printLabel({name : 'ddd'}) //报错，传入的对象必须有label

//对批量方法传入参数进行约束
interface FullName { //传入对象的约束，属性接口
  firstName:string
  secondName:string
}
function printName (name:FullName) {
  //要求 -- 必须传入对象，对象中必须要有firstName和secondName
  console.log(name.firstName + '--' + name.secondName);
}
function printInfo (name:FullName) {
  console.log('--' + name.firstName + '--' + name.secondName + '--');
}
//printName(123) //报错
const obj = { //传入的参数必须包含firstName和secondName
  age : 20, 
  firstName : 'z',
  secondName : '3'
}
printName(obj)
printInfo(obj)

/**接口：可选属性 */
interface FullName1 {
  firstName:string
  secondName?:string //加？表示该参数为可选参数
}
function getName (name:FullName1) {
  console.log(name.firstName + '...' + name.secondName);
}
getName({
  firstName : '111'
})
getName({
  firstName : 'aaa',
  secondName : 'eee'
})
```
4. 小案例
```typescript
/**例子 */
interface Config {
  type : string
  url : string
  data? : string
  dataType : string
}
function ajax (config:Config) {
  var xhr = new XMLHttpRequest()
  xhr.open(config.type , config.url, true)
  xhr.send(config.data)
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log('success');
      if (config.dataType == 'json') {
        JSON.parse(xhr.responseText)
      } else {
        console.log(xhr.responseText);
      }
    }
  }
}
ajax({
  type : 'get',
  url : 'http://www.baidu.com',
  dataType : 'json',
  data : 'name=123'
})
```
5. 函数类型接口 -- 对方法传入的参数以及返回值进行约束,批量约束
```typescript
/**函数类型接口 -- 对方法传入的参数以及返回值进行约束 */
//加密的函数类型接口
interface encrypt {
  (key:string, value:string):string
}
let md5:encrypt = function (key:string, value:string):string {//必须满足接口约束
  return (key + value)
}
console.log(md5('z','s'));
```
6. 可索引接口
- 对数组的约束
```typescript
/**可索引接口 -- 对数组的约束 */
interface UserArr {
  [index:number]:string
}
let ar1:UserArr = ['aaa', 'bbb']
console.log(ar1[0]);
```

- 对对象的约束
```typescript
interface UserObj {
  [index:string]:string
}
let obj:UserObj = {
  name : '20',
  age : '20'
}
```
7. 类类型接口
```javascript
interface Animal1 {
  name:string
  eat1(str:string):void
}
class Dog1 implements Animal1 {
  name:string
  constructor (name:string) {
    this.name = name
  }
  eat1 () {
    console.log(this.name + '吃粮食');
  }
}
const dog1 = new Dog1('小黑')
dog1.eat1()
class Cat1 implements Animal1 {
  name:string;
  constructor (name:string) {
    this.name = name
  }
  eat1 (food:string) {
    console.log(this.name + '吃' + food);
  }
}
let ca = new Cat1('小花')
ca.eat1('老鼠')
```
8. 接口的扩展 -- 接口继承接口
```typescript
/** 接口的扩展 -- 接口可以继承接口 */
interface Animal2 {
  eat ():void
}
interface Person extends Animal2 {
  work ():void
}
class Program {
  public name:string
  constructor (name:string) {
    this.name = name
  }
  coding (coding:string) {
    console.log(this.name + coding);
  }
}
class Man extends Program implements Person {
  constructor (name:string) {
    super(name)
  }
  eat () {
    console.log(this.name + '在吃饭');
  }
  work () {
    console.log(this.name + '在写代码');
  }
}

let m = new Man('小李')
m.eat() //小李在吃饭
m.work() //小李在写代码
m.coding('java')//小李Java
```
## 泛型
1. 泛型：软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性，组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能
2. 在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据，这样用户就可以以自己的数据类型来使用组件
3. 通俗的来说：泛型就是解决类、接口、方法的复用性、以及对不特定数据类型的支持
4. 泛型的定义和泛型的函数
```typescript
/** 泛型：可以支持不特定的数据类型  要求：传入的参数和返回的参数一致 */
// T表示泛型，具体什么类型是调用这个方法的时候决定的
function getDate<T>(value:T):T {
  return value
}
console.log(getDate<number>(123));
console.log(getDate<string>('222'));
```
5. 泛型类
```typescript
/** 泛型类：比如有个最小堆算法，需要同时支持返回数字和字符串两种类型，通过类的泛型来实现*/ 
class MinClass<T> {
  public list:T[] = []
  add (num:T):void {
    this.list.push(num)
  }
  min ():T {
    let minNum = this.list[0]
    for (let i=0; i<this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i]
      }
    }
    return minNum
  }
}
let m1 = new MinClass<number>() //实例化类，并且指定类的类型是number
m1.add(2)
m1.add(44)
m1.add(3)
m1.add(5)
m1.add(12)
console.log(m1.min())
let m2 = new MinClass<string>()//实例化类，并且指定类的类型是string
m2.add('12')
m2.add('13')
m2.add('14')
console.log(m2.min());
```
6. 泛型类接口
```typescript
//第一种定义泛型接口的方法
interface ConfigFn {
  <T>(value:T):T 
}
const setDate:ConfigFn = function <T>(value:T):T {
  return (value)
}
setDate<string>('123')
setDate<number>(1222)
//第二种定义泛型接口的方法
interface ConfigFn<T> {
  (value:T):T 
}
function getDate<T>(value:T):T {
  return (value)
}
let myGetDate:ConfigFn<string> = getDate
myGetDate('123')
```
7. 把类作为参数来约束数据传入类型
```typescript
/**
 * 定义一个User类，这个类的作用就是映射数据库字段，
 * 然后再定义一个MsqlDb的类，这个类用于操作数据库，
 * 然后把User类作为参数传入到MsqlDb
 */
/*普通写法*/
class User {
  username:string | undefined; //不加undefined会报错
  password:string | undefined
}
class MySqlDb {
  add (user:User):boolean {
    console.log(user);
    console.log(user.username);
    return true
  }
}
let u = new User()
u.username = '张三'
u.password = '122'
let my = new MySqlDb()
my.add(u)
/**泛型写法*/
class User {
  username:string | undefined; //不加undefined会报错
  password:string | undefined
}
//操作数据库对额泛型类
class MySqlDb<T> {
  add (user:T):boolean {
    console.log(user);
    return true
  }
}
let u = new User()
u.username = '张三'
u.password = '1223'
//User类当作参数传入泛型类中
let my = new MySqlDb<User>()
my.add(u)
//my.add('1223')//报错
/*第三种写法*/
class User {
  username:string | undefined; //不加undefined会报错
  password:string | undefined
  constructor (params:{
    username:string | undefined
    password:string | undefined
  }) {
    this.username = params.username
    this.password = params.password
  }
}
class MySqlDb<T> {
  add (user:T):boolean {
    console.log(user);
    return true
  }
}
let u = new User({
  username : '张三',
  password : '12312'
})
//User类当作参数传入泛型类中
let my = new MySqlDb<User>()
my.add(u)
```
8. 小案例
```typescript
/**
 * 功能：定义一个操作数据库的库，支持MySQL，Mssql, MongoDb
 * 要求：MySQL，Mssql, MongoDb功能一样，都有add, delete, update, get方法
 * 注意：约束统一的规范以及代码重用
 * 解决方案：需要约束规范所以要定义接口，需要代码重用，所以要用到泛型
 *  
 */
interface DBI<T> {
  add (info:T):boolean;
  update (info:T, id:number):boolean;
  delete (id:number):boolean;
  get (id:number):any[] // 返回任意类型的数组
}
//定义一个操作MySQL数据库的类
// 要实现泛型接口，这个类也应该是泛型类
class MySqlDb<T> implements DBI<T> {
  constructor () {
    console.log('建立数据库链接');
  }
  add(info: T): boolean {
    console.log(info);
    return true
  }
  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  }
  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }
  get(id: number): any[] {
    let list = [
      {
        title: 'xxxx',
        dec: 'xxxxxxxx'
      },
      {
        title: 'xxxx',
        dec: 'xxxxxxx'
      }
    ]
    return list
  }
}
class MssqlDb<T> implements DBI<T> {
  add(info: T): boolean {
    console.log(info);
    return true
  }
  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  }
  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }
  get(id: number): any[] {
    let list = [
      {
        title: 'xxxx',
        dec: 'xxxxxxxx'
      },
      {
        title: 'xxxx',
        dec: 'xxxxxxx'
      }
    ]
    return list
  }
  
}
// 操作用户表   定义一个user类和数据表映射
class User {
  username: string | undefined
  password: string | undefined
}
let u = new User()
u.username = '张三'
u.password = '2222'

let omysql = new MySqlDb<User>()
let omssql = new MssqlDb<User>()
//omysql.add(u)
omssql.add(u)
// 获取ID=4的数据
let data = omssql.get(4)
console.log(data);
```
## 模块
### 内部模块
1. 又称命名空间
   - 在代码量较大的情况下，为了避免各种变量名相冲突，可将相似功能的函数类，接口等放置到命名空间内
   - 同Java包、.net的命名空间一样，Ts的命名空间可以将代码包裹起来，之对外暴露需要在外部访问的对象，命名空间内的对象通过export导出

### 外部模块 -- 简称模块
### 命名空间和模块的区别
1. 命名空间：内部模块，主要用于组织代码，避免命名冲突
2. 模块： ts外部模块的简称，侧重代码的复用，一个模块里可能有多个命名空间

## 装饰器
1. 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以修改类的行为
2. 通俗的讲，装饰器就是一个方法，可以注入到类，方法，属性参数上扩展类，属性，方法，参数的功能
3. 常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器
4. 装饰器的写法：普通装饰器(无法传参)，装饰器工厂(可传参)
5. 装饰器是过去几年中js的最大成就之一，已经是ES7标准特性之一
### 类装饰器
1. 类装饰器再类声明之前被声明(仅靠着类声明)，类装饰器应用于类构造函数。可以用来监视，修改、替换类定义
2. 普通装饰器(无法传参数)写法
```typescript
//类装饰器 
function logClass (params:any) {
  console.log(params);
  // params就是当前类
  params.prototype.apiUrl = 'xxxxx' //动态扩展的属性
  params.prototype.run = function () {
    console.log('我是run方法');
  }
}
@logClass
class HttpClient {
  constructor () {

  }
  getData() {

  }
}
let client:any = new HttpClient()
console.log(client.apiUrl);
console.log(client.run());
```
3. 装饰器工厂写法
```typescript
//装饰器工厂
function logClass (params:string) {
  return function (target:any) {
    console.log(target); // 当前的类
    console.log(params); // 传入的参数：hello
    target.prototype.ap = 'wwwww'
  }
}
@logClass('hello')
class HttpClient {
  constructor () {

  }
  getdata () {

  }
}
let ccc:any = new HttpClient()
console.log(ccc.ap);
```
4. 小案例
```typescript
/**
 * 重载构造函数的例子
 * 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一参数
 * 如果类装饰器返回一个值，他会使用提供的构造函数来替换类的声明
 */
function logClass (params:any) {
  console.log(params); // 当前类
  return class extends params {
    apUrl:any = '我是修改后的URL'
    getData () {
      console.log(this.apUrl + '----');
    }
  }
}
@logClass
class HttpClient {
  public apUrl:string | undefined
  constructor () {
    this.apUrl = 'wwweee'
  }
  getData () {
    console.log(this.apUrl);
  }
}
let http = new HttpClient()
http.getData()
```
### 属性装饰器
1. 属性装饰器表达式会在运行时当作函数被调用，传入下列两个参数
   - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
   - 成员名字
```typescript
/**属性装饰器 */
function logProperty (params:any) {
  return function (target:any, attr:any) {
    console.log('attr:' + attr);
    console.log('属性target:' + target);
    target[attr] = params
  }
} 
//类装饰器
function logClass (params:any) {
  return function (target:any) {
    console.log('类target:' + target);
    console.log('params:' + params);
  }
}

@logClass('xxxx')
class HttpClient {
  @logProperty('xxxx222')
  public url:string | undefined
  constructor () {

  }
  getData () {
    console.log('url:' + this.url);
  }
}
let htt = new HttpClient()
htt.getData() // xxxx222
```
### 方法装饰器
1. 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义
2. 传入一下参数：
   - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
   - 成员的名字
   - 成员的属性描述符
```typescript
/**方法装饰器 */
function lgMessage (params:any) {
  return function (target:any, methodsName:any, desc:any) {
    console.log(target);
    console.log(methodsName);
    console.log(desc.value); // 当前的方法
    // target.apiUrl = 'llllg'
    // target.run = function () {
    //   console.log('我是run');
    // }
    /**修改装饰器的方法 -- 把装饰器里面传入的所有参数改为string类型 */
    // 1.保存当前的方法
    let oMethods = desc.value
    // 2.修改方法
    desc.value = function (...args:any[]) { //使用三点运算符接收参数
      args = args.map((value) => {
        return String(value)
      })
      console.log(args);
      oMethods.apply(this, args)
    }
  }
}
class HttpClient {
  public url:string | undefined
  constructor () {

  }
  @lgMessage('methods')
  getData (...args:any) {
    console.log(args);//["1222", "3333"]
    console.log('我是getData里面的方法');
  }
}
let h:any = new HttpClient()
// h.run()
// console.log(h.apiUrl);
h.getData('1222','3333') //["1222", "3333"] 我是getData里面的方法
```
### 方法参数装饰器
1. 参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据
2. 参数如下：
   - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
   - 方法的名字
   - 参数在函数参数列表中的索引
```typescript
/***参数装饰器 */
function logParams (params:any) {
  return function (target:any, methodsName:any, paramsIndex:any) {
    console.log(params); //uuid
    console.log(target);
    console.log(methodsName);
    console.log(paramsIndex);
    target.apiUrl = params
  }
}
class HttpClient {
  public url:string | undefined
  constructor () {
  }
  getData (@logParams('uuid') uuid:any) {
    console.log(uuid); // 12345
  }
}
let h:any = new HttpClient()
h.getData(12345)
console.log(h.apiUrl); //uuid
```
### 装饰器的执行顺序
1. 属性 > 方法 > 方法参数 > 类
2. 如果有多个同样的装饰器，会先执行后面的