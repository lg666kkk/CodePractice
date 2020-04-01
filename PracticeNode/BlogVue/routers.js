const express = require('express')
const md5 = require("blueimp-md5")
const Db = require('./models/db')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// 创建一个路由容器
let router = express.Router()
/**
 * 注册
 * @param username  {string} 用户名
 * @param password  {string} 密码  md5加密
 */
router.post('/api/admin/signup', urlencodedParser, function (req, res, next) {
  //console.log(req.body);
  req.body.password = md5(md5(req.body.password))
  //console.log(req.body);
  new Db.User(req.body).save(function (err) {
    if (err) {
      return next(err)
    }
    res.send()
  })
})
router.post('/api/admin/signin', urlencodedParser,function (req, res, next) {
  //console.log(req.body);
  req.body.password = md5(md5(req.body.password))
  res.send()
})
router.get('/api/admin/getUser/:name', function (req, res) {
  //console.log(req.query);
  Db.User.findOne({
    username: req.params.name
  })
})
module.exports = router;