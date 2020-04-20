## Node -- Blog项目
### 项目结构
```javascript
|  app.js         入口
|  modles         数据库相关操作
|     -user.js    用户信息设计
|
|
|
|
|
|
```
### 后台 --- node + mongoose 实现接口
#### 路由设计

| 请求路径                 | 请求方法 | get参数 | post参数                       | 备注               |
| ------------------------ | -------- | ------- | ------------------------------ | ------------------ |
| /api/admin/signup        | POST     |         | username,password              | 处理注册请求       |
| /api/admin/signin        | POST     |         | username,password              | 处理登录请求       |
| /api/admin/getUser/:name | GET      |         |                                | 根据用户名获取用户 |
| /api/articleList         | GET      |         |                                | 获取所有文章       |
| /api/articleDetail/:id   | GET      |         |                                | 文章详情页         |
| /api/admin/saveArticle   | POST     |         | title,date,content,gist,labels | 文章保存           |
| /api/admin/updateArticle | POST     |         | title,date,content,gist,labels | 文章更新           |
| /api/admin/deleteArticle | POST     |         |                                | 文章删除           |

使用gravatar来获取头像
使用jsonwebtoken来生成token
使用md5加密
使用passport-jwt验证token

### 目前未解决的问题
1. 每篇博客的阅读原文没有登录时无法查看
