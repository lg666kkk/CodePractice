## day6笔记
### 一、path路径操作模块
#### path.basename()
1. 语法： path.basename(path, [ext])
   -  ext: 可选的文件扩展名
2. path.basename()方法返回path的最后一部分,尾部的目录分隔符将被忽略
```javascript
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'
```
#### path.delimiter()
1. 作用:提供平台特定的路径定界符
   - `;` 用于 Windows
   - `:` 用于POSIX
```javascript
/* POSIX */
console.log(process.env.PATH);
// 打印: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
process.env.PATH.split(path.delimiter);
// 返回: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']

/* windows */
console.log(process.env.PATH);
// 打印: 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'
process.env.PATH.split(path.delimiter);
// 返回: ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']
```
#### path.dirname()
1. 语法：path.dirname(path)
2. 作用: path.dirname()方法返回path的目录名
3. 如果path不是字符串，则抛出TypeError
```javascript
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
```
####  path.extname()
1. 语法：path.extname(path)
2. 作用:path.extname() 方法返回 path 的扩展名，从最后一次出现`. (句点)`字符到path最后一部分的字符串结束。 如果在 path 的最后一部分中没有`.`，或者如果path的基本名称(参阅 path.basename())除了第一个字符以外没有`.`，则返回空字符串
3. 如果path不是字符串，则抛出TypeError
```javascript
path.extname('index.html');
// 返回: '.html'
path.extname('index.coffee.md');
// 返回: '.md'
path.extname('index.');
// 返回: '.'
path.extname('index');
// 返回: ''
path.extname('.index');
// 返回: ''
path.extname('.index.md');
// 返回: '.md'
```
#### path.isAbsolute()
1. 语法:path.isAbsolute(path)
2. 作用:path.isAbsolute() 方法检测 path 是否为绝对路径
2. 如果给定的path是零长度字符串，则返回false
4. 如果path不是字符串，则抛出TypeError
```javascript
// 在POSIX上
path.isAbsolute('/foo/bar'); // true
path.isAbsolute('/baz/..');  // true
path.isAbsolute('qux/');     // false
path.isAbsolute('.');        // false
// windows上
path.isAbsolute('//server');    // true
path.isAbsolute('\\\\server');  // true
path.isAbsolute('C:/foo/..');   // true
path.isAbsolute('C:\\foo\\..'); // true
path.isAbsolute('bar\\baz');    // false
path.isAbsolute('bar/baz');     // false
path.isAbsolute('.');           // false
```
#### path.join()
1. 语法:path.join([...paths])
2. 作用: path.join()方法使用平台特定的分隔符作为定界符将所有给定的path片段连接在一起，然后规范化生成的路径,零长度的 path 片段会被忽略。如果连接的路径字符串是零长度的字符串，则返回 '.'，表示当前工作目录
3. 如果任何路径片段不是字符串，则抛出TypeError
```javascript
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
path.join('foo', {}, 'bar');
// 抛出 'TypeError: Path must be a string. Received {}'
```
#### path.parse()
1. 语法: path.parse(path)
2. 作用: path.parse()方法返回一个对象，其属性表示path的重要元素。尾部的目录分隔符将被忽略
3. 返回的对象将具有以下属性：
   - dir
   - root
   - base
   - name
   - ext
4. 在POSIX上
```javascript
path.parse('/home/user/dir/file.txt');
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```
```javascript
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
（"" 行中的所有空格都应该被忽略，它们纯粹是为了格式化）
```
5. 在windows上
```javascript
path.parse('C:\\path\\dir\\file.txt');
// 返回:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```
```javascript
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
" C:\      path\dir   \ file  .txt "
└──────┴──────────────┴──────┴─────┘
（"" 行中的所有空格都应该被忽略，它们纯粹是为了格式化）
```
6. 如果path不是字符串，则抛出TypeError
### 二、Node中的非模块成员
1. 在每个模块中除了`require`、`exports`等模块相关API之外，还有两个特殊的变量成员
   - `__dirname`: 可以用来**动态**获取当前文件模块所属目录的绝对路径
   - `__filename`:可以用来**动态**获取当前文件的绝对路径
   - `__dirname`和`__filename`是不受执行node命令所属路径影响的
   - 所以在拼接路径的过程中建议多使用`path.join`方法来辅助拼接
   - 为了避免出错，在文件操作中的使用的相对路径都统一转换为**动态的绝对路径**
   - **应该注意：模块中的路径标识和这没关系，不受执行node命令所处位置影响,如下图**

