# Node笔记总结

## day1

### 文件模块

**文件操作中的方法都是异步的**

```javascript
// 加载文件操作的核心模块
const fs = require('fs')
/**
 * 读取文件
 *   第一个参数是要读取的文件路径
 *   第二个参数是回调函数
 *        error 
 *          如果读取失败，error是错误对象
 *          如果读取成功，error是null
 *        data
 *          如果读取成功，data是读取到的数据
 */
fs.readFile('文件路径', function (err, data) {
  if (err) {
    console.log('读取文件失败');
  }
  console.log(data.toString());
})
/**
 * 写入文件
 * 1. 第一个参数：文件路径
 * 2. 第二个参数：写入内容
 * 3. 第三个参数：回调函数
 */
fs.writeFile('../data/qq.txt', 'node js nb', function (err) {
  if (err) {
    console.log('写入失败');
  }
})
/**
*读取目录的内容
*1. 第一个参数：文件路径
*2. 第二个参数：回调函数
*    回调有两个参数 (err, files)，其中 files 是目录中的文件名的数组（不包括 '.' 和 '..'）。
*/
const fs = require('fs')
fs.readdir('E:/app/www', function (err, files) {
  if (err) {
    console.log('目录不存在');
  }
  console.log(files);
})

```

### 使用Node构建web服务器

```javascript
// http核心模块用于构建服务器
const http = require('http')
// 使用http.createServer()创建一个web服务器，返回一个Server实例
const server = http.createServer()
// 服务器用于提供数据服务
// 注册request请求事件，当客户端请求过来，就会自动触发服务器的request事件，然后执行回调处理函数
server.on('request', function () {
  console.log('收到发送的请求了');
})
// 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('Server running ....');
})

```

### request和response对象

```javascript
const http = require('http')
const server = http.createServer()
server.on('request', function (request, response) {
  console.log('收到请求了，路径是：' + request.url);
  console.log('请求我的客户端端口号：' + request.socket.remotePort);
  console.log('请求我的IP地址为：' + request.socket.remoteAddress);
  // response对象有一个方法：write可以用来给客户端发送响应数据
  // write可以使用多次。但最后一定要要使用end()结束
  response.write('hello')
  response.write('node js')
  response.end() // 结束响应，告诉客户端，我的话说完了，你可以呈递给用户了
})
server.listen(3000, function () {
  console.log('Server running ... ');
})

```



**res.end() -- 响应内容只能是字符串或者二进制数据其他类型要使用JSON转化**

```javascript
const http = require('http')
const Serve = http.createServer()
Serve.on('request', function (req, res) {
  let url = req.url
  if (url === '/product') {
    let products = [
      {
        name : 'apple',
        price : 99
      },
      {
        name : 'apple1',
        price : 199
      },
      {
        name : 'apple2',
        price : 299
      },
      {
        name : 'apple3',
        price : 399
      }
    ]
    // 响应内容只能是字符串或者二进制数据其他类型要使用JSON转化
    res.end(JSON.stringify(products))
  }
})
Serve.listen(3000, function () {
  console.log('Serve running ...');
})
```

**res.end()发送中文内容出现乱码问题**

- 使用res.setHeader()来设定文本格式

```javascript
const http = require('http')
let serve = http.createServer()

serve.on('request', function (req, res) {
  /** 
 * 服务端默认发送的数据是UTF-8编码的
 * 但是浏览器不知道你是UTF-8编码
 * 浏览器在不知道服务器响应内容的编码情况下会按照当前操作系统默认编码去解析
 * 中文操作系统默认是gbk
 * 解决方法 -- 正确告诉浏览器我发给你的内容的编码方式
 * */
  
  let url = req.url
  if (url === '/plain') {
    /**
   * 在http协议中，Content-Type就是用来告知对方我给你发送的数据内容是什么类型
   * text/plain -- 普通文本
   * text/html -- html格式文本
   */
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('hello 使劲儿')
  } else if (url === '/html') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<p>hello 你好 <a href="www.baidu.com">百度</a></p>')
  }
  
})
serve.listen(3001, function () {
  console.log('server running ...');
})

```

- 不同资源所使用的Content-Type类型是不一样的

```javascript
/**
 * Content-Type详见以下网址
 *    https://tool.oschina.net/commons
 * 不同资源对应的Content-Type是不一样的
 */

const http = require('http')
const fs = require('fs')
let server = http.createServer()
server.on('request', function (req, res)   {
  const url = req.url
  if (url === '/') {
    fs.readFile('../resource/index.html', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件读取失败')
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/pic'){
    fs.readFile('../resource/1.jpg', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件读取失败');
      } else {
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })  
  }
})
server.listen(3002, function () {
  console.log('Server is running ... ');
})

```

### node中的简单模块化

#### node中的模块分类(三种)

