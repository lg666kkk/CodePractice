let foo = 'boo'
console.log(foo);
// 使用require加载fs核心模块
const fs = require('fs')
/**
 * 读取文件
 *   第一个参数是要读取的文件路径
 *   第二个参数是回调函数
 *        error 
 *          如果读取失败，error是错误对象
 *          如果读取成功，error是null
 *        data
 *          如果读取成功，data是读取到的数据
 */
fs.readFile('../data/hello.txt', function (err, data) {
  if (err) {
    console.log('读取文件失败');
  }
  console.log(data.toString());
})