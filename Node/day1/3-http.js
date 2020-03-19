// 使用node构建web服务器
// http核心模块用于构建服务器
const http = require('http')
// 使用http.createServer()创建一个web服务器，返回一个Server实例
const server = http.createServer()
// 服务器用于提供数据服务
// 注册request请求事件，当客户端请求过来，就会自动触发服务器的request事件，然后执行回调处理函数
server.on('request', function () {
  console.log('收到发送的请求了');
})
// 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('Server running ....');
})
