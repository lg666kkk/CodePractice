const fs = require('fs')
fs.readdir('E:/app/www', function (err, files) {
  if (err) {
    console.log('目录不存在');
  }
  console.log(files);
})
