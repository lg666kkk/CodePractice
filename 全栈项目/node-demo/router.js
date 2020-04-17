const express= require('express')
const User = require('./module/db')
const Profile = require('./module/profile')
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
router.post('/api/user/register', urlencodedParser,function (req, res) {
  //console.log(req.body);
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
router.post('/api/user/login', urlencodedParser,function (req, res) {
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
router.get('/api/user/current', passport.authenticate("jwt", {session: false}),function (req, res) {
  res.json({
    id: req.user.id,
    username: req.user.username,
    identity: req.user.identity,
    email: req.user.email 
  })
})
/**
 * 添加信息
 */
router.post('/api/profile/add', passport.authenticate("jwt", {session: false}),urlencodedParser, (req, res) => {
  const profileFides = {}
  if (req.body.type) profileFides.type = req.body.type 
  if (req.body.descripe) profileFides.descripe = req.body.descripe 
  if (req.body.income) profileFides.income = req.body.income 
  if (req.body.expend) profileFides.expend = req.body.expend 
  if (req.body.cash) profileFides.cash = req.body.cash 
  if (req.body.remark) profileFides.remark = req.body.remark 
  new Profile(profileFides).save()
    .then((profile) => {
      res.json(profile)
    })
})
/**
 * 获取所有信息
 */
router.get('/api/profile', passport.authenticate("jwt", {session: false}), (req, res, next) => {
  Profile.find()
    .then(profile => {
      if (!profile) {
        return res.status(404).json({
          msg: '没有任何内容'
        })
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})
/**
 * 获取单个信息
 */
router.get('/api/profile/:id', passport.authenticate("jwt", {session: false}), (req, res, next) => {
  Profile.findOne({
    _id: req.params.id
  }).then(profile => {
      if (!profile) {
        return res.status(404).json({
          msg: '没有任何内容'
        })
      }
      res.json(profile)
    }).catch(err => {
      res.status(404).json(err)
    })
})
/**
 * 编辑
 */
router.post('/api/profile/edit/:id', passport.authenticate("jwt", {session: false}),urlencodedParser, (req, res) => {
  const profileFides = {}
  if (req.body.type) profileFides.type = req.body.type 
  if (req.body.descripe) profileFides.descripe = req.body.descripe 
  if (req.body.income) profileFides.income = req.body.income 
  if (req.body.expend) profileFides.expend = req.body.expend 
  if (req.body.cash) profileFides.cash = req.body.cash 
  if (req.body.remark) profileFides.remark = req.body.remark 
  Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $set: profileFides },
    { new: true }
  ).then(profile => {
    res.json(profile)
  })
})
/**
 * 删除
 */
router.delete('/api/profile/delete/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
  Profile.findOneAndRemove({
    _id: req.params.id
  })
  .then(profile => {
    res.json("删除成功")
  })
  .catch(err => {
    res.status(400).json(err)
  })
})
module.exports = router
