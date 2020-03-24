## Express -- crud

### 起步
- 初始化
- 模板处理

### 路由设计
| 请求方法 |   请求路径     | get参数   |       post参数            |       备注      | 
|:------: |  :--------:    | :-----:  |        :------:           |       :----:    |
|   GET   |    /student    |          |                           |     渲染首页     |
|   GET   |  /student/news |          |                           |  渲染添加学生页面 |
|   POST  |  /student/news |          | name、age、gender、hobbies | 处理添加学生请求  |  
|   GET   |  /student/edit | id       |                           |  渲染编辑页面     |
|   POST  |  /student/edit |          | name,age,gender,hobbies,id| 处理编辑请求|
|   GET   |  /student/delete | id     |                           | 处理删除请求 |