function Queue () {
  this.items = []
  // 向队列尾部添加一个或多个元素
  Queue.prototype.enqueue = function (element) {
    this.items.push(element)
  }
  // 移除队列的第一项，返回被移除的元素
  Queue.prototype.dequeue = function () {
    return this.items.shift()
  }
  // 返回队列中的第一个元素，不改变队列结构
  Queue.prototype.front = function () {
    return this.items[0]
  }
  //isEmpty方法
  Queue.prototype.isEmpty = function () {
    return this.items.length === 0
  }
  // size方法
  Queue.prototype.size = function () {
    return this.items.length
  }
  // toString方法
  Queue.prototype.toString = function () {
    let resultString = ''
    for (let i=0; i<this.items.length; i++) {
      resultString += this.items[i] + ' '
    }
    return resultString
  }
}
