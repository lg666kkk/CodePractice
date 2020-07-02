# 剑指Offer 04 -- 二维数组中查找

## 题目描述

```markdown
在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

现有矩阵 matrix 如下：
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
给定 target = 5，返回 true。
给定 target = 20，返回 false 
```

## 解法

### 解法一

数组扁平化后再使用ES6中的includes()方法查找

### 解法二

```javascript
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
   const rowNum = matrix.length;
    if (!rowNum) {
        return false;
    }
    const colNum = matrix[0].length;
    if (!colNum) {
        return false;
    }

    let row = 0,
        col = colNum - 1;
    while (row < rowNum && col >= 0) {
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] > target) {
            --col;
        } else {
            ++row;
        }
    }
    return false
};
```







