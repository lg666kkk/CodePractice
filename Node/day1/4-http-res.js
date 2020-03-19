const http = require('http')
const server = http.createServer()
server.on('request', function (request, response) {
  console.log('收到请求了，路径是：' + request.url);
  // response对象有一个方法：write可以用来给客户端发送响应数据
  // write可以使用多次。但最后一定要要使用end()结束
  response.write('hello')
  response.write('node js')
  response.end() // 结束响应，告诉客户端，我的话说完了，你可以呈递给用户了
})
server.listen(3000, function () {
  console.log('Server running ... ');
})