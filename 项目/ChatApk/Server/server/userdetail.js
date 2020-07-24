const dbserve = require('../dao/dbserver')

// 用户详情
exports.userDetail = function (req, res) {
  let id = req.body.id
  dbserve.userDetail(id, res)
}
// 用户信息修改
exports.userUpdate = function (req, res) {
  let data = req.body
  //console.log(req.body);
  dbserve.userUpdate(data, res)
}
// 好友昵称修改
exports.updateFriendMarkName = function (req, res) {
  let data = req.body
  dbserve.updateFriendMarkName(data, res)
}
// 获取好友昵称
exports.getFriendMarkName = function (req, res) {
  let data = req.body
  dbserve.getFriendMarkName(data, res)
}
