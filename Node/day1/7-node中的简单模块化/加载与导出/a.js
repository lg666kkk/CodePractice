/**
 * 每个文件模块默认提供了一个对象：exports
 * exports默认是一个空对象
 */
let ret = require('./b')
console.log(ret.foo);
console.log(ret.add(10, 20));
