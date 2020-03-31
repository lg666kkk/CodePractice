const http = require('http')
const Serve = http.createServer()
Serve.on('request', function (req, res) {
  let url = req.url
  if (url === '/product') {
    let products = [
      {
        name : 'apple',
        price : 99
      },
      {
        name : 'apple1',
        price : 199
      },
      {
        name : 'apple2',
        price : 299
      },
      {
        name : 'apple3',
        price : 399
      }
    ]
    // 响应内容只能是字符串或者二进制数据其他类型要使用JSON转化
    res.end(JSON.stringify(products))
  }
})
Serve.listen(3000, function () {
  console.log('Serve running ...');
})