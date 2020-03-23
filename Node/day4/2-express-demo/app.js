const express = require('express')

// 创建app
let app = express() // 相当于http.createServer()
app.use('/public/', express.static('./public/'))
app.get('/', function (req, res) {
  // res.end('hello world') // 原来的api都可以用
  res.send('hello world5')
})

app.listen(3000, function () {
  console.log('app is running ...');
})
