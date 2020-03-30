const express = require('express')
const fs = require('fs')
const app = express()
/// 中间件：处理请求，本质是一个函数
// 在express中对中间件有几种分类
// 当请求进来，会从第一个中间件进行匹配，如果匹配，则进来(进入该中间件之后，如果没有调用next，则请求会留在当前中间件)，如果不匹配，则继续判断匹配下一个中间件
/**
 * 1. 不关心请求路径和请求方法的中间件，也就是说，任何请求都会进入这个中间件
 */
/**
 * 中间件本身是一个方法，该方法接收三个参数
 *     Request 请求对象
 *     Response 响应对象
 *     next     下一个中间件
 * 当一个请求进入中间件之后，如果不调用next则会停留在当前中间件，所以next是一个方法，用来调用下一个中间件
 * next也是要匹配的，不是调用紧挨着的哪一个
 * 
 */
// app.use(function (req, res, next) {
//   console.log("请求进来了1");
//   next()
// })
// app.use(function (req, res, next) {
//   console.log("请求进来了2");
// })
/**
 * 2.关心请求路径的中间件(以/xxx开头的路径中间件)
 */
app.use('/a', function (req, res, next) {
  console.log(req.url); // 打印出/a之后的内容
})
/**
 * 除了以上中间件之外，还有一种最常用的： 严格匹配请求方法和请求路径的中间件：
 *    app.get 
 *    app.post
*/
app.get("/", function (req, res, next) {
  fs.readFile('./sss/ddd', function (err, data) {
    if (err) {
      next(err) // 传入参数Err会直接进入错误处理中间件
    }
  })
})
// 如果没有能匹配的中间件，则Express会默认输出 Cannot GET 路径
// 配置错误处理中间件
app.use(function (err, req, res, next) {
  //console.log("报错了");
  res.status(500).send(err.message)
})
app.listen(3000, function () {
  console.log("Server is running ..");
})
