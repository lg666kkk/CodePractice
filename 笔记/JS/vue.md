# vue

## vue-cli3.0

- vue2.0向3.0过度过程中的改变？
- 配置
- 优化

## vue基础知识

- 双向数据绑定 
- template模板渲染语法和原理（vue-loader 、 虚拟DOM）
- 指令和==自定义指令==
- methods/computed/watch/filters
- class / style
- 条件和循环渲染 
- 事件处理
- 表单处理
- 组件（属性）
- ref
- 生命周期
- 插槽
- transition
- 渲染函数和jsx
- 插件编写
- 混入
- devtools
- 组件通信
- 。。。

## vue-router

- 基础知识
- 动态路由
- 编程式导航
- 命名路由和命名容器
- 导航守卫
- HASH和BROWSER路由
- 路由原理
- ....

## vuex

- state
- getter
- mutation
- action
- module
- mapXxx
- 实现原理
- .....

## 单元测试

## SSR服务器渲染 nuxt.js

## UI组件库

## 面试题

### Vue2.0/3.0双向数据绑定的实现原理 -- 值改变后如何更新DOM？

现在项目都是2.0，3.0还没有实战(说明你关注实时动态)，大量使用vue做过项目之后，开始研究vue底层源码，发现原来双向绑定使用的是ES5中的Object.defineProperty实现数据拦截的,vue3.0使用proxy实现的

```javascript
// 2.0
/*
1. 对原始数据克隆
2. 需要分别给对象中的每一个属性设置监听
*/
<body>
    姓名：<span id="spanName"></span>
    <br>
    <input type="text" id="inpName">

    <!-- IMPORT JS -->
    <script>
        let obj = {
            name: ''
        };
        let newObj = {
            ...obj
        };
        Object.defineProperty(obj, 'name', {
            get() {
                return newObj.name;
            },
            set(val) {
                newObj.name = val;
                observe();
            }
        });

        function observe() {
            spanName.innerHTML = newObj.name;
        }
        inpName.oninput = function () {
            obj.name = this.value;
        };
    </script>
</body>
```

```javascript
// 3.0
<body>
    姓名：<span id="spanName"></span>
    <br>
    <input type="text" id="inpName">

    <!-- IMPORT JS -->
    <script>
        let obj = {
            name: ''
        };
        obj = new Proxy(obj, {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, value) {
                target[prop] = value;
                observe();
            }
        });

        function observe() {
            spanName.innerHTML = obj.name;
        }
        inpName.oninput = function () {
            obj.name = this.value;
        };
    </script>
</body>

```

### MVC和MVVM区别

