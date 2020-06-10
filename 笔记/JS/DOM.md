# DOM

==DOM -- 文档对象模型==

```markdown
1. JS中对象的三种类型
	- 用户定义对象
	- 内建对象 Array/Date/Math ...
	- 宿主对象 浏览器内置对象
```

![](E:\GitResort\CodePractice\笔记\img\Snipaste_2020-06-07_21-01-41.PNG)

```javascript
// 得到的并不是一个真正意义上的数组，是一个集合 
var s = document.getElementsByTagName("input");
 console.log(s.toString()); // [object HTMLCollection]
```