1. 具名的核心模块，如fs,http等
2. 用户自己编写的文件模块
   - **相对路径必须加 ./ ,否则报错(不加./就无法与核心模块做区分)**
   - 可以省略后缀名
3. 第三方模块

#### node中的作用域

1. node中没有全局作用域，只有模块作用域

   - 外部访问不到内部
   - 内部也访问不到外部
   - 默认文件中所有的成员只在当前文件模块中有效

2. 既然是模块作用域，那么如何让模块与模块之间通信？

   - 使用require导出模块
- require 方法加载规则
     - 优先从缓存加载
     - 核心模块
     - 路径形式的模块
     - 第三方模块  -- node_modules
     
   ```javascript
   // require方法用于加载模块,还可以拿到被加载文件模块导出的接口对象
   require('./b.js')
   
   ```

#### 加载与导出

1. 每个文件模块默认提供了一个对象：exports

2. exports默认是一个空对象

3. 对于希望可以被其他模块访问的成员，我们就需要把这些公开的成员都挂载到`exports`接口对象中就可以了

   - 导出多个成员(必须在对象中)

     ```javascript
     exports.a = 123
     exports.add = function () {
       ....
     }
     exports.str = '333'
     exports.d = {
       foo : 'bar'
     }
     // 也可以使用对象的方式导出多个成员
     module.exports = {
       add: function () {
       },
       str: 'hello'
     }
     ```

   - 导出单个成员(拿到的就是:函数，字符串...)

     ```javascript
     module.exports = 'hello'
     // 以下情况会覆盖,后者会覆盖前者
     module.exports = 'hello'
     module.exports = function (x, y) {
       return x+y
     }
     ```

     

```javascript
// 从b.js中导出模块，在a.js中使用
/*
b.js中的文件内容
*/
let foo = 'bbb'
exports.foo = 'hello'
exports.add = function (x, y) {
  return x + y
}
/*
a.js中的文件内容
*/
let ret = require('./b')
console.log(ret.foo);
console.log(ret.add(10, 20));// 30
```

#### **commonJs模块规范**

1. 在Node中的JS还有一个很重要的概念：模块系统
   - 模块作用域
   - 使用require方法来加载模块
   - 使用exports接口对象来导出模块中的成员

#### exports 和 module.exports 的区别

1. 每个模块中都有一个 module 对象
2. module 对象中有一个 exports 对象
3. 我们可以把需要导出的成员都挂载到 module.exports 接口对象中
4. 也就是：`moudle.exports.xxx = xxx` 的方式
5. 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
6. 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
7. `exports === module.exports` 结果为  `true`
8. 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
9. 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
10. 不要使用 `exports = xxx` --- 不管用
11. 因为每个模块最终向外 `return` 的是 `module.exports`
12. 而 `exports` 只是 `module.exports` 的一个引用
13. 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`
14. 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的

#### **exports原理解析**

1. `exports` 是 `module.exports`的一个引用

```javascript
console.log(exports === module.exports); // true
exports.foo = 'bar'
// 等价于
module.exports.foo ='bar'
```

```javascript
/**
 * 在Node中，每个模块内部都有一个自己的module对象
 * 该module对象中，有一个成员叫exports,也是一个对象
 * 也就是说如果你需要对外带出成员，只需要把导出的成员挂载到 module.exports中
 * 每次导出接口成员是都使用module.exports.xxxx = xxx的方式很麻烦
 * 所以Node为了简化操作，提供了一个变量，exports 等于 moudle.exports
 */
// var module = {
//   exports: {
//      foo: 'bar'
//   }
// }
// 相当于 exports.foo = 'bar'
// module.exports.foo = 'bar'
// module.exports.add = function (x, y) {
//     return x+y
// }
// exports和module.exports两者一致
console.log(exports === module.exports); // true
exports.foo = 'bar'
module.exports.add = function (x, y) {
    return x+y
}
```



#### package.json 包描述文件

1. 建议每一个项目都要有一个`package.json`文件(包描述文件)，就像产品的说明书一样

2. 这个文件可以通过`npm init`方式自动初始化出来,目前来讲，最有用的是`dependencies`,可以用来帮助我们保存第三方包的依赖信息

3. 建议每个项目根目录下都有`package.json`文件

4. 建议执行`npm install 包名`的时候都加上`--save`,目的是用来保存依赖项信息

5. 如果你的`node_modules`删除了也不用担心，我们只需：`npm install`就会自动把`package.json`中的`dependecies`中的所有依赖项都下载回来

```javascript
PS E:\111> npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (111)
version: (1.0.0) 0.0.1
description: 这是一个测试文件
entry point: (index.js) main.js
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to E:\111\package.json:

