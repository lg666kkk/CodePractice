const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/project',{ useNewUrlParser: true,  useUnifiedTopology: true });

const UserSchema = new Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  avatart:{
    type:String,
  },
  identity:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default: Date.now
  }
})
module.exports = mongoose.model("User", UserSchema)
