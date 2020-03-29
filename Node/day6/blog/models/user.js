const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true,  useUnifiedTopology: true });
var UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    //Date.now后面不加()，加()相当于立马调用，意味着时间已经写死了
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type:String,
    default:'/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type:Number,
    enum: [-1,0,1],
    default: -1
  },
  birthday:{
    type:Date
  },
  status: {
    type: Number,
    // 0-没有权限限制，1-不可以评论，2-不可以登录使用
    enum: [0,1,2],
    default:0
  }
})
module.exports = mongoose.model("User", UserSchema)