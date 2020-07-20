let dbmodel = require('../model/dbmodule')
let brcypt = require('../dao/bcrypt')
let User = dbmodel.User

exports.findUser = function (res) {
  User.find(function (err, user) {
    if (err) {
      console.log("用户数据不存在:" + err);
    } else {
      res.send(user)
    }
  })
}

// 注册(新建用户)
exports.buildUser = function (name, mail, pass, res) {
  // 进行密码加密
  let password = brcypt.encrpty(pass)
  let data = {
    name: name,
    password:password,
    email: mail,
    time: new Date()
  }
  let user = new User(data)
  user.save(function (err, result) {
    if (err) {
      res.send({
        statusCode: 500
      })
    } else {
      res.send({
        statusCode: 200
      })
    }
  })
}
// 匹配用户 
exports.countUser = function (data, type, res) {
  let wherestr = {}
  wherestr[type] = data
  User.countDocuments(wherestr, function (err, result) {
    if (err) {
      res.send({
        statusCode: 500
      })
    } else {
      res.send({
        statusCode: 200,
        result
      })
    }
  })
}

