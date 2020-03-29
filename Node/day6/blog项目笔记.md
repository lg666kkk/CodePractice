## blog项目笔记
### 1.目录结构
```javascript
|- app.js
|- controllers
|- models
|- node_modules          第三方包
|- package.json          包描述文件
|- package-lock.json     第三方包版本锁定文件
|- public                公共的静态资源
|- README                项目说明文档
|- routes 
|- views                 存储视图目录 
```
### 2.模板页
### 3.路由设计

| 路径      | 方法 | get参数 | post参数                  | 是否需要登录 | 备注         |
| --------- | ---- | ------- | ------------------------- | ------------ | ------------ |
| /         | GET  |         |                           |              | 渲染首页     |
| /register | GET  |         |                           |              | 渲染注册页面 |
| /register | POST |         | email、password、nickname |              | 处理注册请求 |
| /login    | GET  |         |                           |              | 渲染登录页面 |
| /login    | POST |         | email、password           |              | 处理登陆请求 |
| /loginout | GET  |         |                           |              | 处理退出请求 |
|           |      |         |                           |              |              |

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
2. 注意：默认session是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把session持久化存储
   

