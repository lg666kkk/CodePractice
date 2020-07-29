// 主页
const dbServe = require('../dao/dbserver')

// 获取好友列表
exports.getUser = function (req, res) {
  let uid = req.body.uid;
  let state = req.body.state
  dbServe.getUsers(uid, state, res)
}
// 获取最后一条消息
exports.getMessageOne = function (req, res) {
  let uid = req.body.uid;
  let fid = req.body.fid;
  dbServe.getOneMsg(uid, fid, res)
}
// 未读消息数
exports.noReadMsg = function (req, res) {
  let uid = req.body.uid;
  let fid = req.body.fid;
  dbServe.noReadMsg(uid, fid, res)
}
// 修改消息状态
exports.updateMsg = function (req, res) {
  let uid = req.body.uid;
  let fid = req.body.fid;
  dbServe.updateMsg(uid, fid, res)
}
// 获取群列表
exports.getGroup = function (req, res) {
  let id = req.body.uid
  dbServe.getGroup(id, res)
}
// 获取群最后一条消息
exports.getGroupMsg = function (req, res) {
  let gid = req.body.gid;
  dbServe.getGroupMsg(gid, res)
}
// 更改群消息状态
exports.updateGroupMsg = function (req, res) {
  let uid = req.body.uid;
  let gid = req.body.gid;
  dbServe.updateGroupMsg(uid, gid, res)
}
