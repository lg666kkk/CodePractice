// 应用nodemailer插件
let nodemailer = require('nodemailer')
let auth = require('../config/credentials')
// 创建传输方式
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',//这是qq邮箱
  //端口
  port: 465,
  auth: {
    user: auth.qq.user,
    pass: auth.qq.pass
  }
});

// 注册时的方法 -- 发送邮件给用户
exports.emailSignUp = function (email, res) {
  // 发送内容
  let options = {
    from: '3503165610@qq.com', // sender address
    to: email, // list of receivers
    subject: "感谢你的注册", // Subject line
    text: "欢迎你的加入！！", // plain text body
    // html: "<b>Hello world?</b>", // html body
  }
  // 发送邮件
  transporter.sendMail(options, function (err, msg) {
    if (err) {
      res.send("发送失败")
      console.log(err);
    } else {
      res.send("111111100ppp")
      console.log('邮箱发送成功');
    }
  })
} 
