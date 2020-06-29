//封装链表类
function LinkedList() {

  //内部类，节点类
  function Node(data) {
    this.data = data
    this.next = null
  }

  //属性
  this.head = null
  this.length = 0

  //追加
  LinkedList.prototype.append = function (data) {

    var newData = new Node(data)

    if (this.length === 0) {
      this.head = newData
    } else {
      var current = this.head
      //遍历到最后一个节点
      while (current.next) {
        current = current.next
      }
      //最后一个节点添加newData
      current.next = newData
    }
    //长度加1
    this.length += 1
  }
  //toString方法
  LinkedList.prototype.toString = function () {
    var current = this.head
    var listString = ""

    while (current) {
      listString += current.data + " "
      current = current.next
    }
    return listString
  }
  //插入
  LinkedList.prototype.insert = function (position, data) {
    var newNode = new Node(data)
    //纠错判断
    if (position < 0 || position > this.length) return false
    //当插入到第一个位置时
    if (position === 0) {
      newNode.next = this.head
      this.head = newNode
    }
    var current = this.head
    var index = 1
    while (current) {
      if (position === index) {
        let temp = current.next
        current.next = newNode
        newNode.next = temp
        break
      }
      current = current.next
      index += 1
    }
    this.length += 1
  }
  //获取数据
  LinkedList.prototype.get = function (position) {
    //越界判断
    if (position < 0 || position >= this.length) return null
    var current = this.head
    //判断
    for (var i = 0; i < position; i++) {
      current = current.next
    }
    return current.data

  }
  //获取索引
  LinkedList.prototype.indexOf = function (element) {
    //越界判断
    if (element === this.head.data) return 0
    var current = this.head
    var index = 0
    while (element !== current.data) {
      current = current.next
      index += 1
    }
    return index
  }
  //修改某个位置的元素
  LinkedList.prototype.update = function (position, element) {
    //越界判断
    if (position < 0 || position >= this.length) return null
    var current = this.head
    var index = 0
    while (index !== position) {
      current = current.next
      index += 1
    }
    current.data = element
    return true
  }
  //依据索引移除某一项
  LinkedList.prototype.removeAt = function (position) {
    //越界判断
    if (position < 0 || position >= this.length) return null
    if (position === 0) {
      this.head = this.head.next
    }else{
      //注意需要使用previous存储前一个node
      var current = this.head
      var previous = null
      var index = 0
      while (index++ < position) {
        previous = current
        current = current.next
        if (!current.next) return null
      }
      previous.next = current.next
    }
    this.length--
    return true
  }
  //依据移除某一项
  LinkedList.prototype.remove = function (element) {
    var position = this.indexOf(element)
    return this.removeAt(position)
  }
  //判断是否为空
  LinkedList.prototype.isEmpty = function () {
    if (this.length === 0) {
      return true
    }
    return false
  }
  //判断元素个数
  LinkedList.prototype.size = function () {
    return this.length
  }
}

var linkedList = new LinkedList()
linkedList.append('a')
linkedList.append('b')
linkedList.append('c')
linkedList.append('d')
linkedList.append('e')
linkedList.append('f')
linkedList.append('g')
linkedList.insert(7, 'h')
console.log('get', linkedList.get(7))
console.log('indexOf', linkedList.indexOf('a'))
console.log('update', linkedList.update(7, 'b'))
console.log('removeAt', linkedList.removeAt(0))
console.log('remove', linkedList.remove('b'))
console.log('isEmpty', linkedList.isEmpty())
console.log('size', linkedList.size())
console.log(linkedList.toString());
