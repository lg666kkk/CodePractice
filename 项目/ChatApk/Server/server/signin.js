// 用户登录
const dbserver = require("../dao/dbserver")
const jwt = require('../dao/jwt')

exports.signIn = function (req, res) {
  let data = req.body.data
  let pwd = req.body.password
  dbserver.userMatch(data, pwd, res)
}

exports.testToken = function (req, res) {
  let token = req.body.token
  let jq = jwt.verifyToken(token)
  res.send({
    stateCode:200,
    message:'token正确'
  })
}
