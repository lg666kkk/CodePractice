const dbServe = require('../dao/dbserver')

// 好友申请
exports.applyFriend = function (req, res) {
  let data = req.body
  dbServe.applyFriend(data, res)
}
