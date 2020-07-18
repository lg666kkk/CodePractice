const express = require("express")
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// 创建一个路由容器
const router = express.Router()
let dbserve = require('../dao/dbserver')
let emailServe = require('../dao/emailserve')

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
// 导出
module.exports = router
