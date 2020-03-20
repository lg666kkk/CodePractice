const http = require('http')
const fs = require('fs')
const template = require('art-template')
let wwwDir = 'E:/app/www'
let server = http.createServer()

server.on('request', function (req, res) {
  // console.log(req.url);
  let url = req.url
  fs.readFile('./template-apache.html', function (err, data) {
    if (err) {
      return res.end('404 Not find Page')
    }
    fs.readdir(wwwDir, function (err, files) {
      if (err) {
        res.end('404 Not find Files')
      } 
      data = data.toString()
      /**
       * 使用模板引擎解析data中的模板字符串就可以了
       */
      data = template.render(data, {
        files:files
      })
      //console.log(files);
      // 发送解析替换过后的响应数据
      res.end(data)
    })
  })
})
server.listen(3000, function () {
  console.log('Server is running ... ');
})