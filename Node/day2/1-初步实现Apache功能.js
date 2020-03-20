const http = require('http')
const fs = require('fs')
let wwwDir = 'E:/app/www'
let server = http.createServer()

server.on('request', function (req, res) {
  // console.log(req.url);
  let url = req.url
  if (url === '/') {
    fs.readFile(wwwDir + '/index.html', function (err, data) {
      if (err) {
        res.end('404 not find   Page')
        return 
      }
      res.end(data)
    })
  } else if (url === '/index.html') {
    fs.readFile(wwwDir + '/index.html', function (err, data) {
      if (err) {
        res.end('404 not find   Page')
        return 
      }
      res.end(data)
    })
  } else if (url === '/index.txt') {
    fs.readFile(wwwDir + '/index.txt', function (err, data) {
      if (err) {
        res.end('404 not find   Page')
        return 
      }
      res.end(data)
    })
  } else if (url === '/apple') {
    fs.readFile(wwwDir + '/apple', function (err, data) {
      if (err) {
        res.end('404 not find   Page')
        return 
      }
      res.end(data)
    })
  }
})
server.listen(3000, function () {
  console.log('Server is running ... ');
})