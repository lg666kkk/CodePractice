const http = require('http')
const fs = require('fs')
let wwwDir = 'E:/app/www'
let server = http.createServer()

server.on('request', function (req, res) {
  // console.log(req.url);
  let url = req.url
  fs.readFile('./template.html', function (err, data) {
    if (err) {
      return res.end('404 Not find Page')
    }
    fs.readdir(wwwDir, function (err, files) {
      if (err) {
        res.end('404 Not find Files')
      } 
      // 生成需要替换的内容
      let content = ''
      files.forEach(function (items) {
        content += `
        <tr>
          <td data-value='apple'><a class="icon dir" href="/E:/app/www/apple">${items}/</a></td>
          <td class="detailsColumn" data-value="0"></td>
          <td class="detailsColumn" data-value="1509589967">2020/3/20</td>
        </tr>
        `
      })
      data = data.toString()
      data = data.replace('^_^', content)
      //console.log(files);
      // 发送解析替换过后的响应数据
      res.end(data)
    })
  })
})
server.listen(3000, function () {
  console.log('Server is running ... ');
})