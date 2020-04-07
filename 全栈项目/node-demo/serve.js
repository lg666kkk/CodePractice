const express = require('express')
const app = express()
const router = require('./router')

const passport = require('passport')
// passport初始化
app.use(passport.initialize());
// passport配置文件，需要传过去导入的passport
require('./passport')(passport)


app.use(router)

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('serve is running ...');
})
