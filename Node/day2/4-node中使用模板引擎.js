// art-template
/**
 * art-template不仅可以在浏览器使用，也可以在node中使用
 * 1. npm安装
 * 2. 在node中使用 aet-template模板引擎 --- 使用require加载
 * 3. 在需要使用的文件模块中加载art-template
 */
const fs = require('fs')
const template = require('art-template')
fs.readFile('./tpl.html', function (err, data)   {
  if (err) {
    console.log('文件读取失败');
  }
  // data是二进制数据，转换为String
  data = data.toString()
  let ret = template.render( data,{
    name: 'jack',
    age: 20,
    provience : '甘肃',
    hobbies: [
      '222',
      '333',
      '444'
    ]
  })
  console.log(ret);
})