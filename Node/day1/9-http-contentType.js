/**
 * Content-Type详见以下网址
 *    https://tool.oschina.net/commons
 * 不同资源对应的Content-Type是不一样的
 */

const http = require('http')
const fs = require('fs')
let server = http.createServer()
server.on('request', function (req, res)   {
  const url = req.url
  if (url === '/') {
    fs.readFile('../resource/index.html', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件读取失败')
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/pic'){
    fs.readFile('../resource/1.jpg', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件读取失败');
      } else {
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })  
  }
})
server.listen(3002, function () {
  console.log('Server is running ... ');
})