# BOM

```markdown
- BOM -- 浏览器模型对象
 BOM提供了很多对象，用于访问浏览器的功能
 1. window
    alert()
    confirm()
    prompt()
 
    setInterval()
    aetTimeout()
 2. location
    href
    hash
    url
    ....
    reload()
 3. screen
 4. history
    go()

```

## window对象

- **BOM的核心是window，它表示浏览器的一个实例。在浏览器中，window对象具有双重角色，它既是通过JS访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象**

- **在全局作用域中声明的变量、函数都会变成window对象的属性和方法，但定义在全局上的变量和直接定义在window对象上的变量还是有区别的：==全局变量不能通过delete操作符删除，而直接定义在window对象上的属性可以直接使用delete删除==**

  ```javascript
  var aa = 12
  window.a = 11
  console.log(delete window.a); // IE9以下报错，其他浏览器返回true
  console.log(delete window.aa); // IE9以下报错，其他浏览器返回false
  console.log(window.aa); // 12
  console.log(window.a); // undefined
  ```

- 尝试访问未声明的变量会报错，但是通过查询window对象，可以知道某个可能未声明的变量是否存在。

  ```javascript
  var newValue = oldValue // 报错，oldValue未声明
  
  var newValue = window.oldValue // undefined 
  ```

### 对话框


#### alert()

```javascript
// 接受一个字符串并将其显示给用户
alert("ee")
```



![](E:\GitResort\CodePractice\笔记\img\Snipaste_2020-06-06_19-02-07.PNG)

#### confirm()

```javascript
confirm('你确定离开网页吗？')
// 并且具有返回值
let a = window.confirm('你确定离开网页吗？')
console.log(a) // 若点击确定返回true，点击取消返回false
```

![](E:\GitResort\CodePractice\笔记\img\Snipaste_2020-06-06_19-02-28.PNG)

#### prompt()

```javascript
prompt('你早晨吃了什么？')
// 具有返回值
let a = prompt("你早晨吃了什么？")
console.log(a) // 返回值为文本框中输入的内容，若点击取消则返回null
```

![](E:\GitResort\CodePractice\笔记\img\Snipaste_2020-06-06_19-06-10.PNG)

```javascript
// 该方法具有第二个参数
prompt("你吃了吗？", "吃了")
```

![](E:\GitResort\CodePractice\笔记\img\Snipaste_2020-06-06_19-12-54.PNG)

### setTimeout()

```markdown
- 超时调用:在指定的时间过后执行代码
- 调用setTimeout()后，该方法会返回一个数值ID，表示超时调用。这个超时调用ID是计划执行代码的唯一标识符，可以通过它来取消超时调用，使用clearTimeout()来取消
- 超时调用的代码都是在全局作用域中执行的，因此函数中的this的值在非严格模式下指向window,在严格模式下指向undefined
```

### setInterval()

```markdown
- 间歇调用：每隔指定的时间执行一次，直至间歇调用被取消或者页面被卸载
- 同样的会返回一个ID，该ID可用于将来在某个时刻取消间歇调用
```

==可见，在使用超时调用时，没有必要跟踪超时调用ID，因为每次执行代码之后，如果不再设置另一次超时调用，调用就会自行停止。==

### 窗口位置

==IE，Safari, Opera， Chrome支持screenLeft和screenTop方法，但是火狐浏览器不支持这两个方法，火狐浏览器支持screenX和screenY方法==

```markdown
// 以下代码可以跨浏览器取得窗口左边和上边的位置
var leftPos = (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX
var topPos = (typeof window.screenTop == 'number') ? window.screenTop : window.screenY
```

### 窗口大小

```markdown
1. IE9+、Firefox、Safair、Opera、Chrome提供了四个属性：
	- innerWidth 
	- innerHeight 
	- outerWidth 
	- outerHeight
2. 在IE9+、Firefox、Safair中，outerWidth、outerHeight返回浏览器窗口本身的尺寸
3. 在Opera中，outerWidth、outerHeight这两个属性的值页面视图容器的大小，而innerHeight、innerWidth则表示该容器中页视图区的大小(减去了边框宽度)
4. 在Chrome中，这四个属性返回相同的值，即页面视口大小而非浏览器窗口大小
```

### 导航和打开窗口

```markdown
使用window.open()方法既可以导航到一个特定的URL，也可以打开一个新的浏览器窗口。
	- 该方法有四个参数
	- window.open(要加载的URL, 窗口目标,一个特性字符串, 一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值)
	- 通常只需要传递第一个参数即可，最后一个参数只在不打开新窗口的情况下使用
```

## Location对象

==location对象是最有用的BOM对象之一==

它既是window对象的属性也是document对象的属性，换句话说：window.location和document.location引用的是同一个对象

### Location对象的所有属性

