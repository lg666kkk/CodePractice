/**
 * student.js
 * 数据操作文件模块
 *   操作文件中的数据，只处理数据，不关心业务
 */
const fs = require('fs')

const dbPath = './db.json'
/**
 * 获取所有学生列表
 * return []
 * callback中的参数：第一个参数err,第二个参数为结果
 *   
 */
exports.findAll = function () {
  return new Promise ((resolve, reject) => {
    fs.readFile(dbPath, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data).student)
    })
  }) 
  // fs.readFile(dbPath, "utf-8", function (err, data) {
  //   if (err) {
  //     return callback(err)
  //   }
  //   callback(null, JSON.parse(data).student)
  // })
}

 /**
 * 添加保存学生
 */
exports.save = function (student) {
//   exports.save = function (student, callback) {
  // fs.readFile(dbPath, "utf-8", function (err,data) {
  //   if (err) {
  //     return callback(err)
  //   }
  //   let stu = JSON.parse(data).student
  //   student.id = stu[stu.length - 1].id + 1
  //   stu.push(student)
  //   let file = JSON.stringify({
  //     student:stu
  //   })
  //   fs.writeFile(dbPath, file, function (err) {
  //     if (err) {
  //       return callback(err)
  //     }
  //     callback(null)
  //   })
  // })
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }
      let stu = JSON.parse(data).student
      student.id = stu[stu.length - 1].id + 1
      stu.push(student)
      let file = JSON.stringify({
            student:stu
      })
      fs.writeFile(dbPath, file, function (err) {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  })
}
 /**
 * 更新学生
 */
exports.update = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
        callback(err)
    }
    let students = JSON.parse(data).student
    /**
     * 当某个遍历项符合item.id === student.id条件时，find会终止遍历，同时返回遍历项
     */
    let stu = students.find (function (item) {
      return item.id === parseInt(student.id)
    })
    // 遍历拷贝对象
    for (let key in student) {
      stu[key] = student[key]
    }
    let file = JSON.stringify({
      student:students
    })
    fs.writeFile(dbPath, file, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}
exports.finbyId = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
        callback(err)
    }
    let students = JSON.parse(data).student
    let ret = students.find(function (item) {
      return item.id === parseInt(id)
    })
    callback(null, ret)
  })
}
/**
 * 删除学生
 */
exports.del = function () {

}