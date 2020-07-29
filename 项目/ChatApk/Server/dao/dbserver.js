let brcypt = require("../dao/bcrypt");
const jwt = require("../dao/jwt");
const {
  Message,
  Friends,
  User,
  Group,
  GroupUser,
  GroupMessage,
} = require("../model/dbmodule");

exports.findUser = function (res) {
  User.find(function (err, user) {
    if (err) {
      console.log("用户数据不存在:" + err);
    } else {
      res.send(user);
    }
  });
};

// 注册(新建用户)
exports.buildUser = function (name, mail, pass, res) {
  // 进行密码加密
  let password = brcypt.encrpty(pass);
  let data = {
    name: name,
    password: password,
    email: mail,
    time: new Date(),
  };
  let user = new User(data);
  user.save(function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      return res.send({
        statusCode: 200,
      });
    }
  });
};
// 匹配用户
exports.countUser = function (data, type, res) {
  let wherestr = {};
  wherestr[type] = data;
  User.countDocuments(wherestr, function (err, result) {
    if (err) {
      res.send({
        statusCode: 500,
      });
    } else {
      res.send({
        statusCode: 200,
        result,
      });
    }
  });
};
// 用户验证
exports.userMatch = function (data, pwd, res) {
  let wherestr = { $or: [{ name: data }, { email: data }] };
  let out = {
    name: 1,
    password: 1,
    imgUrl: 1,
  };
  User.find(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      if (result.length === 0) {
        return res.send({
          statusCode: 400,
        });
      }
      //console.log(result);
      result.map(function (e) {
        const pwdMatch = brcypt.verification(pwd, e.password);
        if (pwdMatch) {
          let token = jwt.generateToken(e._id);
          let back = {
            id: e._id,
            name: e.name,
            imgUrl: e.imgUrl,
            token,
          };
          return res.send({
            statusCode: 200,
            back,
          });
        } else {
          return res.send({
            statusCode: 400,
          });
        }
      });
    }
  });
};
// 搜索用户
exports.SearchUser = function (data, res) {
  let wherestr;
  if (data === "liyaqing") {
    wherestr = {};
  } else {
    wherestr = {
      $or: [
        {
          name: { $regex: data }, // 模糊查找
        },
        {
          email: { $regex: data },
        },
      ],
    };
  }
  let out = {
    name: 1,
    email: 1,
    imgUrl: 1,
  };
  User.find(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      if (result.length == 0) {
        return res.json({
          message: "查无此人",
        });
      }
      return res.send({
        statusCode: 200,
        result,
      });
    }
  });
};
// 判断是否为好友
exports.isFriend = function (uid, fid, res) {
  let wherestr = {
    UserId: uid,
    friendId: fid,
    state: 0,
  };
  Friends.findOne(wherestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      if (result) {
        return res.send({
          statusCode: 200,
        });
      } else {
        // 不是好友
        return res.send({
          statusCode: 400,
          message: "不是好友",
        });
      }
    }
  });
};
// 搜索群
exports.SearchGroup = function (data, res) {
  let wherestr;
  if (data === "liyaqing") {
    wherestr = {};
  } else {
    wherestr = {
      $or: [
        {
          name: { $regex: data }, // 模糊查找
        },
      ],
    };
  }
  // 输出
  let out = {
    name: 1,
    imgUrl: 1,
  };
  Group.find(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      if (result.length == 0) {
        return res.json({
          message: "查无此群",
        });
      }
      return res.send({
        statusCode: 200,
        result,
      });
    }
  });
};
// 判断是否在群里
exports.isGroup = function (uid, gid, res) {
  let wherestr = {
    UserId: uid,
    GroupId: gid,
  };
  GroupUser.findOne(wherestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      if (result) {
        return res.send({
          statusCode: 200,
        });
      } else {
        // 不在群内
        return res.send({
          statusCode: 400,
          message: "不再群内",
        });
      }
    }
  });
};
// 用户详情
exports.userDetail = function (id, res) {
  let wherestr = {
    _id: id,
  };
  let out = {
    password: 0,
  };
  User.findOne(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      return res.send({
        statusCode: 200,
        result,
      });
    }
  });
};
// 用户修改
function UpdateInformation(data, update, res) {
  User.findByIdAndUpdate(data, update, function (err, resu) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      // 修改成功
      return res.send({
        statusCode: 200,
        message: "修改成功",
      });
    }
  });
}
/*
  修改密码: 新密码/用户id/原密码
*/
exports.userUpdate = function (data, res) {
  let update = {};
  // 判断是否有密码项
  if (typeof data.oldPassword !== "undefined") {
    // 有密码
    User.find(
      {
        _id: data.id,
      },
      {
        password: 1,
      },
      function (err, result) {
        if (err) {
          return res.send({
            statusCode: 500,
          });
        } else {
          result.map(function (e) {
            const pwdMatch = brcypt.verification(data.oldPassword, e.password);
            if (pwdMatch) {
              // 如果为密码,需要先加密
              if (data.type == "password") {
                let password = brcypt.encrpty(data.data);
                update[data.type] = password;
                UpdateInformation(data.id, update, res);
              } else {
                // 邮箱匹配
                update[data.type] = data.data;
                User.countDocuments(update, function (err, result) {
                  if (err) {
                    res.send({
                      statusCode: 500,
                    });
                  } else {
                    // 没有匹配到相同邮箱
                    if (result == 0) {
                      UpdateInformation(data.id, update, res);
                    } else {
                      return res.send({
                        statusCode: 300,
                        message: "邮箱已存在",
                      });
                    }
                  }
                });
              }
            } else {
              // 密码匹配失败
              return res.send({
                statusCode: 500,
                message: "密码匹配失败",
              });
            }
          });
        }
      }
    );
  } else if (data.type === "name") {
    // 用户名匹配
    update[data.type] = data.data;
    User.countDocuments(update, function (err, result) {
      if (err) {
        res.send({
          statusCode: 500,
        });
      } else {
        // 没有匹配到相同邮箱
        if (result == 0) {
          UpdateInformation(data.id, update, res);
        } else {
          return res.send({
            statusCode: 300,
            message: "用户名已存在",
          });
        }
      }
    });
  } else {
    update[data.type] = data.data;
    UpdateInformation(data.id, update, res);
  }
};
// 好友昵称修改
exports.updateFriendMarkName = function (data, res) {
  let wherestr = {
    UserId: data.uid,
    friendId: data.fid,
  };
  let updatestr = {
    markName: data.name,
  };
  Friends.updateOne(wherestr, updatestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      return res.send({
        statusCode: 200,
      });
    }
  });
};

