//封装集合类
function Set() {
  //属性
  this.items = {}

  //方法
  //add方法
  Set.prototype.add = function (value) {
    if (this.has(value)) return false
    this.items[value] = value
    return true
  }

  //has方法
  Set.prototype.has = function (value) {
    return this.items.hasOwnProperty(value)
  }

  //remove方法
  Set.prototype.remove = function (value) {
    if (!this.has(value)) return false
    delete this.items[value]
    return true
  }

  //clear方法
  Set.prototype.clear = function () {
    this.items = {}
  }

  //size方法
  Set.prototype.size = function (value) {
    return Object.keys(this.items).length
  }

  //values方法
  Set.prototype.values = function (value) {
    return Object.keys(this.items)
  }

  //集合间的操作
  //并集
  Set.prototype.union = function (otherSet) {
    //创建新集合
    var unionSet = new Set()

    //将A集合所有元素加入到新集合中
    var values = this.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }
    //将B集合所有元素加入到新集合中
    values = otherSet.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }
    return unionSet
  }

  //交集
  Set.prototype.intersection = function (otherSet) {
    //创建新的集合
    var intersection = new Set()
    for (let i = 0; i < this.values().length; i++)
      if (otherSet.has(this.values()[i])) intersection.add(this.values()[i])
    return intersection
  }

  //差集
  Set.prototype.difference = function (otherSet) {
    //创建新的集合
    var differenceSet = new Set()
    for (let i = 0; i < this.values().length; i++)
      if (!otherSet.has(this.values()[i])) differenceSet.add(this.values()[i])
    return differenceSet
  }

  //子集
  Set.prototype.subset = function (otherSet) {
    for (let i = 0; i < this.values().length; i++)
      if (!otherSet.has(this.values()[i])) return false
    return true
  }
}

var set = new Set()
set.add('a')
console.log('add', set.add('a'))
set.add('b')
set.add('c')
set.add('d')
set.remove('a')
console.log('remove', set.remove('a'))
console.log('has', set.has('a'))
console.log('has', set.has('b'))
console.log('size', set.size())
console.log('values', set.values())

var setA = new Set()
setA.add('a')
setA.add('b')
setA.add('c')

var setB = new Set()
setB.add('d')
setB.add('e')
setB.add('f')
setB.add('a')
setB.add('b')
console.log('setA',setA.values())
console.log('setB',setB.values())
console.log('并集--', setA.union(setB).values())
console.log('交集--', setA.intersection(setB).values())
console.log('差集--', setA.difference(setB).values())
console.log('子集--', setA.subset(setB))
