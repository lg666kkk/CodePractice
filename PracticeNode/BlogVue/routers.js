const express = require('express')
// 创建一个路由容器
let router = express.Router()

router.get('/', function (req, res) {
  res.send('eeeee')
})



module.exports = router;