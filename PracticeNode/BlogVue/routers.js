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
 */
router.post('/api/admin/signup', urlencodedParser, function (req, res, next) {
  console.log(req.body);
  req.body.password = md5(md5(req.body.password))
  //console.log(req.body.username);
  new Db.User(req.body).save(function (err) {
    if (err) {
      return next(err)
      //console.log(err);
    }
    res.send()
  })
})
/***
 * 登录
 */
router.post('/api/admin/signin', urlencodedParser,function (req, res, next) {
  //console.log("2222",req.body.username);
  req.body.password = md5(md5(req.body.password))
  Db.User.findOne({
    username : req.body.username,
    password : req.body.password
  } , function (err , docs) {
    if (err) {
      next(err)
    }
    //console.log("eeee",docs);
    if (docs !== null) {
      res.json({
        stateCode : 2,
        msg : "登录成功"
      })
    } else {
      res.json({
        stateCode : 1,
        msg : "用户名或密码错误"
      })
    }
  })
  
})
/**
 * 根据用户名查找用户
 */
router.get('/api/admin/getUser/:username', function (req, res) {
  /**
   * 使用req.query可以查到指定用户名的所有内容
   * 但使用req.params却查不到任何内容？？？？
   *  一眼懵逼，看前端咋做的？？
   */
  Db.User.findOne({ username: req.params.username }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    //console.log(docs.password);
    res.send(docs)
  })
})
/**
 * 获取所有文章
 */
router.get('/api/articleList', function (req, res, next) {
  console.log(req.query);
  Db.Article.find(function (err, data) {
    if (err) {
      return next(err)
    }
    // res.json()的作用的就是就请求的返回值的转化成json的格式
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
 * 文章保存
 */
router.post('/api/admin/saveArticle', urlencodedParser, function (req, res, next) {
  new Db.Article(req.body.articleInformation).save(function (err) {
    if (err) {
      return next(err)
    }
    res.send()
  })
})
router.post('/api/admin/updateArticle', urlencodedParser, function (req, res, next) {
  let info = req.body.articleInformation
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
  Db.Article.remove({_id: req.body._id}, function (err) {
    if (err) {
      return next(err)
    }
    res.send()
  })
})
module.exports = router;
