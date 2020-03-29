const express = require('express')
const User = require('./models/user')
const md5 = require('blueimp-md5') // 数据库加密包
const router = express.Router()
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function (req, res) {
  console.log(req.session.user);
  res.render('index.html', {
    user: req.session.user
  })
})
router.get('/login', function (req, res) {
  res.render('login.html')
})
router.post('/login', urlencodedParser, function (req, res) {
  // console.log(req.body);

})
router.get('/register', function (req, res) {
  res.render('register.html')
})
router.post('/register', urlencodedParser,async function (req, res) {
  //console.log(req.body);
  // 操作数据库 -- 判断用户是否存在
  try {
    if (await User.findOne({ email: req.body.email })) {
      return res.status(200).json({
        err_code: 1, // 自定义格式码
        message: 'email is exits'
      })
    }
    if (await User.findOne({ nikename: req.body.nickname })) {
      return res.status(200).json({
        err_code: 2, // 自定义格式码
        message: 'nikename is exits'
      })
    }
    let date = new Date()
    // 对密码进行md5重复加密,后面可以随便拼接字符串
    req.body.password = md5(md5(req.body.password) + "lgtxwd")
    await new User(req.body).save().then((user) => {
      // 注册成功，使用session记录用户的登录状态
      req.session.user = user // 直接将当前登录的用户记录到session中
      // Express提供了一个方法json
      // 该方法接受一个对象作为参数，会自动帮你把对象转为字符串再发送给浏览器
      return res.status(200).json({
        err_code: 0,
        message: 'ok!'
      })
    })

  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: '服务端错误'
    }) 
  }

})

module.exports = router