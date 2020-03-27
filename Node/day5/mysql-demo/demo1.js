var mysql = require('mysql');
// 创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'student'
});
// 连接数据库
connection.connect();
// 执行数据操作
// 查询数据
connection.query('SELECT * FROM `student1`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
// 插入数据
// connection.query('INSERT INTO student1 VALUES(null, "admin", "123456")', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

// 关闭连接
connection.end();