const bcrypt = require("bcryptjs")

// 生成hash密码
exports.encrpty = function (pass) {
  // 生成一个随机数
  let salt = bcrypt.genSaltSync(10)
  // 生成hash密码
  let hash = bcrypt.hashSync(pass, salt)

  return hash
}

// 解密 -- 匹配过程
exports.verification = function (pass, hash) {
  let verif = bcrypt.compareSync(pass, hash) // 返回true或false
  return verif 
}
