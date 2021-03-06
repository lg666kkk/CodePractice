const dbserver = require("../dao/dbserver")
const postMail = require("../dao/emailserve")
// 用户注册
exports.SignUp = function (req, res) {
  let name = req.body.name
  let mail = req.body.email
  let pass = req.body.password
  // 发送邮件
  postMail.emailSignUp(mail, res)
  dbserver.buildUser(name, mail, pass, res)
}

// 用户或邮箱是否存在判断
exports.Isvalue = function (req, res) {
  let data = req.body.data;
  let type = req.body.type;
  dbserver.countUser(data, type, res)
}
