var foo ='bar'
function add (x, y) {
  return x+y
}
/**
 * 如果一个模块需要直接导出某个成员而非挂载的方式
 * 那必须使用module.exports的方式
 */
module.exports = add // exports就是add函数
/**
 * exports.add = add用于挂在某个成员
 */
// exports.add = add
// exports.foo = foo
// exports.str = 'ddd'
/**
 * exports是一个对象
 * 可以通过多次为这个对象添加成员实现导出多个内部成员
 */