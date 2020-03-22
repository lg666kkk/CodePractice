// 0安装
// 1引包
const express = require('express')
/**
 * 2. 创建你的服务器应用程序
 *  也就是原来的http.createServer
 */
const app = express()

/**
 * 公开指定目录
 * 只要这样做了，你就可以直接通过 /public/xx的方式访问public目录中的所有资源
 */
app.use('/public/', express.static('./public/'))
// 当服务器收到get请求 / 的时候，执行回调处理函数
app.get('/', function (req, res) {
  console.log(req.query);
  res.send('hello express!')
})
app.get('/about', function (req, res) {
  res.send('hello about 你好')
})
// 相当于server.listen
app.listen(3000, function () {
  console.log('Server is running ... ');
})