{
  "name": "111",
  "version": "0.0.1",
  "description": "这是一个测试文件",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
PS E:\111> npm install --save jquery
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN 111@0.0.1 No repository field.
```

![](E:\GitResort\CodePractice\Node\img\11.PNG)

#### npm 常用命令

1. npm init 
   - npm init -y 可以跳过向导，快速生成
2. npm install
   - 下载所有依赖项
3. npm install 包名 
   - 只下载
   - 简写：npm i 包名
4. npm install --save 包名
   - 下载并且保存依赖项(package.json)
   - 简写：npm i -S 包名
5. npm uninstall 包名
   - 只删除，如果有依赖项依然保存
   - 简写：npm un 包名
6. npm uninstall --save 包名
   - 同时删除依赖信息
   - npm un --save 包名

## day2

### 初步实现Apache功能

```javascript
const http = require('http')
const fs = require('fs')
let wwwDir = 'E:/app/www'
let server = http.createServer()

server.on('request', function (req, res) {
  // console.log(req.url);
  let url = req.url
  if (url === '/') {
    fs.readFile(wwwDir + '/index.html', function (err, data) {
      if (err) {
        res.end('404 not find   Page')
        return 
      }
      res.end(data)
    })
  } else if (url === '/index.html') {
    fs.readFile(wwwDir + '/index.html', function (err, data) {
      if (err) {
        res.end('404 not find   Page')
        return 
      }
      res.end(data)
    })
  } else if (url === '/index.txt') {
    fs.readFile(wwwDir + '/index.txt', function (err, data) {
      if (err) {
        res.end('404 not find   Page')
        return 
      }
      res.end(data)
    })
  } else if (url === '/apple') {
    fs.readFile(wwwDir + '/apple', function (err, data) {
      if (err) {
        res.end('404 not find   Page')
        return 
      }
      res.end(data)
    })
  }
})
server.listen(3000, function () {
  console.log('Server is running ... ');
})
```

### 使用模板引擎生成类似与Apache一样的目录

#### art-template模板引擎

1. art-template不仅可以在浏览器使用，也可以在node中使用
2. 安装

```powershell
//安装
npm install art-template --save
//加载
const template = require('art-template')
```

3. 使用模板引擎渲染页面
   - 使用render(页面，数据)

```javascript
const fs = require('fs')
const template = require('art-template')
fs.readFile('./tpl.html', function (err, data)   {
  if (err) {
    console.log('文件读取失败');
  }
  // data是二进制数据，转换为String
  data = data.toString()
  let ret = template.render( data,{
    name: 'jack',
    age: 20,
    provience : '甘肃',
    hobbies: [
      '222',
      '333',
      '444'
    ]
  })
  console.log(ret);
})
```

### URL核心模块

![](E:\GitResort\CodePractice\Node\img\111.PNG)

上图是node官网中的一张图，在node中，url模块提供了两套API来处理URL：一个是旧版本遗留的 API，一个是实现了 WHATWG标准的新 API。上图中，下方的是WHATWG的URL对象的属性，上方是旧的URL对象属性。

#### **URL(Universal Resource Locator，统一资源定位符)的组成**

1. URL主要包含：协议、主机、端口号、路径、参数、查询等
2. URL由三部分组成：协议类型，主机名和路径及文件名

#### **protocol(协议类型)：**

1. 表示访问资源和服务的协议

2. 常见的协议类型有：http,ftp,mailto,file等

- http:超文本传输协议,是因特网上应用最为广泛的网络传输协议。格式为http://
-  ftp:文件传输协议。格式为ftp://
- file:访问本地计算机上的资源。格式为file:///
- mailto:个用于发送邮件的URL协议。格式为mailto:
- ...

#### **hostname -- 主机名**

#### **port -- 端口号**

1. 类似于房间号

#### **pathname -- 文件路径**

1. 由零或多个“/”符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。

#### **search -- 查询部分(?query)**

1. 可选，用于给动态网页（如使用CGI、ISAPI、PHP/JSP/ASP/ASP.NET等技术制作的网页）传递参数，可有多个参数，用“&”符号隔开，每个参数的名和值用“=”符号隔开

#### **hash**

### **Node中常用的URL操作命令**

1. url.parse()方法

```javascript
url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash')
// 得到的结果如下
Url {
  protocol: 'https:', // 协议
  slashes: true, // (协议的“：”号后是否有“/”)(slashes意思是斜杠)
  auth: 'user:pass', // // 用户名，密码
  host: 'sub.host.com:8080',// host主机名
  port: '8080', // 端口号
  hostname: 'sub.host.com', // 不带端口号的主机名
  hash: '#hash', // 哈希值(URL属性中在井号“#”后面的分段)
  search: '?query=string', // 查询字符串(URL属性中跟在问号后面的部分包括?号)
  query: 'query=string', // 请求参数
  pathname: '/p/a/t/h', // 路径名
  path: '/p/a/t/h?query=string', // 带查询的路径名
  href:
   'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash' // 原字符串本身
}
/**
 * 加true与不加true区别
 *   query解析出来的类型不同，加true时为object
*/
url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash', true)
// 得到的结果如下
Url {
  protocol: 'https:',
  slashes: true,     
  auth: 'user:pass', 
  host: 'sub.host.com:8080',
  port: '8080',
  hostname: 'sub.host.com',
  hash: '#hash',
  search: '?query=string',
  query: [Object: null prototype] { query: 'string' },
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href:
   'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash' }
```

2. url.host()

3. url.hash()

4. url.hostname()

   - 获取及设置 URL 的主机名部分

5. url.href()

6. url.origin()

   - 获取只读的序列化的 URL的origin

7. url.password()

   - 获取及设置 URL 的密码部分。

8. url.pathname()

   - 获取及设置 URL 的路径部分

9. url.port()

   -  获取及设置 URL 的端口部分

10. url.protocol() -- 获取及设置 URL 的协议部分

11. url.toString()

    - 在 URL 对象上调用 toString() 方法将返回序列化的 URL。 返回值与 url.href 和 url.toJSON() 的相同。
    - 由于需要符合标准，此方法不允许用户自定义URL的序列化过程。如果需要更大灵活性，require('url').format()可能更合适。

12. url.toJSon()

    - 在 URL 对象上调用toJSON()方法将返回序列化的URL。返回值与url.href和url.toString()的相同 

13. url.search()

    - 获取及设置 URL 的序列化查询部分。

    ```javascript
    const myURL = new URL('https://example.org/abc?123');
    
    console.log(myURL.search);
    // 打印 ?123
    
    myURL.search = 'abc=xyz';
    
    console.log(myURL.href);
    
    // 打印 https://example.org/abc?abc=xyz
    ```

### 留言本案例

## day3

1. 文件操作路径

```javascript
const fs = require('fs')

// 文件操作中的行对路径可以省略./
/**
 * 使用的所有文件操作的API都是异步的
 * 在文件操作的相对路径中
 *    ./data/a.txt  相对于当前目录
 *     data/a.txt   相对于当前目录
 *     /data/a.txt   当前文件模块所属磁盘根目录 D:/data/a.txt
 */
fs.readFile('data/a.txt', function (err, data) {
  if (err) {
    console.log('读取失败');
  }
  console.log(data.toString());
})  

// 在模块加载中，相对路径中的 ./ 不能省略
// require('data/foo.js') // 会报错
require('./data/foo')('hello')
```

2. 模块操作路径

```javascript
// 在模块加载中，相对路径中的 ./ 不能省略
// require('data/foo.js') // 会报错
require('./data/foo')('hello')
```

3. **修改完代码自动重启工具**
   - 可以使用一个第三方命令行工具：`nodemon` 来帮我们解决频繁修改代码重启服务器问题

```javascript
// 安装
npm install -global nodemon 
// 以前都是使用node app.js启动
// 现在使用
nodemon app.js
```

### Express框架

#### 安装

```javascript
npm install express
```

#### 使用

```javascript
const express = require('express')

// 创建app
let app = express() // 相当于http.createServer()

app.get('/', function (req, res) {
  // res.end('hello world') // 原来的api都可以用
  res.send('hello world3')
})

app.listen(3000, function () {
  console.log('app is running ...');
})
```

#### **基本路由**

1. **路由器**
   - 请求方法
   - 请求路径
   - 请求处理函数
2. get

```javascript
// 以GET方法请求/时，执行对应处理函数
app.get('/', function (req, res) {
  res.send('hello world')
})
```

3. post

```javascript
app.post('/', function (req, res) {
  res.send('hello world')
})
```

#### **配置静态资源服务**

```javascript
// 当以 /public/ 开头时，去./public/对应的目录中查找
app.use('/public/', express.static('./public/'))
```

#### **在Express中使用`art-template`**

1. 安装

```javascript
npm install --save art-template
npm install --save express-art-template
```

2. 配置

```javascript
app.engine('html', require('express-art-template'));
```

1. 使用

```javascript
// 配置使用art-template模板引擎
/**
 * 1. app.engine('art', require('express-art-template'));
 *   第一个参数表示当渲染以 .art 结尾的文件的时候，使用art-tenplate模板引擎
 *   express-art-template 是专门用来在Express中把art-template整合到Express中的，虽然不需要单独加载art-template,
 *   但是需要安装art-template,原因在于express-art-template依赖了art-template
 * 2. Express 为Response相应的提供了一个方法：render
 *  render方法默认是不可以使用的，但是如果配置了模板引擎就可以使用了
 *  res.render('html模板名', {模板数据})
 *    第一个参数不能写路径，默认会去项目的views目录中查找该模板文件
 *    如果要修改默认的views路径，可以使用：app.set('views', render函数的默认路径)
 */
app.engine('html', require('express-art-template'));
app.get('/', function (req, res) {
  res.render('index.html', {
    comments:comment
  })
})
```

#### **在Express中获取表单post请求体数据**

1. 在Express中没有内置获取表单POST的API，这我们需要使用一个第三方包：`body-parser`
2. **安装**

```javascript
npm install --save body-parser
```

3. 配置

```javascript
var express = require('express')
// 引包
var bodyParser = require('body-parser')
var app = express()
// 配置body-parser
// 只要加入这个配置，则在req请求对象上会多出来一个属性：body
// 也就是说你可以直接通过req.body来获取表单请求体数据了
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})
```

#### **在Express中获取表单GET请求参数**

```javascript
// Express内置了API，可以直接通过req.query来获取
req.query
```

### 案例
#### 处理模板
#### 配置静态开放资源
```javascript
// 当以 /public/ 开头时，去./public/对应的目录中查找
app.use('/public/', express.static('./public/'))
```
#### 配置art-template模板引擎(Express中使用art-template)
1. 安装
```shell
npm install --save art-template
npm install --save express-art-template
```
2. 配置
```javascript
app.engine('html', require('express-art-template'));
```
3. 使用
```javascript
app.get('/', function (req, res) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});
```
#### 简单路由: /student 渲染静态页
路由设计

| 请求方法 |   请求路径     | get参数   |       post参数            |       备注      |
|:------: |  :--------:    | :-----:  |        :------:           |       :----:    |
|   GET   |    /student    |          |                           |     渲染首页     |
|   GET   |  /student/news |          |                           |  渲染添加学生页面 |
|   POST  |  /student/news |          | name、age、gender、hobbies | 处理添加学生请求  |
|   GET   |  /student/edit | id       |                           |  渲染编辑页面     |
|   POST  |  /student/edit |          | name,age,gender,hobbies,id| 处理编辑请求|
|   GET   |  /student/delete | id     |                           | 处理删除请求 |
#### 提取路由模块 -- 模块职责要单一
- 将路由相关的代码提取到router.js文件中
- 方法一
```javascript
// router.js
module.exports = function (app) {
  ...
}
// app.js
const router = require('router.js路径')
router(app)
```

- 方法二 : 这种方法是专门用于Express中包装路由的
```javascript
/** router.js */
const express = require('express')
// 创建一个路由容器
let router = express.Router()
//把路由都挂载到router路由容器中
router.get('/', function (req, res) {})
// 把router导出
module.exports = router
/** app.js */
const router = require('router.js路径')
// 把路由挂载到app服务中
app.use(router)
```
#### 由于接下来一系列操作都需要处理文件数据,所以我们需要封装student.js
1. student.js中的方法专门用于操作文件db.json,之处理数据，不关心业务(比如如何获取表单数据啊，如何发送响应之类的不关心)
2. 操作数据的API文件模块
```javascript
/**
 * 获取所有学生列表
 */
