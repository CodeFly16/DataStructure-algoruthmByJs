//创建列表类
function ArrayList() {
  //属性
  this.array = []

  //方法
  ArrayList.prototype.insert = function (item) {
    this.array.push(item)
  }

  //toString
  ArrayList.prototype.toString = function () {
    return this.array.join('-')
  }

  //交换两个位置的数据
  ArrayList.prototype.swap = function (m, n) {
    var temp = this.array[m]
    this.array[m] = this.array[n]
    this.array[n] = temp
  }

  //冒泡排序
  ArrayList.prototype.bubbleSort = function () {
    var length = this.array.length
    for (let i = 0; i < length - 1; i++)
      for (let j = i + 1; j < length; j++)
        if (this.array[i] > this.array[j]) this.swap(i, j)
  }

  //选择排序
  ArrayList.prototype.selectSort = function () {
    var length = this.array.length
    for (let i = 0; i < length - 1; i++) {
      var min = i
      for (let j = i + 1; j < length; j++)
        if (this.array[j] < this.array[min]) min = j
      this.swap(i, min)
    }
  }

  //插入排序
  ArrayList.prototype.insertSort = function () {
    var length = this.array.length
    for (let i = 1; i < length; i++) {
      var temp = this.array[i]
      var j = i
      while (this.array[j - 1] > temp && j > 0) {
        this.array[j] = this.array[j - 1]
        j--
      }
      this.array[j] = temp
    }
  }

  //希尔排序
  ArrayList.prototype.shellSort = function () {
    var length = this.array.length

    //初始化增量(间隔)
    var gap = Math.floor(length / 2)

    //while循环(gap不断减小)
    while (gap >= 1) {
      //以gap为间隔，进行分组，对分组进行插入排序
      for (var i = gap; i < length; i++) {
        var temp = this.array[i]
        var j = i
        while (this.array[j - gap] > temp && j > gap - 1) {
          this.array[j] = this.array[j - gap]
          j -= gap
        }
        //将j位置的元素赋值给temp
        this.array[j] = temp
      }
      gap = Math.floor(gap / 2)
    }
  }

  //快速排序
  //选择枢纽
  ArrayList.prototype.median = function (left, right) {
    var center = Math.floor((left + right) / 2)

    if (this.array[left] > this.array[center])
      this.swap(left, center)
    if (this.array[center] > this.array[left])
      this.swap(center, left)
    if (this.array[left] > this.array[right])
      this.swap(left, right)
    this.swap(center, right - 1)
    return this.array[right - 1]
  }
  //排序
  ArrayList.prototype.quickSort = function () {
    this.quick(0, this.array.length - 1)
  }
  //排序递归
  ArrayList.prototype.quick = function (left, right) {
    //结束条件
    if (left >= right) return

    //获取枢纽
    var pivot = this.median(left, right)

    //定义变量，用于记录当前的位置
    var i = left
    var j = right - 1
    while (true) {
      while (this.array[++i] < pivot) {
      }
      while (this.array[--j] > pivot) {
      }
      if (i < j) {
        this.swap(i, j)
      } else {
        break
      }
    }
    //将枢纽放置在正确位置
    this.swap(i, right - 1)

    //分而治之
    this.quick(left, i - 1)
    this.quick(i + 1, right)
  }
}


var list1 = new ArrayList()
list1.insert(66)
list1.insert(88)
list1.insert(6)
list1.insert(101)
list1.insert(36)
list1.insert(86)
list1.bubbleSort()
console.log('冒泡排序', list1.toString())

var list2 = new ArrayList()
list2.insert(66)
list2.insert(88)
list2.insert(6)
list2.insert(101)
list2.insert(36)
list2.insert(86)
list2.selectSort()
console.log('选择排序', list2.toString())

var list3 = new ArrayList()
list3.insert(66)
list3.insert(88)
list3.insert(6)
list3.insert(101)
list3.insert(36)
list3.insert(86)
list3.insertSort()
console.log('插入排序', list3.toString())

var list4 = new ArrayList()
list4.insert(66)
list4.insert(88)
list4.insert(6)
list4.insert(101)
list4.insert(36)
list4.insert(86)
list4.shellSort()
console.log('希尔排序', list4.toString())

var list5 = new ArrayList()
list5.insert(66)
list5.insert(88)
list5.insert(6)
list5.insert(101)
list5.insert(36)
list5.insert(86)
list5.shellSort()
console.log('快速排序', list5.toString())