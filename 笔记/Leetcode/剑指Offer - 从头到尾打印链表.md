# 剑指Offer - 从头到尾打印链表

## 题目描述

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）

```markdown
输入：head = [1,3,2]
输出：[2,3,1]
```

## 解题思路

### 使用栈来实现

#### 使用JS定义栈结构

```javascript
<script type='text/javascript'>
// 封装栈类
function Stack () {
  // 栈中的属性
  this.items = []
  // 栈的相关操作
  // push方法 -- 添加一个元素到栈顶位置
  Stack.prototype.push = function (element) {
    this.items.push(element)
  }
  // pop方法 -- 移除栈顶元素，同时返回被移除元素
  Stack.prototype.pop = function () {
    return this.items.pop()
  }
  // peek方法：返回栈顶元素，不对栈做任何修改
  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1]
  }
  // isEmpty方法
  Stack.prototype.isEmpty = function () {
    return this.items.length === 0
  }
  // size():返回栈的元素个数
  Stack.prototype.size = function () {
    return this.items.length
  }
  // toString方法，将栈结构的内容以字符形式返回
  Stack.prototype.toString = function () {
    let resultString = ''
    for (let i=0; i<this.items.length; i++) {
      resultString += this.items[i] + ' '
    }
    return resultString
  }
}
</script>
```

#### 实现代码

```javascript
function Stack() {
    // 栈中的属性
    this.items = [];
    // 栈的相关操作
    // push方法 -- 添加一个元素到栈顶位置
    Stack.prototype.push = function (element) {
        this.items.push(element);
    };
    // pop方法 -- 移除栈顶元素，同时返回被移除元素
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    // size():返回栈的元素个数
    Stack.prototype.size = function () {
        return this.items.length
    }
}
var reversePrint = function (head) {
    let stack = new Stack()
    let arr = [];
    while(head) {
        stack.push(head.val)
        head = head.next
    }
    let len = stack.size()
    for (let i = 0; i < len; i++) {
        arr.push(stack.pop());
    }
    return arr;
};
// 时间复杂度 O(n) 空间复杂度 O(n)
```

### 解法二

1. 使用一个数组 result 保存结果
2. 使用 while 循环遍历链表
3. 每次循环将值使用 unshift 方法将节点值存到数组中，指向下一个节点

```javascript
var reversePrint = function(head) {
  const result = []
  
  while(head !== null) {
    result.unshift(head.val)
    head = head.next
  }
  
  return result
};
```

### 解法三

将链表的每个节点值放入数组，然后使用reverse()反转输出

```javascript
var reversePrint = function (head) {
  if (head === null) return []
  const res = []
  while (head) {
    res.push(head.val)
    head = head.next
  }
  return res.reverse()
}
```

### 递归反转链表

```javascript
// 反转链表的代码
function reverseLink(head) {
    if (head === null || head.next === null) return head
    const p = reverseLink(head.next)
    head.next.next = head // 指针反转
    head.next = null
    return p // 返回真正的表头
}
```







