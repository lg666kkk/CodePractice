let mongoose = require("mongoose")
let db = require("../config/db")
let Schema = mongoose.Schema
// 用户表
let User = new Schema({
  name: {
    type:String // 用户名
  },
  password: {
    type:String // 密码
  },
  email: {
    type:String // 邮箱
  },
  sex: {
    type:String, // 性别
    default: 'asexual' 
  },
  birthday: {
    type:Date // 生日
  },
  phone: {
    type:Number // 电话
  },
  express: {
    type:String // 个人介绍
  },
  imgUrl: {
    type:String, // 头像
    default: 'user.png'
  },
  registerDate: {
    type:Date // 注册时间
  }
})
  /**
  * @ author lg
  * 好友表
  */
let Friends = new Schema({
  UserId: { // 用户ID
    type:Schema.Types.ObjectId, 
    ref: 'User'
  },
  friendId: { // 好友ID
    type:Schema.Types.ObjectId, 
    ref: 'User'
  },
  state: { // 好友状态
    type:String 
  },
  Time: { // 生成时间
    type:Date 
  }
})
  /**
  * @ author lg
  * 一对一消息表
  */
let Message = new Schema({
  UserId: { // 用户ID
    type:Schema.Types.ObjectId, 
    ref: 'User'
  },
  friendId: { // 好友ID
    type:Schema.Types.ObjectId, 
    ref: 'User'
  },
  message: { // 发送内容
    type:String 
  },
  messageType: { // 发送内容类型
    type:String 
  },
  time: { // 发送时间
    type:Date 
  },
  messageState: { // 消息状态(0已读, 1:未读)
    type:Number
  }
})
  /**
  * @ author lg
  * 群表
  */
let Group = new Schema({
  UserId: { // 群主ID
    type:Schema.Types.ObjectId, 
    ref: 'User'
  },
  name: { // 群名
    type:String
  },
  imgUrl: { // 群头像
    type:String, 
    default: 'user.png'
  },
  messageType: { // 发送内容类型
    type:String 
  },
  time: { // 群创建时间
    type:Date 
  },
  notice: { // 群公告
    type:String
  }
})
  /**
  * @ author lg
  * 群成员表
  */
let GroupUser = new Schema({
  GroupId: { // 群ID
    type:Schema.Types.ObjectId, 
    ref: 'Group'
  },
  UserId: { // 用户ID
    type:Schema.Types.ObjectId, 
    ref: 'User'
  },
  name: { // 群内名称
    type:String
  },
  time: { // 加入时间
    type:Date 
  },
  tip: { // 未读消息数
    type:Number,
    default: 0
  },
  isShield: { // 是否屏蔽群消息(0-不屏蔽, 1-屏蔽)
    type: Number
  }
})
  /**
  * @ author lg
  * 群消息表
  */
let GroupMessage = new Schema({
  GroupId: { // 群ID
    type:Schema.Types.ObjectId, 
    ref: 'Group'
  },
  UserId: { // 用户ID
    type:Schema.Types.ObjectId, 
    ref: 'User'
  },
  message: { // 发送内容
    type:String 
  },
  messageType: { // 发送内容类型
    type:String 
  },
  time: { // 发送时间
    type:Date 
  }
})
module.exports = db.model('User', User)
module.exports = db.model('Friends', Friends)
module.exports = db.model('Group', Group)
module.exports = db.model('GroupUser', GroupUser)
module.exports = db.model('GroupMessage', GroupMessage)
module.exports = db.model('Message', Message)
