/**
 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 示例 1：
 输入：[3,2,3]输出：3
 示例 2：
 输入：[2,2,1,1,1,2,2]输出：2
 进阶：
 - 尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
 */

/**
 * 普通方法
 * @type {number[]}
 */
let array = [2, 2, 1, 1, 1, 2, 2]

let arrayMap = {}

array.forEach(item => {
    if (arrayMap[item]) {
        arrayMap[item]++
    } else {
        arrayMap[item] = 1
    }
})
console.log(Object.entries(arrayMap).find(item => item[1] > array.length / 2)[0])

/**
 * 摩尔投票法
 */
let morArray = []
for (let i = 0; i < array.length; i++) {
    if (!morArray.length || !morArray[1]) {
        morArray = [array[i], 1]
        continue;
    }
    if (morArray[0] === array[i]) {
        morArray[1] = morArray[1] + 1
    } else {
        morArray[1] = morArray[1] - 1
    }
}

console.log(array.filter(item => item === morArray[0]).length > array.length / 2);
console.log(morArray)

