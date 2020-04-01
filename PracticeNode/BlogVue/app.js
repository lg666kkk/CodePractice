const express = require("express")
const router = require('./routers')
const app = express()


app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))


// 把路由挂载到app服务中
app.use(router)
// 配置全局错误处理插件
app.use(function (err, req, res, next) {
  return res.status(500).send()
})
app.listen(3000, function () {
  console.log('Server is running ...');
})