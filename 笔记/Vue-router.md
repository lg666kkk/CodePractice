## Vue-router是什么？

路由就是用来跟后端服务器进行交互的一种方式，通过不同的路径，来请求不同的资源，请求不同的页面是路由的其中一种功能，vue-router是vue.js官方路由管理器。vue的单页应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。（传统页面切换是用超链接a标签进行切换）

**前端路由核心：改变视图的时候不会向后端发起请求**

### 路由的两种模式

#### hash模式

​	**ue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。** hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说**hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面**；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说**Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件**

#### history模式

​	由于hash模式会在url中自带#，如果不想要很丑的 hash，我们可以用路由的 history 模式，只需要在配置路由规则时，加入"mode: 'history'",**这种模式充分利用了html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求**

##### history模式刷新404问题：

​	用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。

​	但因为没有 # 号，当用户刷新页面时，浏览器还是会给服务器发送请求。

​	解决方法：需要服务器的支持，如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，那么刷新会跳首页。

### 路由相关组件

#### \<router-link   to="" \>

`<router-link>` 组件支持用户在具有路由功能的应用中 (点击) 导航。 通过 `to` 属性指定目标地址，默认渲染成带有正确链接的 `<a>` 标签，可以通过配置 `tag` 属性生成别的标签.。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。

##### 相关参数

- to 

  - 表示目标路由的链接。当被点击后，内部会立刻把 `to` 的值传到 `router.push()`，所以这个值可以是一个字符串或者是描述目标位置的对象

  - 类型: 字符串/路径

  - ```javascript
    <!-- 字符串 -->
    <router-link to="home">Home</router-link>
    <!-- 渲染结果 -->
    <a href="home">Home</a>
    
    <!-- 使用 v-bind 的 JS 表达式 -->
    <router-link v-bind:to="'home'">Home</router-link>
    
    <!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
    <router-link :to="'home'">Home</router-link>
    
    <!-- 同上 -->
    <router-link :to="{ path: 'home' }">Home</router-link>
    
    <!-- 命名的路由 -->
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    
    <!-- 带查询参数，下面的结果为 /register?plan=private -->
    <router-link :to="{ path: 'register', query: { plan: 'private' }}"
      >Register</router-link
    >
    ```

- replace

  - 设置 `replace` 属性的话，当点击时，会调用 `router.replace()` 而不是 `router.push()`，于是导航后不会留下 history 记录
  - 类型：Boolean

- append

  - 设置 `append` 属性后，则在当前 (相对) 路径前添加基路径。例如，我们从 `/a` 导航到一个相对路径 `b`，如果没有配置 `append`，则路径为 `/b`，如果配了，则为 `/a/b`

  - ```javascript
    <router-link :to="{ path: 'relative/path'}" append></router-link>
    ```

- tag

  - 默认值为"a"标签

  - 有时候想要 `<router-link>` 渲染成某种标签，例如 `<li>`。 于是我们使用 `tag` prop 类指定何种标签，同样它还是会监听点击，触发导航

  - ```javas
    <router-link to="/foo" tag="li">foo</router-link>
    <!-- 渲染结果 -->
    <li>foo</li>
    ```

    

- active-class

  - 设置链接激活时使用的 CSS 类名

#### \<router-view\>

- 渲染路由的容器
- 显示的是当前路由地址所对应的内容
- 路由嵌套: https://zhuanlan.zhihu.com/p/95074683

#### ==\<keep-alive\>==

- 缓存组件
- 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM
- ==源码。。==

### Vue-router传参

**==主要有两种方式:params和query==**

#### query 方式传参和接收参数

传参是this.\$router,接收参数是this.​\$route 两者区别：

\$router为VueRouter实例，想要导航到不同URL，则使用$router.push方法

\$route为当前router跳转对象，里面可以获取name、path、query、params等

#### params方式传参和接收参数

**params传参，push里面只能是 name:'xxxx',不能是path:'/xxx',因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined**

**二者还有点区别，可以理解为：query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而params相当于post请求，参数不会再地址栏中显示**

### 响应路由参数的变化(以下内容来自官方文档)

使用路由参数时，例如从 `/user/id=1 `导航到 `/user/id=2`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

**复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象**

![](E:\Typra文档\img\Snipaste_2020-11-28_22-08-42.PNG)

### 动态路由的定义

#### Params

- 配置路由格式:/router/:id
- 传递的方式:在path后面跟上对应的值
-  传递后形成的路径:/router/123

**可以在url中，通过定义参数，那么以后url中就可以动态的传递这些参数。语法：`/user/:参数名`**

```javascript
// 方法1：
<router-link :to="{ name: 'users', params: { uname: wade }}">按钮</router-link>
// 方法2：
this.$router.push({name:'users',params:{uname:wade}})
// 方法3：
this.$router.push('/user/' + wade)
```

**在组件中，可以通过`this.$route.params.参数名`拿到；在组件的模板中可以通过`$route.params.参数名`拿到**

#### Query

- 配置路由格式:/router,也就是普通配置
-   传递的方式:对象中使用query的key作为传递方式
-   传递后形成的路径:/route?id=123