/**
 * node中模块有三种：
 *  1.具名的核心模块，如fs,http等
 *  2.用户自己编写的文件模块
 *     相对路径必须加./，否则报错
 *     可以省略后缀名
 *  3.第三方模块
 */
/**
 * 1. node中没有全局作用域，只有模块作用域
 *  外部访问不到内部
 *  内部也访问不到外部
 *2. 既然是模块作用域，那么如何让模块与模块之间通信？
 */
let foo = 'daaa'
console.log('开始执行a');
// require方法用于加载模块,还可以拿到被加载文件模块导出的接口对象
require('./b.js')
console.log('a执行完毕');
console.log(foo);
console.log(mm);