exports.findAll = function () {

}
/**
 * 保存学生
 */
exports.save = function () {

}
/**
 * 跟新学生
 */
exports.update = function () {
  
}
/**
 * 删除学生 
 */
exports.delete = function () {
  
}
```
#### 先编写student.js文件结构
1. findAll
   - fs.readFile()是异步操作
   - 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
```javascript
/**
 * // 异步操作通过回调函数来获取结果
function fn (callback) {
  setTimeout(function () {
    var data = 'hello'
    callback(data)
  }, 1000)
}
fn(function (data) {
  console.log(data)
})
*/
// 方法一： 使用回调函数
exports.findAll = function (callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err)
    }
    // 获取到数据，error对象为空，无论如何，第一个参数为error
    callback(null, JSON.parse(data).student)
  })
}
// 方法二：使用promise
exports.findAll = function () {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data).student)
    })
  })
}
```
2. findById: 根据ID获取学生对象
```javascript
exports.finById = function (id, callback) {
  fs.readFile(dbPath, "utf8",function (err, data) {
    if (err) {
      return callback(err)
    }
    // 获取到数据，error对象为空，无论如何，第一个参数为error
    let students = JSON.parse(data).student
    let ret = students.find(function (item) {
      return item.id = parseInt(id)
    })
    callback(null, ret)
  })
}
```
3. save
```javascript
// 回调函数实现
exports.save = function (student, callback) {
  fs.readFile(dbPath, "utf8",function (err, data) {
    if (err) {
      return callback(err)
    }
    // 获取到数据，error对象为空，无论如何，第一个参数为error
    let students = JSON.parse(data).student
    // 添加id
    student.id = students.length===0 ? 1 : (students[students.length - 1].id + 1)
    students.push(student)
    // 将字符串转化成对象
    let file = JSON.stringify({
      student:students
    })
    fs.writeFile(dbPath, file, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}
// promise实现
exports.save = function (student) {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, "utf8", function (err, data) {
      if (err) {
        reject(err)
      }
      let students = JSON.parse(data).student
      student.id = students.length === 0 ? 1 : (students[students.length - 1].id + 1)
      students.push(student)
      let file = JSON.stringify({
        student: students
      })
      fs.writeFile(dbPath, file, function (err) {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  })
}
```
4. update
- 由于需要id,所以在edit.html中要添加`<input type="hidden" name="id" value="{{ student.id }}">`
- type为hidden主要用来存放一些不希望被用户看到，但是需要被提交到服务端的数据
```javascript
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, "utf8",function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).student
    // 将id通一转换为数字类型
    student.id = parseInt(student.id)
    // 你要修改谁，就要根据ID找出那个需要修改的对象
    let stu = students.find(function (item) {
      return item.id === parseInt(student.id)
    })
    // 遍历拷贝对象
    for (let key in student) {
      stu[key] = student[key]
    }
    let file = JSON.stringify({
      student:students
    })
    fs.writeFile(dbPath, file, function (err) {
        if (err) {
          return callback(err)
        }
        callback(null)
    })
  })
}
```
5. delete
```javascript
exports.delete = function (id, callback) {
  fs.readFile(dbPath, "utf8",function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).student
    let delId = students.findIndex(function (item) {
      return item.id === parseInt(id)
    })
    students.splice(delId, 1)
    let file = JSON.stringify({
      student:students
    })
    fs.writeFile(dbPath, file, function (err) {
        if (err) {
          return callback(err)
        }
        callback(null)
    })
  })
}
```
#### 实现具体功能
1. 通过路由收到请求
2. 接受请求中的数据(get, post)
   * get -- req.query
   * post -- req.body
```javascript
// 在Express中获取表单post请求体数据
/**
 * 1. 在Express中没有内置获取表单POST的API，这我们需要使用一个第三方包：`body-parser`
 *    npm install --save body-parser
 * 2. 配置，代码如下
*/
var express = require('express')
// 引包
var bodyParser = require('body-parser')
var app = express()
// 配置body-parser
// 只要加入这个配置，则在req请求对象上会多出来一个属性：body
// 也就是说你可以直接通过req.body来获取表单请求体数据了
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})
```
3. 调用数据操作API处理数据
4. 根据操作结果给客户端发送响应
#### 业务功能顺序
   - 列表
   - 添加
   - 编辑
   - 删除

## day4
### 封装ajax方法
```javascript
function get (url, callback) {
  var oReq = new XMLHttpRequest()
  // 当请求加载成功之后要调用指定的函数
  oReq.onload = function () {
    callback(oReq.responseText);
  }
  oReq.open('get', url, true)
  oReq.send()
}
get('data.json', function (data) {
  console.log(data);
})
```
### JS模块化
1. Node -- CommonJs
2. 浏览器
   - AMD -- require.js
   - CMD -- sea.js
3. ES6 -- 官方的
### package.json和package-lock.json
1. 注意,在npm5以前是没有`package-lock.json`的，npm以后才加入的
2. npm5以后的安装包不需要加`--save`参数它会自动保存依赖，当你安装包的时候回自动创建或者更新`packsge-lock.json`这个文件
3. `package-lock.json`这个文件会保存`node_modules`所有包的信息(版本、下载地址)
   - 重新`npm install`的时候回会加快速度
4. 从文件来看，有一个`lock`
   - 这个`lock`是用来锁定版本的
   - 如果项目依赖了`1.11.1`版本，若没有`package-lock.json`，如果你重新install，其时会下载最新版本的，而不是`1.11.1`
   - 所以`package-lock.json`另一个作用是用于锁版本号的。防止第三方依赖自动升级的新版本
### find和findIndex
1. find
```javascript
// ES6对数组新增了很多方法
/***
 * find接受一个方法作为参数，方法内部返回一个条件
 * 符合该条件的元素会作为find方法返回值
 * 如果遍历结束，还没有符合该条件的元素，则返回undefined
 */