| 属性名   | 例子                  | 说明                                      |
| -------- | --------------------- | ----------------------------------------- |
| hash     | "#content"            | 返回URL中的hash(#号后跟0或多个字符)       |
| host     | "www.wrox.com:80"     | 返回服务器名称和端口号                    |
| hostname | "www.wrox.com"        | 只返回服务器名称                          |
| href     | "http://www.wrox.com" | 返回当前加载页面的完整URL                 |
| pathname | "/xxx/"               | 返回URL中的目录或文件名                   |
| port     | 80                    | 返回端口号                                |
| protocol | http/https            | 返回协议类型                              |
| search   | "?q=java"             | 返回URL的查询字符串。这个字符串以问号开头 |

### 查询字符串参数

```javascript
function getQueryStringArgs() {
    /** 
       * substring() 方法用于提取字符串中介于两个指定下标之间的字符
       *    substring(start, stop) -- start必需; stop可选,若该参数省略，那么返回的子串会一直到字符串的结尾。
       *    substring() 方法返回的子串包括 start 处的字符，但不包括 stop 处的字符
       *    如果参数start与stop相等，那么该方法返回的就是一个空串(即长度为0的字符串)如果start比stop大，那么该方法在提取子串之前会先交换这两个参数。
       * */
    let qs = (location.search.length > 0) ? location.search.substring(1) : ""
    let args = {} // 用于保存每一项
    let items = qs.length ? qs.split('&') : [] // 获取每一项
    let item = null
    let name = null
    let value = null
    len = items.length
    for (let i=0; i<len; i++) {
        item = items[i].split("=")
        name = decodeURIComponent(item[0])
        value = decodeURIComponent(item[1])
        if (name.length) {
            args[name] = value
        }
    }
    return args
}
// 例如URL为 file:///D:/VscodeExample/19.html?dd=qq&ss=22
var str = getQueryStringArgs()
console.log(str); // {dd:"qq", ss: "22"}
```

### 位置操作

#### location.assign()

```markdown
location.assign("URL地址字符串")
// 会立即跳转到所给的URL地址并在历史记录中生成一条记录(可通过后退按钮回到前一个页面)
```

#### location.href

```markdown
location.href = "http://www.baidu.com"
// 会立即跳转到百度页面，其核心也是调用了assign()方法
```

#### 其他方法

```markdown
为hash,host,hostname,port等赋新值也可以改变URL
这些方法改变的URL都会在浏览器记录中生成一条新纪录
// 例如
location.hash = "#context"
....
```

#### replace()

```markdown
location.replace(URL字符串地址) 
// 该方法不会产生历史记录，无法回到跳转前的页面
```

#### reload()

```markdown
该方法主要用于重新加载当前的页面
location.reload() // 重新加载页面(可能从缓存中加载也可能从服务器加载)
location.reload(true) // 重新加载页面(强制从服务器重新加载)
```

## navigator对象

==**navigater对象包含有关浏览器的信息**==

### 检测插件

可以使用navigator来检测浏览器中是否安装了特定的插件

==对于非IE浏览器，可以使用plugins数组来达到这个目的==

```markdown
- plugins数组每一项包含下列属性
	- name: 插件的名字
	- description：插件的描述
	- filename: 插件的文件名
	- length: 插件所处理的MIME类型的数量
```

```javascript
// 非IE浏览器检测插件
function hasPlugin (name) {
    name = name.toLowerCase() // 转换为小写
    for (let i =0; i<navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true
        }
    }
    return false
}
console.log(hasPlugin("Flash"));
```

```markdown
- IE浏览器检测插件
	- 由于IE浏览器不支持Netscape式插件，在IE中检测插件的唯一方式就是使用专有的ActiveXObject类型，并尝试创建一个特定插件实例。
	- IE是以COM对象的方式实现插件的，而COM对象使用唯一标识来标识。因此，想要检测特定的插件，就必须知道其COM标识

- 例如：Flash的标识符是ShockwaveFlash.ShockwaveFlash
function hasIEPlugin(name) {
	try {
		new ActiveXObject(name)
		return true
	} catch (e) {
		return false
	}
}
console.log(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"))
```

## screen对象

```markdown
- screen对象包含有关客户端显示屏幕的信息
	1. availHeight： 返回显示屏幕的高度 (除 Windows 任务栏之外)
	2. availWidth：返回显示屏幕的宽度 (除 Windows 任务栏之外)
	3. deviceXDPI： 返回显示屏幕的每英寸水平点数。
	4. deviceYDPI： 返回显示屏幕的每英寸垂直点数
	5. pixelDepth： 返回显示屏幕的颜色分辨率（比特每像素）
	6. updateInterval： 设置或返回屏幕的刷新率
	7. ....
以上属性不同浏览器的支持性不同
```

## history对象

```markdown
1. history对象保存着用户上网的历史记录，从网页被打开的那一刻算起
2. history是window对象的属性
3. 常用方法
	- go()
		+ history.go(-1): 后退一页
		+ history.go(0): 刷新页面
		+ history.go(1): 前进一页
	- back()：后退一页
		+ history.back()相当于history.go(-1)
	- forward()：前进一页
		+ history.go(1)相当于history.go(1)
	- length属性：历史记录的数量
		+ 对于加载到窗口、标签页或者框架中的第一个页面而言：history.length 等于0
```



