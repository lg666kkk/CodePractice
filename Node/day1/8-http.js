const http = require('http')
let serve = http.createServer()

serve.on('request', function (req, res) {
  /** 
 * 服务端默认发送的数据是UTF-8编码的
 * 但是浏览器不知道你是UTF-8编码
 * 浏览器在不知道服务器响应内容的编码情况下会按照当前操作系统默认编码去解析
 * 中文操作系统默认是gbk
 * 解决方法 -- 正确告诉浏览器我发给你的内容的编码方式
 * */
  
  let url = req.url
  if (url === '/plain') {
    /**
   * 在http协议中，Content-Type就是用来告知对方我给你发送的数据内容是什么类型
   * text/plain -- 普通文本
   * text/html -- html格式文本
   */
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('hello 使劲儿')
  } else if (url === '/html') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<p>hello 你好 <a href="www.baidu.com">百度</a></p>')
  }
  
})
serve.listen(3001, function () {
  console.log('server running ...');
})