var user = [
  {"id": 1, "name": '张三'},
  {"id": 2, "name": 'ww'},
  {"id": 3, "name": 'ww'},
  {"id": 4, "name": 'ww'}
]

Array.prototype.myfind = function (conditionFunc) {
  for (let i=0; i<this.length; i++) {
    if (conditionFunc(this[i], i)) {
      return this[i]
    }
  }
}
var ret = user.myfind(function (item, index) {
  return item.id === 2
})
console.log(ret);
```
2. findIndex
```javascript
Array.prototype.myfind = function (conditionFunc) {
  for (let i=0; i<this.length; i++) {
    if (conditionFunc(this[i], i)) {
      return i
    }
  }
}
```
### MongoDB
#### 关系型数据库和非关系型数据库
1. 表就是关系
2. 或者说表与表之间存在关系
3. 所有的关系型数据库都需要通过`sql`语言来操作
4. 非关系型数据库非常灵活，MongoDB是长的最像关系型数据库的非关系型数据库
   - 数据表 -> 集合(数组)
   - 表记录 -> 文档对象
5. MongoDB可以任意的设计表结构，也就是说你可以任意的往里面存数据，没有结构性
#### 启动和关闭数据库

1. 启动

```shell
# mongoDB默认使用执行mongod 命令
mongod --dbpath E:\MongoDbExample
```
2. 连接数据库
```shell
# 开启一个新的命令行窗口
mongo
```
3. 断开连接
```shell
# 连接成功后退出，敲以下命令
exit
```
#### 基本命令
1. `show dbs`
   - 查看数据库列表
2. `db` -- 查看当前连接的操作的数据库 
3. `use 数据库名`  -- 切换到指定数据库，若没有会新建
4. 插入数据
#### 在Node中如何操作mongoDB
1. 使用官方的MongoDB包来操作
2. 使用第三方mongoose来操作(推荐使用)
   - mongoose基于官方的`mongodb`包做了再一次封装
```javascript
const mongoose = require('mongoose');
//连接数据库
// 指定连接的数据库，不需要存在，当插入第一条数据之后会被自动创建
mongoose.connect('mongodb://localhost/数据库名',{ useNewUrlParser: true,  useUnifiedTopology: true });
// 创建一个模型
// 就是在设计数据库
const Cat = mongoose.model('Cat', { name: String });
// 实例化一个cat
const kitty = new Cat({ name: 'Zildjian' });
// 持久化保存实例
kitty.save().then(() => console.log('meow'));
```
#### mongoDB中的基本概念
1. 可以有多个数据库
2. 一个数据库中可以有多个集合(表)
3. 一个集合中可以有多个文档(表记录)
#### 案例
1. 设计Schema,发布model
```javascript
// 导包
const mongoose = require('mongoose');
// 拿到架构
let Schema = mongoose.Schema
//1. 连接数据库
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,  useUnifiedTopology: true });
//2. 设计集合结构(表结构)
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
let UserSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有，不能为空
  },
  password: {
    type: Number,
    required: true
  },
  email: {
    type: String
  }
})
/* 3. 将文档结构发布为模型
// mongoose.model方法用于将一个架构发布为model
// 第一个参数：传入一个大写名词单数字符串，用来表示你的数据表名称
          mongoose会自动将大写名词的字符串生成小写负数的集合名称
// 第二个参数：架构
// 返回值：模型构造函数
*/
let User = mongoose.model('User', UserSchema);
/**
 * 当我们有了这个模型构造函数之后，就可以使用这个构造函数对users集合中的数据为所欲为了
 */