// 获取好友昵称
exports.getFriendMarkName = function (data, res) {
  let wherestr = {
    UserId: data.uid,
    friendId: data.fid,
  };
  let out = {
    markName: 1,
  };
  Friends.findOne(wherestr, out, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      return res.send({
        statusCode: 200,
        result,
      });
    }
  });
};
// 好友操作
// 添加好友
exports.buildFriend = function (uid, fid, state, res) {
  let data = {
    UserId: uid,
    friendId: fid,
    state: state,
    Time: new Date(),
    lastTime: new Date(),
  };
  let friend = new Friends(data);
  friend.save(function (err, result) {
    if (err) {
      console.log("添加好友出错");
    } else {
      console.log("添加好友....");
    }
  });
};

// 添加一对一消息
exports.insertMessage = function (uid, fid, msg, type, res) {
  let data = {
    UserId: uid,
    friendId: fid,
    message: msg,
    time: new Date(),
    messageType: type,
    messageState: 1,
  };
  let message = new Message(data);
  message.save(function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      return res.send({
        statusCode: 200,
      });
    }
  });
};
// 一对一聊天最后通讯时间
exports.updateFriendTime = function (uid, fid) {
  let wherestr = {
    $or: [
      {
        UserId: uid,
        friendId: fid,
      },
      {
        UserId: fid,
        friendId: uid,
      },
    ],
  };
  let updatestr = {
    time: new Date().getTimezoneOffset(),
  };
  Friends.updateMany(wherestr, updatestr, function (err, result) {
    if (err) {
      console.log("更新好友时间出错");
    } else {
      /*
        return res.send({
        statusCode: 200
      })
      */
      console.log("更新好友时间成功");
    }
  });
};
// 好友申请
exports.applyFriend = (data, res) => {
  // 好友申请需要好友申请词: 我是xxx之类的
  // 判断是否为初次好友申请
  let wherestr = {
    UserId: data.uid,
    friendId: data.fid,
  };
  //console.log("111");
  Friends.countDocuments(wherestr, (err, result) => {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      if (result === 0) {
        // 初次申请
        this.buildFriend(data.uid, data.fid, 2);
        this.buildFriend(data.fid, data.uid, 1);
      } else {
        // 已经申请过好友了
        this.updateFriendTime(data.uid, data.fid);
      }
      // 添加消息 - 好友申请时内容固定是文字
      this.insertMessage(data.uid, data.fid, data.msg, 0, res);
    }
  });
};
// 更新好友状态
exports.updateFriendState = function (data, res) {
  let wherestr = {
    $or: [
      {
        UserId: data.uid,
        friendId: data.fid,
      },
      {
        UserId: data.fid,
        friendId: data.uid,
      },
    ],
  };
  let updatestr = {
    state: 0,
  };
  Friends.updateMany(wherestr, updatestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      return res.send({
        statusCode: 200,
      });
    }
  });
};
// 拒绝或者删除好友
exports.deleteFriend = function (data, res) {
  let wherestr = {
    $or: [
      {
        UserId: data.uid,
        friendId: data.fid,
      },
      {
        UserId: data.fid,
        friendId: data.uid,
      },
    ],
  };
  Friends.deleteMany(wherestr, (err, result) => {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    } else {
      return res.send({
        statusCode: 200,
      });
    }
  });
};
// 按要求获取用户列表
exports.getUsers = function (uid, state, res) {
  let query = Friends.find({});
  // 查询条件
  query.where({ UserId: uid, state: state });
  // 查找friendID关联的user对象
  query.populate("friendId");
  // 排序方式: 最后通讯时间
  query.sort({ lastTime: -1 });
  // 查询结果
  query
    .exec()
    .then(function (e) {
      let result = e.map((item) => {
        return {
          id: item.friendId._id,
          name: item.friendId.name,
          markName: item.markName,
          imgUrl: item.friendId.imgUrl,
          lastTime: item.lastTime,
        };
      });
      return res.send({
        statusCode: 200,
        result,
      });
    })
    .catch(function (err) {
      return res.send({
        statusCode: 500,
      });
    });
};
// 按要求获取好友最后一条一对一消息
exports.getOneMsg = function (uid, fid, res) {
  let query = Message.findOne({});
  // 查询条件
  query.where({
    $or: [
      {
        UserId: uid,
        friendId: fid,
      },
      {
        UserId: fid,
        friendId: uid,
      },
    ],
  });
  // 排序方式: 最后通讯时间
  query.sort({ time: -1 });
  // 查询结果
  query
    .exec()
    .then(function (e) {
      //console.log(e);
      let result = {
        message: e.message,
        messageType: e.messageType,
        lastTime: e.time,
      };
      return res.send({
        statusCode: 200,
        result,
      });
    })
    .catch(function (err) {
      return res.send({
        statusCode: 500,
      });
    });
};
// 汇总好友一对一未读消息数
exports.noReadMsg = function (uid, fid, res) {
  // 条件
  let wherestr = {
    UserId: uid,
    friendId: fid,
    messageState: 1,
  };
  Message.countDocuments(wherestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    }
    return res.send({
      statusCode: 200,
      result,
    });
  });
};
// 好友一对一消息状态更改
exports.updateMsg = function (uid, fid, res) {
  // 条件
  let wherestr = {
    UserId: uid,
    friendId: fid,
    messageState: 1,
  };
  let updatestr = {
    messageState: 0,
  };
  Message.updateMany(wherestr, updatestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    }
    return res.send({
      statusCode: 200,
    });
  });
};
// 按要求获取群列表
exports.getGroup = function (uid, res) {
  // id为用户所在的群
  let query = GroupUser.find({});
  // 查询条件
  query.where({ UserId: uid });

  query.populate("GroupId");
  // 排序方式: 最后通讯时间
  query.sort({ lastTime: -1 });
  // 查询结果
  query
    .exec()
    .then(function (e) {
      let result = e.map((item) => {
        return {
          id: item.GroupId._id,
          name: item.GroupId.name,
          markName: item.name,
          imgUrl: item.GroupId.imgUrl,
          lastTime: item.lastTime,
          tip: item.tip,
        };
      });
      return res.send({
        statusCode: 200,
        result,
      });
    })
    .catch(function (err) {
      return res.send({
        statusCode: 500,
      });
    });
};
// 获取最后一条群消息
exports.getGroupMsg = function (gid, res) {
  let query = GroupMessage.findOne({});
  // 查询条件
  query.where({
    $or: [
      {
        GroupId: gid,
      },
    ],
  });
  query.populate("UserId");
  // 排序方式: 最后通讯时间
  query.sort({ time: -1 });
  // 查询结果
  query
    .exec()
    .then(function (e) {
      //console.log(e);
      let result = {
        message: e.message,
        messageType: e.messageType,
        lastTime: e.time,
        name: e.UserId.name,
      };
      return res.send({
        statusCode: 200,
        result,
      });
    })
    .catch(function (err) {
      return res.send({
        statusCode: 500,
      });
    });
};
// 群消息状态更改
exports.updateGroupMsg = function (uid, gid, res) {
  // 条件
  let wherestr = {
    UserId: uid,
    GroupId: gid,
  };
  let updatestr = {
    tip: 0,
  };
  GroupMessage.updateOne(wherestr, updatestr, function (err, result) {
    if (err) {
      return res.send({
        statusCode: 500,
      });
    }
    return res.send({
      statusCode: 200,
    });
  });
};
