let dbmodel = require('../model/dbmodule')
let User = dbmodel.model('User')

exports.findUser = function (res) {
  User.find(function (err, user) {
    if (err) {
      console.log("用户数据不存在:" + err);
    } else {
      res.send(user)
    }
  })
}

