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
    default: Date.now
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
  },
  praises: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  commits: {
    type: Array
  }
})

module.exports = Articles = mongoose.model('Article', ArticleSchema)
