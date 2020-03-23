## Node中的URL总结

<img src='./img/111.PNG' width=50%>

上图是node官网中的一张图，在node中，url模块提供了两套API来处理URL：一个是旧版本遗留的 API，一个是实现了 WHATWG标准的新 API。上图中，下方的是WHATWG的URL对象的属性，上方是旧的URL对象属性。

### URL(Universal Resource Locator，统一资源定位符)的组成
URL主要包含：协议、主机、端口号、路径、参数、查询等
URL由三部分组成：协议类型，主机名和路径及文件名

#### protocol(协议类型)：
1. 表示访问资源和服务的协议
2. 常见的协议类型有：http,ftp,mailto,file等
   - http:超文本传输协议,是因特网上应用最为广泛的网络传输协议。格式为http://
   - ftp:文件传输协议。格式为ftp://
   - file:访问本地计算机上的资源。格式为file:///
   - mailto:个用于发送邮件的URL协议。格式为mailto:
   - ....
#### hostname -- 主机名
#### port -- 端口号
1. 类似于房间号
#### pathname -- 文件路径
1. 由零或多个“/”符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。
#### search -- 查询部分(?query)
1. 可选，用于给动态网页（如使用CGI、ISAPI、PHP/JSP/ASP/ASP.NET等技术制作的网页）传递参数，可有多个参数，用“&”符号隔开，每个参数的名和值用“=”符号隔开。
#### hash

### Node中常用的URL操作命令
1. url.parse()方法
```javascript
url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash')
// 得到的结果如下
Url {
  protocol: 'https:', // 协议
  slashes: true, // (协议的“：”号后是否有“/”)(slashes意思是斜杠)
  auth: 'user:pass', // // 用户名，密码
  host: 'sub.host.com:8080',// host主机名
  port: '8080', // 端口号
  hostname: 'sub.host.com', // 不带端口号的主机名
  hash: '#hash', // 哈希值(URL属性中在井号“#”后面的分段)
  search: '?query=string', // 查询字符串(URL属性中跟在问号后面的部分包括?号)
  query: 'query=string', // 请求参数
  pathname: '/p/a/t/h', // 路径名
  path: '/p/a/t/h?query=string', // 带查询的路径名
  href:
   'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash' // 原字符串本身
}
```
2. url.host()
3. url.hash()
4. url.hostname()
   - 获取及设置 URL 的主机名部分
5. url.href()
6. url.origin()
   - 获取只读的序列化的 URL的origin
7. url.password()
   - 获取及设置 URL 的密码部分。
8. url.pathname()
   - 获取及设置 URL 的路径部分。
9. url.port()
   - 获取及设置 URL 的端口部分。
10. url.protocol() -- 获取及设置 URL 的协议部分。
11. url.toString()
   - 在 URL 对象上调用 toString() 方法将返回序列化的 URL。 返回值与 url.href 和 url.toJSON() 的相同。
   - 由于需要符合标准，此方法不允许用户自定义URL的序列化过程。如果需要更大灵活性，require('url').format()可能更合适。
12. url.toJSon()
   - 在 URL 对象上调用toJSON()方法将返回序列化的URL。返回值与url.href和url.toString()的相同 
13. url.search()
   - 获取及设置 URL 的序列化查询部分。
```javascript
const myURL = new URL('https://example.org/abc?123');
console.log(myURL.search);
// 打印 ?123

myURL.search = 'abc=xyz';
console.log(myURL.href);
// 打印 https://example.org/abc?abc=xyz
```
