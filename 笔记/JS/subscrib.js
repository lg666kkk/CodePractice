let _Subscribe = (function () {
  // 发布订阅的类
  class Subscribe {
    constructor() {
      // 创建一个事件池，用来存储后期需要执行的方法
      this.pond = [];
    }
    // 向事件池中追加方法(去重)
    add (func) {
      let flag = this.pond.some(item => {
        return item === func;
      })
      !flag ? this.pond.push(func) : null
    }
    // 从事件池中移除方法
    remove (func) {
      let _pond = this.pond
      let len = _pond.length
      for (let i=0; i<len; i++) {
        let item = _pond[i]
        if (item === func) {
          // 不能使用splice移除，会导致数组塌陷，我们移除不能真移除，只能把当前项赋值为null
          // _pond.splice(i, 1)
          _pond[i] = null
          break;
        }
      }
    }
    // 通知事件池中的方法按照顺序依次执行
    fire (...args) {
      let _pond = this.pond
      let len = _pond.lenth
      for (let i=0; i<len; i++) {
        let item = _pond[i];
        if (typeof item !== 'function') {
          // 此时再删除
          _pond.splice(i, 1)
          i--
          continue
        }
        item.call(this, ...args)
      }
    }
  }

  return function () {
    return new Subscribe()
  }
}) ();

