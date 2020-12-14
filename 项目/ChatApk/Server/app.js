const express = require('express')
const bodyParser = require('body-parser')
const morgan = require("morgan")
const jwt = require('./dao/jwt')
const fs = require("fs")
const http = require("http")
// 导入跨域模块
const cors = require("cors")
const app = express()

//创建一个http服务器，既然app是一个函数，那这里就可以传入。
const server = http.createServer(app);
//websocket的握手是需要依赖http服务的，所以这里要把server传入进去。
const io = require("socket.io")(server).listen(7000);

// socket
require("./dao/socket")(io);


// 配置中间件
app.use(bodyParser.urlencoded({limit:"50mb"}));
app.use(bodyParser.json({limit:"50mb"}));

// 跨域
app.use(cors())

// 日志记录
const writeStream = fs.createWriteStream("./logs/access.log" ,{
  flags: "a+"
})
app.use(morgan("combined", {stream: writeStream}))

// 配置静态资源
app.use(express.static(__dirname + '/data'))

// token判断 -- 如果前端携带token进行判断
app.use(function (req, res, next) {
  // console.log("sssss",req.body);
  // console.log("token000", req.headers)
  if (typeof (req.headers.token) !== 'undefined') {
    // 处理token匹配
    let token = req.headers.token
    //console.log(token);
    let tokenMatch = jwt.verifyToken(token) // 0或1
    if (tokenMatch === 1) {
      // 通过验证
      next()
    } else {
      return res.send({
        statusCode: 300,
        message: "token验证失败"
      })
    }
  } else {
    next()
  }
})

// 导入路由
const router = require("./router/index")
// 挂在路由
app.use(router)

// 导入文件上传
const multerUpload = require('./router/files')
app.use(multerUpload)

// 404错误
app.use((req, res, next) => {
  let err = new Error("Not found Page")
  err.status = 404
  next(err)
})

// 服务器错误
app.use(function (err, req, res, next) {
  res.send({
    statusCode:500
  })
})
app.listen(3000, ()=>{
  console.log("serer is ...");
})
