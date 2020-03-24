/**
 * router.js
 *   路由模块
 *   处理路由
 */
const fs = require('fs')
let fruits = [
  'apple',
  '梨',
  '香蕉'
]
// 这种方式不方便
// module.exports = function (app) {
//   app.get('/student', function (req, res) {
//     // 加utf-8与data.toString()效果相同
//     fs.readFile('./db.json', "utf-8", function (err, data) {
//       if (err) {
//         return res.status(500).send('Server error')
//       }
//       res.render('index.html',{
//         fruits:fruits,
//         // 从文件中读取到的数据一定是字符串，所以一定要转换成对象
//         students: JSON.parse(data).student
//       })
//     })
//   })
  
//   app.get('/student/new', function (req, res) {
  
//   })
//   app.get('/student/new', function (req, res) {
    
//   })
//   app.get('/student/new', function (req, res) {
    
//   })
//   app.get('/student/new', function (req, res) {
    
//   })
// }
// Express 提供了一个更好的方式，专门用来包装路由
const express = require('express')
var bodyParser = require('body-parser')
const Student = require('./student')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
let router = express.Router()
// 把路由都挂载到router路由容器中
router.get('/student', function (req, res) {
  // 加utf-8与data.toString()效果相同
  // fs.readFile('./db.json', "utf-8", function (err, data) {
  //   if (err) {
  //     return res.status(500).send('Server error')
  //   }
  //   res.render('index.html',{
  //     fruits:fruits,
  //     // 从文件中读取到的数据一定是字符串，所以一定要转换成对象
  //     students: JSON.parse(data).student
  //   })
  // })
  // Student.find(function (err, student) {
  //   if (err) {
  //     return res.status(500).send('Server error')
  //   }
  //   res.render('index.html', {
  //     fruits:fruits,
  //     students: student
  //   })
  // })
  Student.findAll().then(data => {
    res.render('index.html', {
      fruits:fruits,
      students: data
    })
  }).catch(err => {
    return res.status(500).send('Server error')
  })
})

router.get('/student/new', function (req, res) {
  res.render('new.html')
})
router.post('/student/new', urlencodedParser, function (req, res) {
  // 获取表单数据
  // 处理
      // 将数据保存到db.json中用于持久化
  // 发送响应
  // 先读取出来，转成对象。然后往对象中push数据，然后将对象转为字符串，将字符串再次写入文件
  //console.log(req.body);
  let student = req.body
  // Student.save(student, function (err) {
  //   if (err) {
  //     return res.status(500).send('Server error')
  //   }
  //   res.redirect('/student')
  // })
  Student.save(student).then(
    () => {
      res.redirect('/student')
    }
  ).catch(err => {
    return res.status(500).send('Server error')
  })
})
router.get('/student/edit', function (req, res) {
  // 在客户端的列表页中处理链接问题
  // 获取要编辑的学生id
  // 渲染编辑页面 -- 根据id查找学生信息,使用模板引擎渲染页面
  //console.log(req.query.id);
  Student.finbyId(parseInt(req.query.id), function (err, student) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.render('edit.html', {
      student:student
    })
  })
})
router.post('/student/edit', urlencodedParser, function (req, res) {
  // 获取表单数据 req.body
  // 更新 
  // 发送响应
  //console.log(req.body);
  Student.update(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/student')
  })
})
router.get('/student/delete', function (req, res) {
  // 获取要删除的id
  // 根据id执行删除操作
  // 根据结果发送响应数据
  //console.log(req.query.id);
  Student.del(req.query.id, function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/student')
  })
})
// 导出router
module.exports = router