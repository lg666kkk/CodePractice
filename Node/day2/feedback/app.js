const http = require('http')
const fs = require('fs')
const tem = require('art-template')
const url = require('url')
let comment = [
  {
    name: '张三',
    message: '今天天气不错',
    date: '2017-2-12'
  },
  {
    name: '三',
    message: '今天天气不错1',
    date: '2017-2-12'
  },
  {
    name: '张三1',
    message: '今天天气不错2',
    date: '2017-2-12'
  },
  {
    name: '张三2',
    message: '今天天气不错3',
    date: '2017-2-12'
  },
  {
    name: '张三3',
    message: '今天天气不错4',
    date: '2017-2-12'
  }
]
/**
 * 对于表单提交的请求路径，由于其中有用户动态填写的内容，所以你不可能通过判断完整的URL路径来处理这个请求
 * 对于我们来讲，只需要判定，如果你的请求路径是 /pinglun的时候，就可以认为提交表单的请求过来了
 */
// 简写方式，该函数会直接注册为server的request
http
  .createServer(function (req, res) {
    // 使用url.parse将路径解析为一个方便的操作的对象
    let pares = url.parse(req.url,true)
    // 单独获取不包含查询串的路径部分(不包含？之后的内容)
    let pathname = pares.pathname
    if (pathname === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          res.end('404 Not find')
          return 
        }
        data = data.toString()
        let htmlString = tem.render(data,{
          comments: comment
        })
        res.end(htmlString)
      })
      // /public整个public目录中的资源都允许被访问
    } else if (pathname === '/pinglun') {
      // 一个请求对应一次响应响应结束这次请求也就结束了
      // res.end(JSON.stringify(pares.query))
      // 获取表单提交的数据pares.query
      // 生成日期到数据对象然后存储到数组中
      // 让用户重定向跳转到首页
      let com = pares.query

      com.date = '2020-3-3'
      comment.unshift(com)
      // 服务端已经存储好了数据，接下来让用户重新请求 / 首页就可以看到最新的留言内容了
      /**
       * 如何通过服务器让客户端重定向
       *  1. 状态码设置为302 -- 临时重定向
       *  2. 响应头中通过Location 告诉客户端往哪儿重定向
       * 如果客户端发现收到的服务器的状态码是302，就会自动取响应头中找Location，然后对该地址发起新的请求
       */
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('404')
        }
        res.end(data)
      })
    } else if (pathname.indexOf('/public/') === 0) {
      /**
       * 统一处理：
       *   如果请求路径是以/public/开头的，则我认为你需要获取public中的某个资源
       *   所以我们可以直接把请求路径当作文件路径来读取
       * 哪些资源可以被用户访问，哪些资源不能被用户访问，我们可以通过代码非常灵活的控制
       */
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 not find Found')
        }
        res.end(data)
      })
    } else {
      // 处理404
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () {
    console.log('Server is running ... ');
  })