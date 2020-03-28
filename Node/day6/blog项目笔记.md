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

