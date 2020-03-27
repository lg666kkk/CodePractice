/**设计Schema,发布model */
// 导包
const mongoose = require('mongoose');
// 拿到架构
let Schema = mongoose.Schema
//1. 连接数据库
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,  useUnifiedTopology: true });
//2. 设计集合结构(表结构)
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
let UserSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有，不能为空
  },
  password: {
    type: Number,
    required: true
  },
  email: {
    type: String
  }
})
/* 3. 将文档结构发布为模型
// mongoose.model方法用于将一个架构发布为model
// 第一个参数：传入一个大写名词单数字符串，用来表示你的数据表名称
          mongoose会自动将大写名词的字符串生成小写负数的集合名称
// 第二个参数：架构
// 返回值：模型构造函数
*/
let User = mongoose.model('User', UserSchema);
/**
 * 当我们有了这个模型构造函数之后，就可以使用这个构造函数对users集合中的数据为所欲为了
 */
/** 增加数据 */
// let admin1 = new User({
//   username: 'zzz',
//   password: '12222',
//   email: 'admin@admin.com'
// })
// admin1.save(function (err, data) {
//   if (err) {
//     console.log('存储失败');
//   } else {
//     console.log('存储成功');
//     console.log(data);
//   }
// })
/**
 * 存储成功
{ _id: 5e7d62c2bc3e7450fc90cf13,
  username: 'root',
  password: 12222,
  email: 'admin@admin.com',
  __v: 0 }
 */
/**查询所有数据 */
// User.find(function (err, data) {
//   if (err) {
//     console.log('查询失败');
//   } else {
//     console.log('查询成功');
//     console.log(data);
//   }
// })
/**根据条件查询数据 */
// User.find({
//   username: 'zzz'
// }, function (err, data) {
//   if (err) {
//     console.log('查询成功');
//   } else {
//     console.log('查询失败');
//     console.log(data);
//   }
// })
// User.findOne({
//   username: 'zzz',
//   password: '23333'
// }).then((data) => {
//   console.log(data)
// }).catch((err) => {
//   console.log('失败');
// })
// User.deleteOne({
//   username: 'zzz'
// }).then(() => {
//   console.log('删除成功');
// }).catch(() => {
//   console.log('删除失败');
// })
/**查询所有数据 */

User.findByIdAndUpdate('5e7d65157a679b4c745c4773', {
  password: '123'
}).then(() => {
  console.log('更新成功');
}).catch((err) => {
  console.log('更新失败');
})

User.find(function (err, data) {
  if (err) {
    console.log('查询失败');
  } else {
    console.log('查询成功');
    console.log(data);
  }
})
