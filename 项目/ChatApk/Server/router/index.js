const express = require("express")
// 创建一个路由容器
const router = express.Router()

// 测试
router.get("/test", (req,res) => {
  res.send("lg NB")
})

// 导出
module.exports = router
