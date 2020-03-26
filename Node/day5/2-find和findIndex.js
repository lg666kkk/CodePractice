// ES6对数组新增了很多方法
/***
 * find接受一个方法作为参数，方法内部返回一个条件
 * 符合该条件的元素会作为find方法返回值
 * 如果遍历结束，还没有符合该条件的元素，则返回undefined
 */
var user = [
  {"id": 1, "name": '张三'},
  {"id": 2, "name": 'ww'},
  {"id": 3, "name": 'ww'},
  {"id": 4, "name": 'ww'}
]

Array.prototype.myfind = function (conditionFunc) {
  for (let i=0; i<this.length; i++) {
    if (conditionFunc(this[i], i)) {
      return this[i]
    }
  }
}
var ret = user.myfind(function (item, index) {
  return item.id === 2
})
console.log(ret);