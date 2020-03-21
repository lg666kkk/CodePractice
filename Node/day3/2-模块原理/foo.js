/**
 * 在Node中，每个模块内部都有一个自己的module对象
 * 该module对象中，有一个成员叫exports,也是一个对象
 * 也就是说如果你需要对外带出成员，只需要把导出的成员挂载到 module.exports中
 * 每次导出接口成员是都使用module.exports.xxxx = xxx的方式很麻烦
 * 所以Node为了简化操作，提供了一个变量，exports 等于 moudle.exports
 */
// var module = {
//   exports: {
//      foo: 'bar'
//   }
// }
// 相当于 exports.foo = 'bar'
// module.exports.foo = 'bar'
// module.exports.add = function (x, y) {
//     return x+y
// }
// exports和module.exports两者一致
console.log(exports === module.exports); // true
exports.foo = 'bar'
module.exports.add = function (x, y) {
    return x+y
}


// 也就是说，在模块中还有这样一句代码 var exports = module.exports
// 一定要记住，最后return的是 module.exports,所以exports = xxx 返回一个空对象
/**
 * module.exports = 'hello'
 * exports.foo = 'bar' 
 * 带啊吗最终结果是hello
 */