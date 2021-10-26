let array = [10, 23, 1, 54, 234, -14, 2, 456, 12, -34, -99, 102, 342, 123]

// //冒泡排序
// const bubbleSort = function (array) {
//     for (let i = 0; i < array.length; i++) {
//         let down = true
//         for (let j = 0; j < array.length - i; j++) {
//             if (array[j] > array[j + 1]) {
//                 [array[j], array[j + 1]] = [array[j + 1], array[j]]
//                 down = false
//             }
//         }
//         if (down) break
//     }
//     return array;
// }
// console.log(bubbleSort(array));

// //选择排序
// const selectionSort = function (array) {
//     for (let i = 0; i < array.length; i++) {
//         let min = array[i]
//         for (let j = i; j < array.length; j++) {
//             if (array[j] < min) {
//                 min = array[j];
//                 [array[j], array[i]] = [array[i], array[j]]
//             }
//         }
//     }
//     return array
// }
// console.log(selectionSort(array))

// //插入排序
// const insertSort = function (array) {
//     for (let i = 0; i < array.length; i++) {
//         for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
//             [array[j], array[j - 1]] = [array[j - 1], array[j]]
//         }
//     }
//     return array
// }
// console.log(insertSort(array))

//堆排序
// const buildMaxHeap = function (array) {
//     for (let i = Math.floor(array.length / 2); i >= 0; i--) {
//         heapify(array, i, array.length)
//     }
//     return array
// }
//
// const heapify = function (array, i, heapSize) {
//     let l = i * 2 + 1
//     let r = l + 1
//     let largestIndex = i
//     if (l < heapSize && array[l] > array[largestIndex]) largestIndex = l
//     if (r < heapSize && array[r] > array[largestIndex]) largestIndex = r
//     if (largestIndex !== i) {
//         [array[i], array[largestIndex]] = [array[largestIndex], array[i]]
//         heapify(array, largestIndex, heapSize)
//     }
// }
//
// const heapSort = function (array) {
//     buildMaxHeap(array)
//     for (let i = array.length - 1; i > 0; i--) {
//         [array[0], array[i]] = [array[i], array[0]]
//         heapify(array, 0, i)
//     }
//     return array
// }
//
// console.log(heapSort(array));

// //快速排序-递归-简单算法
// const sortArray = function(nums) {
//     if(!nums || nums.length < 2) return nums
//     let pivotIndex = Math.ceil(nums.length / 2),pivot = nums.splice(pivotIndex,1)
//     let left = [],right = []
//     for(let i = 0;i< nums.length;i++){
//         if(nums[i] > pivot) right.push(nums[i])
//         else left.push(nums[i])
//     }
//     return [...sortArray(left),pivot,...sortArray(right)]
// };
// console.log(quickSort1(array));
//快速排序-递归-双指针
// const quickSort2 = function (array, start = 0, end = array.length - 1) {
//     if (start >= end) return;
//     const middle = partition(array, start, end)
//     // 对左边区域快速排序
//     quickSort2(array, start, middle - 1);
//     // 对右边区域快速排序
//     quickSort2(array, middle + 1, end);
//     return array
// }
var partition = function (array, start, end) {
    // 取第一个数为基数
    let pivot = array[start]
    // 从第二个数开始分区
    let left = start + 1
    // 右边界
    let right = end
    while (left < right) {
        // 找到第一个大于基数的位置
        while (left < right && array[left] < pivot) left++
        // 找到第一个小于基数的位置
        while (left < right && array[right] > pivot) right--
        // 交换这两个数，使得左边分区都小于或等于基数，右边分区大于或等于基数
        if (left < right) {
            [array[left], array[right]] = [array[right], array[left]]
            left++
            right--
        }
    }
    // 如果 left 和 right 相等，单独比较 arr[right] 和 pivot
    if (left === right && array[right] > pivot) right--
    // 将基数和轴交换
    [array[start], array[right]] = [array[right], array[start]]
    return right
}
// console.log(quickSort2(array));

//快速排序-非递归-双指针
const quickSort3 = function (array, start = 0, end = array.length - 1) {
    if (start >= end) return; // 若左右指针相遇，待排序数组长度小于1，即递归的终点，return(注意不能写成left==right，这里left是有可能大于right的)。
    let list = [[start, end]] // 将[left,right]存入数组中，类似于递归入栈
    while (list.length > 0) { // 若list不为空，循环弹出list最后一个数组进行快排
        let now = list.pop() // 弹出list末尾。(也可用list.shift()取出list第一个数组，但在数据量较大时，这种方式效率较低)
        if (now[0] >= now[1]) continue; // 若左右指针相遇，待排序数组长度小于1，则无需进行快排(注意不能写成now[0]===now[1]，这里now[0]是有可能大于now[1]的
        let left = now[0], right = now[1], pivot = now[0]
        while (left < right) { // 在left<right时不断循环，left一旦与j碰头，则跳出循环。
            while (left < right && array[right] >= array[pivot]) right-- // right不断左移，找到在num[pivot]右侧且比它大的数。
            if (left >= right) {
                break;// 由于j可能已被改变，需再次判断left与j是否碰头。
            }
            while (left < right && array[left] <= array[pivot]) left++ // left不断右移，找到且比基数小的数，且left不能与right碰头。(由于两次交换已合并，此处不需要使得left在pivot左侧)
            [array[pivot], array[right], array[left]] = [array[right], array[left], array[pivot]]
            pivot = left // 基数已经在原num[left]的位置，pivot同时也要赋值成left。
        }
        list.push([now[0], pivot - 1]) // 将pivot左边数组作为待排序数组，只需将左右指针放入list即可。
        list.push([pivot + 1, now[1]]) // 将pivot右边数组作为待排序数组，只需将左右指针放入list即可。
    }
    return array
}

console.log(quickSort3([5,1,1,2,0,0]));

