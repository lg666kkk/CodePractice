const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/student',{ useNewUrlParser: true,  useUnifiedTopology: true });
let Schema = mongoose.Schema
let studentSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  gender: {
    type:Number,
    enum: [0, 1],
    required: true
  },
  age:{
    type:Number,
    required: true
  },
  hobbies: {
    type: String,
    required: true
  }

})
// 直接导出模型构造函数
module.exports = mongoose.model('Student', studentSchema)