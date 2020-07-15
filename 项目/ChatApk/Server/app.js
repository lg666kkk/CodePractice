const express = require('express')
// 导入路由
const router = require("./router")
// 导入跨域模块
const cors = require("cors")
const app = express()

// 跨域
app.use(cors())

// 挂在路由
app.use(router)


// 404错误
app.use((res, req, next) => {
  let err = new Error("Not found Page")
  err.status = 404
  next(err)
})

// 服务器错误
app.use(function (err, req, res, next) {
  return res.status(500).send()
})
app.listen(3000, ()=>{
  console.log("serer is ...");
})
