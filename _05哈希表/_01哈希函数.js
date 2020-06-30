//哈希函数
//1>将字符串转成比较大的数字：hashCode
//2>将大的数字hashCode压缩到数组范围之内
function hashFunc(str, size) {
  //定义hashCode变量
  var hashCode = 0
  //霍纳算法，计算hashCode的值
  for (let i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }

  //取余操作
  return hashCode % size
}

console.log(hashFunc('abc',7))