const express= require('express')
const User = require('./module/db')
const gravatar = require('gravatar');
const router = express.Router()
const md5 = require('blueimp-md5')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const passport = require('passport')


const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const keys ={
  secretKey: 'secret'
}
// 注册
router.post('/register', urlencodedParser,function (req, res) {
  console.log(req.body);
  // 查询数据库中是否拥有邮箱
  User.findOne({email:req.body.email})
    .then((user) => {
      if (user) {
        return res.status(400).json('邮箱已存在')
      } else {
        req.body.password = md5(md5(req.body.password) + "lgtxwd")
        const avatart = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
        new User({
          username:req.body.username,
          password:req.body.password,
          avatart,
          email: req.body.email,
          identity: req.body.identity
        }).save().then(data => {
          res.json(data)
        }).catch(err => {
          console.log(err);
        })
      }
    })
})
/***
 * 登录
 * return token -- 使用jsonwebtoken
*/ 
router.post('/login', urlencodedParser,function (req, res) {
  const password =  md5(md5(req.body.password) + "lgtxwd")
  User.findOne({email: req.body.email})
    .then((user) => {
      if (!user) {
        return res.status(404).json('用户不存在')
      }
      if (password === user.password) {
        // jwt.sign('规则', '加密名字','过期时间','箭头函数')
        // 定义规则
        const rules = {
          id: user.id,
          name:user.username,
          avatart: user.avatart,
          identity: user.identity
        }
        jwt.sign(rules, keys.secretKey,{expiresIn:3600},function (err, token) {
          if (err) {
            return res.status(500).json({
              message: "token生成失败"
            })
          }
          res.json({
            success: true,
            token: "Bearer " + token // 必须是Bearer+ 空格
          })
        })
        // return res.json({
        //   message:'登陆成功'
        // })
      } else {
        return res.status(400).json({
          message:'登录失败'
        })
      }
    })
})
// 获取数据，需要验证token,使用possport-jwt来实现
router.get('/current', passport.authenticate("jwt", {session: false}),function (req, res) {
  res.json({
    id: req.user.id,
    username: req.user.username,
    identity: req.user.identity,
    email: req.user.email 
  })
})
module.exports = router
