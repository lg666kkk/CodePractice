/**
 * node中模块有三种：
 *  具名的核心模块，如fs,http等
 *  用户自己编写的文件模块
 *     相对路径必须加./
 */
/**
 * node中没有全局作用域，只有模块作用域
 *  外部访问不到内部
 *  内部也访问不到外部
 */
let foo = 'daaa'
console.log('开始执行a');
// require方法用于加载模块
require('./b.js')
console.log('a执行完毕');
console.log(foo);