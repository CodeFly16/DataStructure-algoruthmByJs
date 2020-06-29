//封装队列
function Queue() {
  //属性
  this.items = []
  //入队
  Queue.prototype.enqueue = function (element) {
    this.items.push(element)
  }
  //出队
  Queue.prototype.dequeue = function () {
    return this.items.shift()
  }
  //查看队列第一个元素
  Queue.prototype.front = function () {
    return this.items[0]
  }
  //判断队列是否为空
  Queue.prototype.isEmpty = function () {
    return this.items.length === 0
  }
  //查看队列的个数
  Queue.prototype.size = function () {
    return this.items.length
  }
  //toString方法
  Queue.prototype.toString = function () {
    var resultString = ''
    for (var i = 0; i < this.items.length; i++) {
      resultString += this.items[i] + ' '
    }
    return resultString
  }
}

/*
var queue = new Queue()
queue.enqueue('abc')
queue.enqueue('cba')
queue.enqueue('nba')
console.log(queue.toString())
queue.dequeue()
console.log(queue.toString())
console.log(queue.front())
console.log(queue.size())
console.log(queue.isEmpty())*/

//击鼓传花案例
function passGame(nameList, num) {

  var quene = new Queue()

  //将所有人加入队列
  nameList.forEach(item => {
    quene.enqueue(item)
  })
  while (quene.size() >1) {
    //开始数数字，数到num的人直接出队，没数到num的人 出队在入队
    for (let i = 0; i < num - 1; i++) {
      quene.enqueue(quene.dequeue())
    }
    quene.dequeue()
  }
  return quene.front()
}

console.log(passGame(['a', 'b', 'c', 'd', 'e', 'f'], 3));




