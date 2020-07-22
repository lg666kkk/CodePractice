const jwt = require("jsonwebtoken")
let secret = 'lgnb'
// 生成token
exports.generateToken = function (id) {
  let payload = {
    id:id,
    time:new Date()
  }
   // 过期时间设置为10天
  let token = jwt.sign(payload, secret , {expiresIn: 60 * 60 * 24 * 10})
  return token
}
// 解码
exports.verifyToken = function (e) {
  let payload = jwt.verify(e, secret)
  return payload
}