```
2. 增加数据
```javascript
let admin1 = new User({
  username: 'zzz',
  password: '12222',
  email: 'admin@admin.com'
})
admin1.save(function (err, data) {
  if (err) {
    console.log('存储失败');
  } else {
    console.log('存储成功');
    console.log(data);
  }
})
```
3. 查询所有数据
```javascript
User.find(function (err, data) {
  if (err) {
    console.log('查询失败');
  } else {
    console.log('查询成功');
    console.log(data);
  }
})
```
4. 根据条件查询所有数据
```javascript
User.find({
  username: 'zzz'
}, function (err, data) {
  if (err) {
    console.log('查询成功');
  } else {
    console.log('查询失败');
    console.log(data);
  }
})
```
5. 按条件查询单个
```javascript
User.findOne({
  username: 'zzz',
  password: '23333'
}).then((data) => {
  console.log(data)
}).catch((err) => {
  console.log('失败');
})
```
6. 删除数据
```javascript
User.deleteOne({
  username: 'zzz'
}).then(() => {
  console.log('删除成功');
}).catch(() => {
  console.log('删除失败');
})
```
7. 根据ID更新数据
```javascript
User.findByIdAndUpdate('5e7d65157a679b4c745c4773', {
  password: '123'
}).then(() => {
  console.log('更新成功');
}).catch((err) => {
  console.log('更新失败');
})
```
### **使用Node操作mysql数据库**

#### 安装
```shell
npm install mysql --save
```
#### 使用
```javascript
var mysql = require('mysql');
// 创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'student'
});
// 连接数据库
connection.connect();
// 执行数据操作
// 查询数据
connection.query('SELECT * FROM `student1`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
// 插入数据
// connection.query('INSERT INTO student1 VALUES(null, "admin", "123456")', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

// 关闭连接
connection.end();
```

### Promise
1. 封装promise版本的readFile()
```javascript
function readFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}
```

## day5
### path路径操作模块
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

![](E:\GitResort\CodePractice\Node\img\777.PNG)

2. `注意这个坑！！`

![](E:\GitResort\CodePractice\Node\img\4444.PNG)

![](E:\GitResort\CodePractice\Node\img\555.PNG)

- 图中的`./a.txt`相对于当前文件路径
- 由上图也可以看出 `./a.txt`相当于执行node命令所处的终端路径
- 第二张图片中的不是错误，Node就是这样设计的，`就是说，文件操作中，相对路径设计的就是相对于执行node命令所处的路径`
- 在文件操作中，使用相对路径是不可靠的，因为在Node中文件操作的路径被设计为相对于node命令所处的路径，所以为了解决这个问题，很简单，只要把相对路径变为绝对路径就可以了
- 这类我们可以使用`__dirname`或者`__filename`来帮我们解决了

![](E:\GitResort\CodePractice\Node\img\666.PNG)

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

### ### 一、path路径操作模块
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

![](E:\GitResort\CodePractice\Node\img\777.PNG)

2. `注意这个坑！！`

![](E:\GitResort\CodePractice\Node\img\4444.PNG)

![](E:\GitResort\CodePractice\Node\img\555.PNG)

- 图中的`./a.txt`相对于当前文件路径
- 由上图也可以看出 `./a.txt`相当于执行node命令所处的终端路径
- 第二张图片中的不是错误，Node就是这样设计的，`就是说，文件操作中，相对路径设计的就是相对于执行node命令所处的路径`
- 在文件操作中，使用相对路径是不可靠的，因为在Node中文件操作的路径被设计为相对于node命令所处的路径，所以为了解决这个问题，很简单，只要把相对路径变为绝对路径就可以了
- 这类我们可以使用`__dirname`或者`__filename`来帮我们解决了

![](E:\GitResort\CodePractice\Node\img\666.PNG)

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

### **blog项目笔记**
#### 目录结构
```javascript
|- app.js                项目入口文件
|- controllers
|- models                存储使用mongoose设计的数据模型
|- node_modules          第三方包
|- package.json          包描述文件
|- package-lock.json     第三方包版本锁定文件
|- public                公共的静态资源
|- README                项目说明文档
|- routes                如果业务比较多，代码量大，最好把路由按照业务的分类存储到routes目录中
|- router.js             代码量少的话，就把所有路由都放到这个文件中
|- views                 存储视图目录 
```
#### 模板页
#### 路由设计

| 路径      | 方法 | get参数 | post参数                  | 是否需要登录 | 备注         |
| --------- | ---- | ------- | ------------------------- | ------------ | ------------ |
| /         | GET  |         |                           |              | 渲染首页     |
| /register | GET  |         |                           |              | 渲染注册页面 |
| /register | POST |         | email、password、nickname |              | 处理注册请求 |
| /login    | GET  |         |                           |              | 渲染登录页面 |
| /login    | POST |         | email、password           |              | 处理登陆请求 |
| /loginout | GET  |         |                           |              | 处理退出请求 |

1. 可以使用md5对密码进行加密处理，使之更安全

2. MD5使用

   ```javascript
   // 安装包
   npm install blueimp-md5
   // 导包
   const md5 = require('blueimp-md5')
   // 使用
   req.body.password = md5(md5(req.body.password)) // 两层加密，可以使用多层
   ```
#### 表单的同步提交和异步提交
1. 同步提交
   - 表单具有默认的提交行为，默认是同步的，同步表单提交浏览器会锁死(就是转圈),等待服务端的响应结果
   - 表单的同步提交之后，无论服务端响应的是什么，都会使响应的结果直接覆盖掉当前页面
2. 异步提交
   - 服务端重定向针对异步请求无效，只针对同步请求有效
   - 异步提交页面不会刷新，交互方式更灵活
#### cookie和session
1. cookie
   - 可以用来保存一些不太敏感的数据，但是不能用老保存用户登录状态
   - 可以保存用户名，购物车等
2. session
#### Express中使用session
1. 在Express这个框架中，默认不支持session和cookie,但我们可以使用express-session来解决
```javascript
// 下载
npm install express-session
// 配置
var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',// 配置加密字符串，会在原有基础上和这个字符串拼接起来去加密
  resave: false,
  saveUninitialized: true //无论你是否使用sesion，我都默认直接给你分配一把钥匙
}))
//使用
// 1.添加session数据
req.session.foo = 'ooo'
// 2.获取session数据
req.session.foo
```
2. 注意：默认session是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把session持久化储  

#### 书写步骤
1. 创建目录结构
2. 整合静态页 -- 模板页
3. 设计用户登录注册退出的路由
4. 注册
   - 先处理好客户端页面内容(表单控件的name,发送请求,收集表单数据,发起请求)
   - 服务端
      * 获取客户端请求的数据
      * 操作数据库
         + 如果有错，发送500告诉客户端服务器错误
         + 其他根据你的业务发送不同的响应数据
5. 登录
6. 退出




