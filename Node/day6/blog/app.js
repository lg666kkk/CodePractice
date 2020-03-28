const express = require('express')
const path = require('path')

const app = express()
app.engine('html', require('express-art-template'))
// 开放静态资源
app.use('/public/', express.static(path.join(__dirname + '/public/')))
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules/')))
app.get('/', function (req, res) {
  res.send('send')
})
app.listen(3000, function () {
      console.log('Server is running ...');
    })