const express = require("express")
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// 创建一个路由容器
const router = express.Router()
let dbserve = require('../dao/dbserver')
let emailServe = require('../dao/emailserve')
// 导入serve的注册方法
let signup = require('../server/sign')
// 测试
router.get("/test", (req,res) => {
  res.send("lg NB")
})

// 获取邮箱
router.post('/mail', urlencodedParser, (req, res) => {
  let email = req.body.mail
  emailServe.emailSignUp(email, res)
  //res.send(email)
})
// 注册
router.post('/signup/add', urlencodedParser, (req, res) => {
  signup.SignUp(req, res)
})
// 判断用户名或邮箱是否存在
router.post('/signup/judge', urlencodedParser, (req, res) => {
  signup.Isvalue(req, res)
})
// 导出
module.exports = router
