const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/project',{ useNewUrlParser: true,  useUnifiedTopology: true });

const ProfileSchema = new Schema({
  type:{
    type:String,
  },
  descripe:{
    type:String,
  },
  income:{
    type:String,
    required: true
  },
  expend:{
    type:String,
    required: true
  },
  cash:{
    type:String,
    required:true
  },
  remark:{
    type:String,
  },
  date:{
    type:Date,
    default: Date.now
  }
})
module.exports = mongoose.model("Profiles", ProfileSchema)
