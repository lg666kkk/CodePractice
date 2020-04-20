const mongoose = require('mongoose');
let Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/Blog1',{ useNewUrlParser: true,  useUnifiedTopology: true });
// 设计集合结构
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

module.exports = Articles = mongoose.model('Article', ArticleSchema)
