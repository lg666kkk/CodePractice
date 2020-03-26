const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,  useUnifiedTopology: true });
// 创建一个模型
// 就是在设计数据库
const Cat = mongoose.model('Cat', { name: String });
// 实例化一个cat
const kitty = new Cat({ name: 'Zildjian' });
// 持久化保存实例
kitty.save().then(() => console.log('meow'));