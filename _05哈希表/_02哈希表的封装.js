//哈希表的封装
function HashTable() {
  //属性
  this.storage = []
  this.count = 0
  this.limit = 7

  //方法
  //哈希函数
  HashTable.prototype.hashFunc = function (str, size) {
    //定义hashCode变量
    var hashCode = 0
    //霍纳算法，计算hashCode的值
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i)
    }

    //取余操作
    return hashCode % size
  }

  //插入&修改
  HashTable.prototype.put = function (key, value) {
    //根据key获取对应的index
    var index = this.hashFunc(key, this.limit)

    //根据index取得对应的bucket
    var bucket = this.storage[index]

    //判断该bucket是否为undefined
    if (bucket === undefined) {
      bucket = []
      this.storage[index] = bucket
    }

    //判断是否是修改数据
    for (let i = 0; i < bucket.length; i++) {
      var tuple = bucket[i]
      if (tuple[0] === key) {
        tuple[1] = value
        return
      }
    }
    //添加操作
    bucket.push([key, value])
    this.count += 1
    //扩容
    if (this.count > this.limit * 0.75) {
      var newSize = this.limit * 2
      this.resize(this.getPrime(newSize))
    }
  }

  //获取操作
  HashTable.prototype.get = function (key) {
    //根据key获取对应的index
    var index = this.hashFunc(key, this.limit)
    //根据index取得对应的bucket
    var bucket = this.storage[index]
    //判断该bucket是否为undefined
    if (bucket === undefined) return null
    for (let i = 0; i < bucket.length; i++) {
      var tuple = bucket[i]
      if (tuple[0] === key) {
        return tuple[1]
      }
    }
    //依然没有找到
    return null
  }

  //删除操作
  HashTable.prototype.delete = function (key) {
//根据key获取对应的index
    var index = this.hashFunc(key, this.limit)
    //根据index取得对应的bucket
    var bucket = this.storage[index]
    //判断该bucket是否为undefined
    if (bucket === undefined) return null
    for (let i = 0; i < bucket.length; i++) {
      var tuple = bucket[i]
      if (tuple[0] === key) {
        bucket.splice(i, 1)
        this.count--
        //减容
        if (this.count < this.limit * 0.25) {
          var newSize = Math.floor(this.limit / 2)
          this.resize(this.getPrime(newSize))
        }
        return tuple[1]
      }

    }
    //依然没有找到
    return null
  }

  //其他方法
  //isEmpty
  HashTable.prototype.isEmpty = function () {
    return this.count === 0
  }

  //size
  HashTable.prototype.size = function () {
    return this.count
  }

  //resize,哈希表的扩容
  HashTable.prototype.resize = function (newLimit) {
    //保存旧的数组内容
    var oldStorage = this.storage

    //重置所有属性
    this.storage = []
    this.count = 0
    this.limit = newLimit

    //遍历oldStorage中的所有bucket
    for (let i = 0; i < oldStorage.length; i++) {
      //取出对应的bucket
      var bucket = oldStorage[i]

      //判断bucket是否为undefined
      if (bucket === undefined) continue

      for (let j = 0; j < bucket.length; j++) {
        var tuple = bucket[j]
        this.put(tuple[0], tuple[1])
      }
    }
  }

  //判断是否为质数
  HashTable.prototype.isPrime = function (num) {
    //获取num的平方根
    var temp = parseInt(Math.sqrt(num))

    //循环判断
    for (var i = 2; i <= temp; i++)
      if (num % i === 0) return false
    return true

  }

  //获取质数的方法
  HashTable.prototype.getPrime = function (num) {
    while (!this.isPrime(num)) num++
    return num
  }



}

var hash = new HashTable()
hash.put('a', '1')
hash.put('b', '2')
hash.put('c', '3')
hash.put('d', '4')
console.log('get', hash.get('a'));
hash.delete('a')
console.log('get', hash.get('a'));
console.log('get', hash.get('b'));