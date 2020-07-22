let dbmodel = require('../model/dbmodule')
let brcypt = require('../dao/bcrypt')
const jwt = require('../dao/jwt')

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
// 用户验证
exports.userMatch = function (data, pwd, res) {
  let wherestr ={$or:[{'name':data}, {"email": data}]}
  let out = {
    'name': 1,
    'password': 1,
    'imgUrl': 1
  }
  User.find(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500
      })
    } else {
      if (result === '') {
        return res.send({
          statusCode:400
        })
      }
      console.log(result);
      result.map(function(e) {
        const pwdMatch = brcypt.verification(pwd, e.password)
        if (pwdMatch) {
          let token = jwt.generateToken(e._id)
          let back = {
            id: e._id,
            name: e.name,
            imgUrl: e.imgUrl,
            token
          }
          return res.send({
            statusCode:200,
            back
          })
        } else {
          return res.send({
            statusCode:400
          })
        }
      })
    }
  })
}
