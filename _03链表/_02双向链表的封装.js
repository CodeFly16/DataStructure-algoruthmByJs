function DoublyLinkedList() {
  //节点内部类
  function Node(data) {
    this.data = data
    this.prev = null
    this.next = null
  }

  //链表属性
  this.head = null
  this.tail = null
  this.length = 0

  //常见操作
  //append方法
  DoublyLinkedList.prototype.append = function (data) {
    //1.根据data创建节点
    var newNode = new Node(data)

    //2.判断添加的是否是第一个节点
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }

    //3.length+1
    this.length += 1
  }

  //toString方法
  DoublyLinkedList.prototype.toString = function () {
    return this.backWardString()
  }

  //forwardString方法，向前遍历
  DoublyLinkedList.prototype.forwardString = function () {
    //定义变量
    var current = this.tail
    var resultString = ""
    //遍历，获取每一个节点
    while (current) {
      resultString += current.data + " "
      current = current.prev
    }
    return resultString
  }

  //backWardString方法，向后遍历
  DoublyLinkedList.prototype.backWardString = function () {
    //定义变量
    var current = this.head
    var resultString = ""
    //遍历，获取每一个节点
    while (current) {
      resultString += current.data + " "
      current = current.next
    }
    return resultString
  }

  //insert方法，主要是多种情况
  DoublyLinkedList.prototype.insert = function (position, data) {
    //越界判断
    if (position < 0 || position > this.length) return false
    var newNode = new Node(data)
    //插入的是第一个节点
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      //插入在第一个
      if (position === 0) {
        this.head.prev = newNode
        newNode.next = this.head
        this.head = newNode
      } else if (position === this.length) {//插入到最后一个
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
      } else {
        var current = this.head
        var index = 0
        //遍历查找插入位置的节点
        while (index++ < position) current = current.next
        //修改指针
        newNode.prev = current.prev
        current.prev.next = newNode
        newNode.next = current
        current.prev = newNode
      }
    }
    this.length += 1
    return true
  }

  //get方法
  DoublyLinkedList.prototype.get = function (position) {
    //越界判断
    if (position < 0 || position >= this.length) return false
    //获取元素,两种方式，通过位置进行选择
    var current = null
    var index = 0
    if (position > this.length / 2) {
      current = this.tail
      index = this.length - 1
      while (index-- > position) current = current.prev
    } else {
      current = this.head
      index = 0
      while (index++ < position) current = current.next
    }
    return current.data
  }

  //indexOf方法
  DoublyLinkedList.prototype.indexOf = function (data) {
    var current = this.head
    var index = 0
    while (current) {
      if (current.data === data) {
        return index
      }
      current = current.next
      index += 1
    }
    return -1
  }

  //update方法
  DoublyLinkedList.prototype.update = function (position, data) {
    //越界判断
    if (position < 0 || position >= this.length) return false
    //获取元素,两种方式，通过位置进行选择
    var current = null
    var index = 0
    if (position > this.length / 2) {
      current = this.tail
      index = this.length - 1
      while (index-- > position) current = current.prev
    } else {
      current = this.head
      index = 0
      while (index++ < position) current = current.next
    }
    current.data = data
  }
}

//测试代码
var list = new DoublyLinkedList()
list.append('abc')
list.append('cba')
list.append('nba')

list.insert(0, '123')
list.insert(4, '456')
list.insert(1, '789')
list.update(1,'111')
console.log(list.get(1))
console.log(list.get(4))
console.log(list.indexOf('111'))
console.log(list.backWardString());
console.log(list.toString());
console.log(list.forwardString());

