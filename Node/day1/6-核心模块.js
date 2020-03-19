const os = require('os')
const path = require('path')
// 获取机器CPU信息
//console.log(os.cpus());
// 获取内存信息
console.log(os.totalmem());
// 获取扩展名
console.log(path.extname('c:/s.txt'));
