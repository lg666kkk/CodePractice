const express = require('express')
const path = require('path')
const session = require('express-session')
const router = require('./router')
const app = express()

app.engine('html', require('express-art-template'))
// 开放静态资源
app.use('/public/', express.static(path.join(__dirname + '/public/')))
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules/')))
app.use(session({
  secret: 'keyboard cat',// 配置加密字符串，会在原有基础上和这个字符串拼接起来去加密
  resave: false,
  saveUninitialized: true //无论你是否使用sesion，我都默认直接给你分配一把钥匙
}))
app.use(router)
// 配置一个404的中间件
app.use(function (req, res, next) {
  res.render('404.html')
})
// 配置一个全局错误处理中间件

app.listen(3000, function () {
      console.log('Server is running ...');
})