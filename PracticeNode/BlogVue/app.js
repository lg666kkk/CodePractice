const express = require("express")
const router = require('./routers')
const session = require('express-session')
const cors = require('cors')
// 该模块用于将session存入mongo中
const MongoStore = require('connect-mongo')(session)
const app = express()
// 跨域
app.use(cors())

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))
app.set('trust proxy', 1) 
app.use(session({
  secret: 'keyboard cat',// 配置加密字符串，会在原有基础上和这个字符串拼接起来去加密
  resave: false,
  saveUninitialized: true, //无论你是否使用sesion，我都默认直接给你分配一把钥匙
  cookie:{
      secure: true,
      maxAge: 259200000 // 过期时间
  },
  store: new MongoStore({
    url: 'mongodb://localhost/Blog1'
  })
}))

// 把路由挂载到app服务中
app.use(router)
// 配置全局错误处理插件

app.use(function (err, req, res, next) {
  return res.status(500).send()
})
app.listen(3000, function () {
  console.log('Server is running ...');
})
