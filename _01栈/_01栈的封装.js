//封装栈类
function Stack() {

  this.items = []
  //栈的相关操作
  //压栈
  Stack.prototype.push = function (element) {
    return this.items.push(element)
  }
  //弹栈
  Stack.prototype.pop = function () {
    return this.items.pop()
  }
  //查看栈顶元素
  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1]
  }
  //判断栈是否为空
  Stack.prototype.isEmpty = function () {
    return this.items.length === 0
  }
  //获取栈中元素的个数
  Stack.prototype.size = function () {
    return this.items.length
  }
  //toString方法
  Stack.prototype.toString = function () {
    var resultString = ''
    for (var i = 0; i < this.items.length; i++) {
      resultString += this.items[i] + ' '
    }
    return resultString
  }
}

/*var s = new Stack()
s.push(20)
s.push(25)
s.push(33)
s.push(121)
s.push(56)
console.log(s.size())
console.log(s.peek())
console.log(s.toString())
console.log(s.isEmpty())*/

//将十进制转为二进制
function dec2bin(decNumber) {

  //定义栈
  var stack = new Stack()

  //循环获取二进制数
  while (decNumber > 0) {
    //取余数
    stack.push(decNumber % 2)
    decNumber = Math.floor(decNumber / 2)
  }

  //取出二进制数
  var binaryString = ''
  while(!stack.isEmpty()){
    binaryString += stack.pop()
  }
  return binaryString
}
/*
console.log(dec2bin(10))
console.log(dec2bin(100))
console.log(dec2bin(1000))
*/
