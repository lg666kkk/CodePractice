const express = require("express")
// 创建一个路由容器
const router = express.Router()

let dbserve = require('../dao/dbserver')
let emailServe = require('../dao/emailserve')
// 导入serve的注册方法
let signup = require('../server/sign')
// 导入登录方法
let signin = require('../server/signin')
// 搜索方法
let search = require('../server/search')
// 导入用户更新方法
let userupdate = require('../server/userdetail')
// 导入好友申请的方法
let friend = require('../server/friend')
// 导入主页相关的方法
let home = require('../server/home')
// 测试
router.get("/test", (req,res) => {
  res.send("lg NB")
})

// 获取邮箱
router.post('/mail', (req, res) => {
  let email = req.body.mail
  emailServe.emailSignUp(email, res)
  //res.send(email)
})
// 注册
router.post('/signup/add', (req, res) => {
  signup.SignUp(req, res)
})
// 判断用户名或邮箱是否存在
router.post('/signup/judge', (req, res) => {
  signup.Isvalue(req, res)
})
// 登陆接口
router.post('/signin/match',  function (req, res) {
  signin.signIn(req, res)
})
// 测试token
router.post('/token',  function (req, res) {
  signin.testToken(req,res)
})
// 搜索页面
// 搜索用户
router.post('/search/user', function (req, res) {
  search.searchUser(req, res)
})
// 判断是否是好友
router.post('/search/isfriend', function (req, res) {
  search.isFriend(req, res)
})
// 搜索群
router.post('/search/group', function (req, res) {
  search.searchGroup(req, res)
})
// 判断是否在群里
router.post('/search/isingroup', function (req, res) {
  search.isGroup(req, res)
})
// 用户详情
router.post('/user/detail', function (req, res) {
  userupdate.userDetail(req, res)
})
// 用户信息修改
router.post('/user/update', function (req, res) {
  userupdate.userUpdate(req, res)
})
// 好友昵称修改
router.post('/user/updatefriendmarkname', function (req, res) {
  userupdate.updateFriendMarkName(req, res)
})
// 获取好友昵称
router.post('/user/getfriendmarkname', function (req, res) {
  userupdate.getFriendMarkName(req, res)
})
// 好友申请
router.post('/friend/apply', (req, res) => {
  friend.applyFriend(req, res)
})
// 更新好友状态 -- 相当于同意好友
router.post("/friend/add", (req, res) => {
  friend.updateFriendState(req, res)
})
// 删除好友
router.post('/friend/delete', (req, res) => {
  friend.deleteFriend(req, res)
})
// 获取好友列表
router.post('/home/userlist', (req, res) => {
  home.getUser(req, res)
})
// 获取好友最后一条一对一消息
router.post('/home/userlastMsg', (req, res) => {
  home.getMessageOne(req, res)
})
// 获取好友未读消息数
router.post('/home/noreadMsg', (req, res) => {
  home.noReadMsg(req, res)
})
// 更新好友消息状态
router.post('/home/updateUserMsg', (req, res) => {
  home.updateMsg(req, res)
})
// 获取群列表
router.post('/home/grouplist', (req, res) => {
  home.getGroup(req, res)
})
// 获取最后一条群消息
router.post('/home/grouplastMsg', (req, res) => {
  home.getGroupMsg(req, res)
})
// 跟新群消息状态
router.post('/home/updateGroupMsg', (req, res) => {
  home.updateGroupMsg(req, res)
})
// 导出
module.exports = router
