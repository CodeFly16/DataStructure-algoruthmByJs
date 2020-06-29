//封装优先级队列
function PriorityQueue() {

  //重新创建个类，可以理解为内部类
  function QueueElement(element, priority) {
    this.element = element
    this.priority = priority
  }

  //封装属性
  this.items = []

  //入队
  PriorityQueue.prototype.enqueue = function (element, priority) {
    var queueElement = new QueueElement(element, priority)
    //如果是第一个队列的数，则无需判断优先级，直接入队
    if (this.items.length === 0) {
      this.items.push(queueElement)
    } else {
      //判断是否已经入队
      var added = false
      for (var i = 0; i < this.items.length; i++) {
        //判断优先级
        if (queueElement.priority < this.items[i].priority) {
          //符合优先级，插入数据
          this.items.splice(i, 0, queueElement)
          added = true
          break
        }
      }
      //如果优先级最小，则直接入队
      if (!added) {
        this.items.push(queueElement)
      }
    }
  }
  //出队
  PriorityQueue.prototype.dequeue = function () {
    return this.items.shift()
  }
  //查看队列第一个元素
  PriorityQueue.prototype.front = function () {
    return this.items[0].element
  }
  //判断队列是否为空
  PriorityQueue.prototype.isEmpty = function () {
    return this.items.length === 0
  }
  //查看队列的个数
  PriorityQueue.prototype.size = function () {
    return this.items.length
  }
  //toString方法
  PriorityQueue.prototype.toString = function () {
    var resultString = ''
    for (var i = 0; i < this.items.length; i++) {
      resultString += this.items[i].element + '-' + this.items[i].priority + ' '
    }
    return resultString
  }
}

var priorityQueue = new PriorityQueue()
priorityQueue.enqueue('ggg', 9)
priorityQueue.enqueue('aaa', 1)
priorityQueue.enqueue('bbb', 2)
priorityQueue.enqueue('ccc', 5)
priorityQueue.enqueue('ddd', 3)
priorityQueue.enqueue('eee', 1)
priorityQueue.enqueue('fff', 2)
console.log(priorityQueue.toString())

