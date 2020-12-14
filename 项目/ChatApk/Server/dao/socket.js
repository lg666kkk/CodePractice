const { use } = require("../router")

module.exports = function(io) {
  io.on("connect", (socket) => {
    console.log("socket连接成功!")
    let users = {} // socket注册的用户
    // 用户登录时发送的请求
    socket.on("login", (id) => {
      console.log("id值为--",id)
      
      // 回复客户端
      socket.emit("loginMsg", socket.id)
      socket.name = id
      users[id] = socket.id
    })

    // 用户离开
    socket.on("disconnecting", () => {
      console.log(users);
      if (Object.hasOwnProperty(socket.name)) {
        delete users[socket.name]
      }
      console.log(socket.id + "离开");
    })
  })
}