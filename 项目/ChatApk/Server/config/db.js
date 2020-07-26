let mongoose = require("mongoose")
// 数据库连接
mongoose.connect("mongodb://localhost/chatSystem",{ useNewUrlParser: true,  useUnifiedTopology: true , useFindAndModify:true});
let db = mongoose.connection;
mongoose.set('useFindAndModify', false)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("连接成功!!!");
});

module.exports = db
