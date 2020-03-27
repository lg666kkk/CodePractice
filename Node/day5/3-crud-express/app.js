/**
 * app.js 入门模块
 * 职责：
 *   启动服务
 *   做一些服务相关配置
 *      模板引擎
 *      body-parser 解析表单post请求体
 *      提供静态资源服务
 */

const express = require('express')
const router = require('./router')

let app = express()
app.engine('html', require('express-art-template'));

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

// 把路由容器挂载到app 
app.use(router)

app.listen(3000, function () {
  console.log('server is running ...');
})