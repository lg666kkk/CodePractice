// 引入模板引擎
const template = require('art-template')
const path = require('path')
const dateFormat = require('dateformat')
/**
 * template方法用来拼接字符串，参数如下：
 *   1. 模板路径  绝对路径
 *      _dirname 代表当前文件所在路径，app.js在code目录下，所以_dirname会取到code目录下
 *   2. 要在模板中显示的数据，对象类型
 * 该方法返回拼接好的字符串
 *  */ 
// 
// 拼接字符串得到路径
//const views = path.join(__dirname, 'views', 'index.html')
// 设置模板根目录
template.defaults.root = path.join(__dirname, 'views')
// 导入模板变量
template.defaults.imports.dateFormat = dateFormat
// 配置模板默认路径
template.defaults.extname = '.html'
const html = template(/*views*/ 'index', {
  name: '张三',
  age: 20,
  content: '<h2>我是</h2>',
  time: new Date()
})
console.log(html);
console.log(__dirname);//E:\GitResort\CodePractice\模板引擎\code