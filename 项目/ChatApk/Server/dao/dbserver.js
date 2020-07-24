let dbmodel = require('../model/dbmodule')
let brcypt = require('../dao/bcrypt')
const jwt = require('../dao/jwt')

let User = dbmodel.User
let Friend = dbmodel.Friends
let Group = dbmodel.Group
let GroupUser = dbmodel.GroupUser

exports.findUser = function (res) {
  User.find(function (err, user) {
    if (err) {
      console.log("用户数据不存在:" + err);
    } else {
      res.send(user)
    }
  })
}

// 注册(新建用户)
exports.buildUser = function (name, mail, pass, res) {
  // 进行密码加密
  let password = brcypt.encrpty(pass)
  let data = {
    name: name,
    password:password,
    email: mail,
    time: new Date()
  }
  let user = new User(data)
  user.save(function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500
      })
    } else {
      return res.send({
        statusCode: 200
      })
    }
  })
}
// 匹配用户 
exports.countUser = function (data, type, res) {
  let wherestr = {}
  wherestr[type] = data
  User.countDocuments(wherestr, function (err, result) {
    if (err) {
      res.send({
        statusCode: 500
      })
    } else {
      res.send({
        statusCode: 200,
        result
      })
    }
  })
}
// 用户验证
exports.userMatch = function (data, pwd, res) {
  let wherestr ={$or:[{'name':data}, {"email": data}]}
  let out = {
    'name': 1,
    'password': 1,
    'imgUrl': 1
  }
  User.find(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500
      })
    } else {
      if (result.length === 0) {
        return res.send({
          statusCode:400
        })
      }
      //console.log(result);
      result.map(function(e) {
        const pwdMatch = brcypt.verification(pwd, e.password)
        if (pwdMatch) {
          let token = jwt.generateToken(e._id)
          let back = {
            id: e._id,
            name: e.name,
            imgUrl: e.imgUrl,
            token
          }
          return res.send({
            statusCode:200,
            back
          })
        } else {
          return res.send({
            statusCode:400
          })
        }
      })
    }
  })
}
// 搜索用户
exports.SearchUser = function (data, res) {
  let wherestr
  if (data === 'liyaqing') {
    wherestr = {}
  } else {
    wherestr = {
      $or:[
        {
          'name':{$regex:data}   // 模糊查找
        },
        {
          'email':{$regex:data}
        }
      ]
    }
  }
  let out = {
    'name': 1,
    'email': 1,
    'imgUrl': 1
  }
  User.find(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode:500
      })
    } else {
      if (result.length == 0) {
        return res.json({
          message:"查无此人"
        })
      }
      return res.send({
        statusCode:200,
        result
      })
    }
  })
}
// 判断是否为好友
exports.isFriend = function (uid, fid, res) {
  let wherestr = {
    'UserId':uid,
    'friendId':fid,
    'state':0
  }
  Friend.findOne(wherestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode:500
      })
    } else {
      if (result) {
        return res.send({
          statusCode:200
        })
      } else {
        // 不是好友
        return res.send({
          statusCode:400,
          message: "不是好友"
        })
      }
    }
  })
}
// 搜索群
exports.SearchGroup = function (data, res) {
  let wherestr
  if (data === 'liyaqing') {
    wherestr = {}
  } else {
    wherestr = {
      $or:[
        {
          'name':{$regex:data}   // 模糊查找
        }
      ]
    }
  }
  // 输出
  let out = {
    'name': 1,
    'imgUrl':1
  }
  Group.find(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode:500
      })
    } else {
      if (result.length == 0) {
        return res.json({
          message:"查无此群"
        })
      }
      return res.send({
        statusCode:200,
        result
      })
    }
  })
}
// 判断是否在群里
exports.isGroup = function (uid, gid, res) {
  let wherestr = {
    'UserId':uid,
    'GroupId':gid
  }
  GroupUser.findOne(wherestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode:500
      })
    } else {
      if (result) {
        return res.send({
          statusCode:200
        })
      } else {
        // 不在群内
        return res.send({
          statusCode:400,
          message: "不再群内"
        })
      }
    }
  })
}
// 用户详情
exports.userDetail = function (id, res) {
  let wherestr = {
    '_id': id
  }
  let out = {
    'password': 0
  }
  User.findOne(wherestr, out , function (err, result) {
    if (err) {
      return res.send({
        statusCode:500
      })
    } else {
      return res.send({
        statusCode:200,
        result
      })
    }
  })
}
// 用户修改
/*
  修改密码: 新密码/用户id/原密码
*/
exports.userUpdate = function (data, res) {
  let update = {}
  // 判断是否有密码项
  if (typeof (data.oldPassword) !== 'undefined') {
    // 有密码
    User.find(
      {
        '_id':data.id
      },
      {
        'password':1
      },
      function (err, result) {
        if (err) {
          return res.send({
            statusCode:500
          })
        } else {
          result.map(function (e) {
            const pwdMatch = brcypt.verification(data.oldPassword, e.password)
            if (pwdMatch) {
              // 如果为密码,需要先加密
              if (data.type == "password") {
                let password = brcypt.encrpty(data.data)
                update[data.type] = password
              } else {
                update[data.type] = data.data
              }
              User.findByIdAndUpdate(data.id, update, function (err, resu) {
                if (err) {
                  return res.send({
                    statusCode:500
                  })
                } else {
                  // 修改成功
                  return res.send({
                    statusCode: 200,
                    message:"修改成功"
                  })
                }
              })
            } else {
              // 密码匹配失败
              return res.send({
                statusCode:500,
                message: "密码匹配失败"
              })
            }
          })
        }
      }
    )
  } else {
    update[data.type] = data.data
    User.findByIdAndUpdate(data.id, update, function (err, result) {
      if (err) {
        return res.send({
          statusCode:500
        })
      } else {
        // 修改成功
        return res.send({
          statusCode: 200,
          message:"修改成功"
        })
      }
    })
  }
}
// 好友昵称修改
exports.updateFriendMarkName = function (data, res) {
  let wherestr = {
    'UserId':data.uid,
    'friendId':data.fid
  }
  let updatestr = {
    'markName':data.name
  }
  Friend.updateOne(wherestr, updatestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode:500
      })
    } else {
      return res.send({
        statusCode:200
      })
    }
  })
}

// 获取好友昵称
exports.getFriendMarkName = function (data, res) {
  let wherestr = {
    'UserId':data.uid,
    'friendId':data.fid
  }
  let out = {
    'markName':1
  }
  Friend.findOne(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode:500
      })
    } else {
      return res.send({
        statusCode:200,
        result
      })
    }
  })
}