<img src="../img/777.PNG">

2. `注意这个坑！！`

<img src="../img/4444.PNG">

<img src='../img/555.PNG'>

- 图中的`./a.txt`相对于当前文件路径
- 由上图也可以看出 `./a.txt`相当于执行node命令所处的终端路径
- 第二张图片中的不是错误，Node就是这样设计的，`就是说，文件操作中，相对路径设计的就是相对于执行node命令所处的路径`
- 在文件操作中，使用相对路径是不可靠的，因为在Node中文件操作的路径被设计为相对于node命令所处的路径，所以为了解决这个问题，很简单，只要把相对路径变为绝对路径就可以了
- 这类我们可以使用`__dirname`或者`__filename`来帮我们解决了

<img src='../img/666.PNG'>

### 三、art-template模板的深入使用
#### 模板继承
1. 抽出每个页面中相同的部分，如头部和尾部，在其他模板中继承使用

#### 子模板

### Express 中间件

1. 中间件的本质就是一个请求处理方法，我们把用户从请求到响应的整个过程分发到多个中间件去处理，这样做的目的是提高代码灵活性，动态可扩展性
   - 同一个请求所经过的中间件都是同一个请求对象和响应对象

```javascript
const express = require('express')
const app = express()
/// 中间件：处理请求，本质是一个函数
// 在express中对中间件有几种分类
// 当请求进来，会从第一个中间件进行匹配，如果匹配，则进来(进入该中间件之后，如果没有调用next，则请求会留在当前中间件)，如果不匹配，则继续判断匹配下一个中间件
/**
 * 1. 不关心请求路径和请求方法的中间件，也就是说，任何请求都会进入这个中间件
 */
/**
 * 中间件本身是一个方法，该方法接收三个参数
 *     Request 请求对象
 *     Response 响应对象
 *     next     下一个中间件
 * 当一个请求进入中间件之后，如果不调用next则会停留在当前中间件，所以next是一个方法，用来调用下一个中间件
 * next也是要匹配的，不是调用紧挨着的哪一个
 * 
 */
// app.use(function (req, res, next) {
//   console.log("请求进来了1");
//   next()
// })
// app.use(function (req, res, next) {
//   console.log("请求进来了2");
// })
/**
 * 2.关心请求路径的中间件(以/xxx开头的路径中间件)
 */
app.use('/a', function (req, res, next) {
  console.log(req.url); // 打印出/a之后的内容
})
/**
 * 除了以上中间件之外，还有一种最常用的： 严格匹配请求方法和请求路径的中间件：
 *    app.get 
 *    app.post
*/
app.get("/", function (req, res, next) {
  fs.readFile('./sss/ddd', function (err, data) {
    if (err) {
      // 当发生错误的时候，我们可以调用next传递错误对象，然后就会被全局错误处理中间件匹配到并处理之
      next(err) // 传入参数Err会直接进入错误处理中间件
    }
  })
})
// 如果没有能匹配的中间件，则Express会默认输出 Cannot GET 路径
// 配置错误处理中间件
app.use(function (err, req, res, next) {
  //console.log("报错了");
  res.status(500).send(err.message)
})
app.listen(3000, function () {
  console.log("Server is running ..");
})
```

2. 第三方中间件

   - body-parser

   - comprossion

   - cookie-parser

   - morgan

   - session

   - serve-static

     

