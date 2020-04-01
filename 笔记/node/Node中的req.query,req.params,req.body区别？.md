## Node中的req.query,req.params,req.body区别？

**req.params和req.query用在GET请求中**

### req.params

假设url为http://127.0.0.1:3000/api/admin/getUser/10

```javascript
app.get("/api/admin/getUser/:name",function (req,res) {
	console.log(req.params) // { name: '10' }
});
//就是把请求 / 后面的参数当成name，通过req.params就能获取到name
```

### req.query

假设url为http://127.0.0.1:3000/api/admin/getUser/?name=222

```javascript
app.get("/api/admin/getUser",function (req,res) {
    console.log(req.query['name']);// 222
    console.log(req.query)//{ name: '222' }
});
```

### req.body

**req.body用在post请求中**

