const express = require('express')
const md5 = require("blueimp-md5")
const Article = require('./models/Article')
const User = require('./models/User')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const passport = require('passport')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// 创建一个路由容器
let router = express.Router()

// 测试
router.get('/test', function (req, res) {
  res.send('hello worlds')
})
/**
 * 注册
 * @param username  {string} 用户名
 * @param password  {string} 密码  md5加密
 * @param email  {string} 邮箱
 * @param identify  {string} 身份
 * @param introduce  {string} 介绍
 * @access public
 */
router.post('/api/admin/signup', urlencodedParser, function (req, res, next) {
  //console.log(req.body);
  delete req.body.checkPassword
  console.log(req.body);
  req.body.password = md5(md5(req.body.password))
  req.body.avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
  //console.log(req.body.avatar);
  new User(req.body)
    .save()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      return next(err)
    })
})
/***
 * 登录
 * @param password  {string} 密码
 * @param email  {string} 邮箱
 *    要根据身份分配权限
 * return token
 */
router.post('/api/admin/signin', urlencodedParser,function (req, res, next) {
  //console.log(req.body);
  const password = req.body.password = md5(md5(req.body.password))
  User.findOne({
    email : req.body.email,
  })
  .then(user => {
    if (!user) {
      return res.status(404).json("用户不存在")
    }
    // 密码匹配
    if (password == user.password) {
      //jwt.sign('规则', '加密名字', '过期时间', '箭头函数')
      const rule = {
        id: user.id, 
        username: user.username,
        avatar: user.avatar,
        identity: user.identity,
        introduce: user.introduce,
        email: user.email
      }
      jwt.sign(rule, 'secret', {expiresIn:3600}, (err, token) => {
        if (err) throw err; 
        res.json({
          success: true,
          token: 'Bearer ' + token // 最终返回的token值
        })
      })
    } else {
      return res.status(400).json("密码错误")
    }
  })
  
})
/**
 * 根据邮箱查找用户
 * @param email  {string} 邮箱
 */
router.get('/api/admin/getUser/:email', function (req, res, next) {
  /**
   * 使用req.query可以查到指定用户名的所有内容
   * 但使用req.params却查不到任何内容？？？？
   *  一眼懵逼，看前端咋做的？？
   */
  //console.log(req.params);
  User.findOne({ 
    email: req.params.email
  }, function (err, docs) {
    if (err) {
      //console.error(err)
      next(err)
    }
    //console.log(docs);
    res.send(docs)
    // res.json({
    //   msg: "已经查到用户消息"
    // })
  })
})
/***
 * 返回当前请求的用户信息
 * 需要验证token
 * @access private
 */
router.get('/api/admin/current', passport.authenticate('jwt', {session:false}), (req ,res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    introduce: req.user.introduce,
    identity: req.user.identity
  })
})
/**
 * 获取所有文章
 */
router.get('/api/articleList', function (req, res, next) {
  //console.log(req.query);
  Article.find(function (err, data) {
    if (err) {
      return next(err)
    }
    // res.json()的作用的就是就请求的返回值的转化成json的格式
    //console.log(data);
    res.json(data)
  })
})
/**
 * 文章详情页
 */
router.get('/api/articleDetail/:id', function (req, res, next) {
  Article.findOne({_id: req.params.id}, function (err, data) {
    if (err) {
      return next(err)
    }
    res.send(data)
  })
})
/**
 * 获取标签
 */
router.get('/api/tag', (req, res, next) => {
  Db.Article.find()
})
/**
 * 文章保存
 */
router.post('/api/admin/saveArticle', urlencodedParser, function (req, res, next) {
  let info = req.body
  let labels = []
  for (let key in info) {
    if (key.indexOf('labels') !== -1) {
      labels.push(info[key])
    }
  }
  //console.log(labels);
  info.labels = labels
  //console.log(info);
  new Article(info).save(function (err) {
    if (err) {
      return next(err)
    }
    res.send()
  })
})
/**
 * 文章更新
 */
router.post('/api/admin/updateArticle', urlencodedParser, function (req, res, next) {
  let info = req.body
  Article.find({_id: req.body.id}, function (err, data) {
    if (err) {
      return next(err)
    }
    data[0].title = info.title
    data[0].date = info.date
    data[0].content = info.content
    data[0].gist = info.gist
    data[0].labels = info.labels
    Db.Article(data[0]).save(function (err) {
      if (err) {
        return next(err)
      }
      res.send()
    })
  })
})
/**
 * 文章删除
 */
router.post('/api/admin/deleteArticle', urlencodedParser, function (req, res, next) {
  Article.deleteOne({_id: req.body._id}, function (err) {
    if (err) {
      return next(err)
    }
    res.send()
  })
})

module.exports = router;
