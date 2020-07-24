const dbServe = require('../dao/dbserver')

// 用户搜索
exports.searchUser = function (req, res) {
  let data = req.body.data
  console.log(data);
  dbServe.SearchUser(data, res)
}
// 判断是否是好友
exports.isFriend = function (req, res) {
  let uid = req.body.uid
  let fid = req.body.fid
  dbServe.isFriend(uid, fid, res)
}
// 群搜索
exports.searchGroup = function (req, res) {
  let data = req.body.data
  dbServe.SearchGroup(data, res)
}
// 判断是否在群里
exports.isGroup = function (req, res) {
  let uid = req.body.uid
  let gid = req.body.gid
  dbServe.isGroup(uid, gid, res)
}
