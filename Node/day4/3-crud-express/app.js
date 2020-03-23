const express = require('express')
let fruits = [
  'apple',
  '梨',
  '香蕉'
]
let app = express()
app.engine('html', require('express-art-template'));

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.get('/', function (req, res) {
  res.render('index.html',{
    fruits:fruits
  })
})
app.listen(3000, function () {
  console.log('server is running ...');
})