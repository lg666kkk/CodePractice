const express = require("express")
// 创建一个路由容器
const router = express.Router()
// 导入multer模块
const multer = require('multer')
const mkdir = require('../dao/mikdir')

//控制文件的存储
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null, './data/test')  // 测试
    // 动态建立文件夹
    // 路径
    let url = req.body.url // 前端传入的路径
    //console.log(url);
    mkdir.mikdirs('../data/' + url, error => {
      console.log("文件夹创建失败", error);
    })
    cb(null, './data/' + url)
  },
  filename: function (req, file, cb) {
    let name = req.body.name // 前端会传过来一个name
    //console.log(name);
    let type = file.originalname.replace(/.+\./, ".")
    cb(null, name + type)
  }
})

let upload = multer({ storage: storage })
// 测试
//upload.array('file', 10) : 特别注意这个名字 file 要与前端一致
router.post('/files/upload', upload.array("file", 10), function (req, res, next) {
  // 获取文件名
  let name = req.files[0].filename
  res.send(name)
})

module.exports = router
