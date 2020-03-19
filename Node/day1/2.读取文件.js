const fs = require('fs')
/**
 * writeFile
 * 1. 第一个参数：文件路径
 * 2. 第二个参数：写入内容
 * 3. 第三个参数：回调函数
 */
fs.writeFile('../data/qq.txt', 'node js nb', function (err) {
  if (err) {
    console.log('写入失败');
  }
})
fs.readFile('../data/qq.txt', function (err, data) {
  if (err) {
    console.log('读出失败');
  }
  console.log(data.toString());
})
