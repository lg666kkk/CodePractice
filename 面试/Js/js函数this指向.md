# JS函数this指向

**JS函数在执行时，会在函数体内部自动生成一个this指针。谁直接调用产生这个this指针的函数，this就指向谁**

情况不同，this指向的对象也不同！！！

## 函数声明的情况

```javascript
var bj=10;
function add(){
    var bj=20;
    console.log(this);//window
    console.log(this.bj);//10
    console.log(bj);//20
    console.log(this.bj+bj);//30
}
add();
window.add();
```

- 执行了add()之后，此时的this指向的是window对象，为什么呢？因为这时候add是全局函数，是通过window**直接调用**的。所以下面我专门写了个window.add()就是为了说明，全局函数的this都是指向的window。

-  就像alert()自带的警告弹窗一样,window.alert()执行之后也是一样的效果。所以只要是   window点   这种调用方式都可以省略掉，因此警告弹窗可以直接使用alert()。

## 函数表达式

```javascript
var bj=10;
var zjj=function(){
    var bj=30;
    console.log(this);//window
    console.log(this.bj);//10
    console.log(bj);//30
    console.log(this.bj+bj);//40
}
console.log(typeof zjj);//function
zjj();
window.zjj();
```

- 执行了zjj()之后，函数中的this也是指向window对象。原因和第一个是一样的，都是通过window这个对象**直接调用**。

## 函数作为对象属性去调用

### 示例1

```javascript
var bj=10;
var obj={
    name:"八戒",
    age:"500",
    say:function(){
        var bj=40;
        console.log(this);//就是obj这个对象
        console.log(this.bj);//undefined
        console.log(this.name);//八戒
    }
}
obj.say();
window.obj.say();
```

- 当obj.say()被执行的时候，此时的this指向的是 obj 这个对象，为什么呢？因为say函数是通过obj这个对象**直接调用**的。

-  那有人可能会问了，obj对象实际上也是通过window对象调用的，为什么this不指向window呢？我认为是因为say这个函数是通过 **obj** 对象**直接调用**的，而没有通过 window 对象**直接调用**，因此this不会指向window

[this指向问题详见这篇博客](https://www.cnblogs.com/zjjDaily/p/9482958.html)

