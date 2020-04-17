const mongoose = require('mongoose');
let Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/Blog1',{ useNewUrlParser: true,  useUnifiedTopology: true });
// 设计集合结构
let UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  introduce: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true
  }
})
let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required:true
  },
  content: {
    type: String,
    required: true
  },
  gist: {
    type: String,
    required: true
  },
  labels: {
    type: Array,
    required: true
  } 
})
const Models = {
  User : mongoose.model('User', UserSchema),
  Article : mongoose.model('Article', ArticleSchema)
}
module.exports = Models
