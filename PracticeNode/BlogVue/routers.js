const express = require('express')
const md5 = require("blueimp-md5")
const Db = require('./models/db')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// 创建一个路由容器
let router = express.Router()

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
 */
router.post('/api/admin/signup', urlencodedParser, function (req, res, next) {
  console.log(req.body);
  req.body.password = md5(md5(req.body.password))
  new Db.User(req.body).save(function (err) {
    if (err) {
      return next(err)
    }
    res.json({
      msg: "注册成功"
    })
  })
})
/***
 * 登录
 * @param username  {string} 用户名
 * @param password  {string} 密码
 * @param email  {string} 邮箱
 * @param identify  {string} 身份
 *    要根据身份分配权限
 */
router.post('/api/admin/signin', urlencodedParser,function (req, res, next) {
  //console.log(req.body);
  req.body.password = md5(md5(req.body.password))
  Db.User.findOne({
    username : req.body.username,
    email : req.body.email,
    password : req.body.password,
    identify : req.body.identify
  } , function (err , docs) {
    if (err) {
      next(err)
    }
    //console.log("doc", docs);
    if (docs !== null) {
      res.json({
        stateCode : 2,
        msg : "登录成功"
      })
    } else {
      res.json({
        stateCode : 1,
        msg : "邮箱或密码错误"
      })
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
  console.log(req.params);
  Db.User.findOne({ 
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
/**
 * 获取所有文章
 */
router.get('/api/articleList', function (req, res, next) {
  //console.log(req.query);
  Db.Article.find(function (err, data) {
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
  Db.Article.findOne({_id: req.params.id}, function (err, data) {
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
  new Db.Article(info).save(function (err) {
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
  Db.Article.find({_id: req.body.id}, function (err, data) {
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
  Db.Article.deleteOne({_id: req.body._id}, function (err) {
    if (err) {
      return next(err)
    }
    res.send()
  })
})

module.exports = router;
