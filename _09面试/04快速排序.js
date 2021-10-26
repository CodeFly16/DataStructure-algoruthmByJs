//阮一峰  递归实现快速排序 (错误，有争议)
const rQuickSort = function (arr) {
    if (arr.length < 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0]
    let left = []
    let right = []
    for (let item of arr) {
        item < pivot ? left.push(item) : right.push(item)
    }
    return rQuickSort(left).concat([pivot], rQuickSort(right))
}

//es6版本
const quickSort = function (arr) {
    if (!arr || arr.length < 2) return arr
    const pivot = arr.pop();
    const left = arr.filter(item => item <= pivot)
    const right = arr.filter(item => item > pivot)
    return quickSort(left).concat([pivot], quickSort(right))
}

//非递归实现快速排序
const fQuickSort = function (arr) {
    let left = 0, right = arr.length - 1
    let stack = [left, right], i, j, midIndex, pivot, temp
    while (stack.length) {
        i = left = stack.pop()
        j = right = stack.pop()
        midIndex = Math.floor((i + j) / 2)
        pivot = arr[midIndex]
        while (i <= j) {
            while (arr[i] < pivot) i++
            while (arr[j] > pivot) j--
            if (i <= j) {
                temp = arr[j]
                arr[j] = arr[i]
                arr[i] = temp
                i++
                j--
            }
            if (left < j) {
                stack.push(left)
                stack.push(j)
            }
            if (i < right) {
                stack.push(i)
                stack.push(right)
            }
        }
    }
    return arr
}

/**
 * 快速排序(递归)
 * @param num 待排序数组
 * @param left 左指针
 * @param right 右指针
 */
function fzQuickSort(num, left = 0, right = num.length - 1) {
    if (left >= right) return; // 若左右指针相遇，待排序数组长度小宇1，即递归的终点，return(注意不能写成left==right，这里left是有可能大于right的)。
    var i = left, j = right, flag = left; // 定义可移动的左右指针 i，j，定义flag为基数下标。
    while (i < j) { // 在i<j时不断循环，i一旦与j碰头，则跳出循环。
        while (num[j] >= num[flag] && j > flag) j--; // j不断左移，找到在num[flag]右侧且比它大的数。
        if (i >= j) {
            break; // 由于j可能已被改变，需再次判断i与j是否碰头。
        }
        while (num[i] <= num[flag] && i < j) i++; // i不断右移，找到且比基数小的数，且i不能与j碰头。(由于两次交换已合并，此处不需要使得i在flag左侧)
        [num[flag], num[j], num[i]] = [num[j], num[i], num[flag]]
        flag = i; // 基数已经在原num[i]的位置，flag同时也要赋值成i。
    }
    fzQuickSort(num, left, flag - 1); // 将flag左边数组作为待排序数组，递归调用。
    fzQuickSort(num, flag + 1, right); // 将flag右边数组作为待排序数组，递归调用。
    return num
}

/**
 * 快速排序
 * @param  num 待排序数组
 */
function fzfQuickSort(num, left = 0, right = num.length - 1) {
    var list = [[left, right]]; // 将[left,right]存入数组中，类似于递归入栈
    while (list.length > 0) { // 若list不为空，循环弹出list最后一个数组进行快排
        var now = list.pop(); // 弹出list末尾。(也可用list.shift()取出list第一个数组，但在数据量较大时，这种方式效率较低)
        if (now[0] >= now[1]) { // 若左右指针相遇，待排序数组长度小于1，则无需进行快排(注意不能写成now[0]==now[1]，这里now[0]是有可能大于now[1]的
            continue;
        }
        var i = now[0], j = now[1], flag = now[0]; // 以下与递归方法相同，请参考上面的递归详解
        while (i < j) {
            while (num[j] >= num[flag] && j > flag) j--;
            if (i >= j) {
                break;
            }
            while (num[i] <= num[flag] && i < j) i++;
            [num[flag], num[j], num[i]] = [num[j], num[i], num[flag]]
            flag = i;
        }
        list.push([now[0], flag - 1]); // 将flag左边数组作为待排序数组，只需将左右指针放入list即可。
        list.push([flag + 1, now[1]]); // 将flag右边数组作为待排序数组，只需将左右指针放入list即可。
    }
    return num
}

console.log(rQuickSort([2, 4, 3, 4, 6, 3, 2, 5, 6, 2, 3, 6, 4, 123]));
console.log(quickSort([2, 4, 3, 4, 6, 3, 2, 5, 6, 2, 3, 6, 4, 123]))
console.log(fQuickSort([2, 4, 3, 4, 6, 3, 2, 5, 6, 2, 3, 6, 4, 123]))
console.log(fzQuickSort([2, 4, 3, 4, 6, 3, 2, 5, 6, 2, 3, 6, 4, 123]))
