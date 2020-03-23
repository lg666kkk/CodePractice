const fs = require('fs')

// 文件操作中的行对路径可以省略./
/**
 * 使用的所有文件操作的API都是异步的
 * 在文件操作的相对路径中
 *    ./data/a.txt  相对于当前目录
 *     data/a.txt   相对于当前目录
 *     /data/a.txt   当前文件模块所属磁盘根目录 D:/data/a.txt
 */
fs.readFile('data/a.txt', function (err, data) {
  if (err) {
    console.log('读取失败');
  }
  console.log(data.toString());
})  

// 在模块加载中，相对路径中的 ./ 不能省略
// require('data/foo.js') // 会报错
require('./data/foo')('hello')