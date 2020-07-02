# 剑指Offer05 - 替换空格

## 题目描述

请实现一个函数，把字符串 `s` 中的每个空格替换成"%20"。

```markdown
输入：s = "We are happy."
输出："We%20are%20happy."
```

## 解题思路

### 正则表达式

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
  return s.replace(/\s/g, "%20")
};
```

### 双指针

![](E:\Typra文档\img\Snipaste_2020-07-02_08-30-32.PNG)

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    if (!s || !s.length) {
        return ""
    }
    let emptyStr = 0
    let charStr = 0
    let len = s.length
    for (let i=0; i<len; i++) {
        if (s[i] === " ") {
            ++emptyStr
        } else {
            ++charStr
        }
    }
    let newLen = emptyStr * 2 + charStr
    let newChar = new Array(newLen)
    for (let i=0, j=0; i<len; i++) {
        if (s[i] === " ") {
            newChar[j++] = "%"
            newChar[j++] = "2"
            newChar[j++] = "0"
        } else {
            newChar[j++] = s[i]
        }
    }

    return newChar.join("")
};
```

