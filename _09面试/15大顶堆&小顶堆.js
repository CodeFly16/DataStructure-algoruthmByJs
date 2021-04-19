//从前往后、自下而上式堆化建堆
// 原地建堆
function buildHeap(items, heapSize) {
    while (heapSize < items.length - 1) {
        heapSize++
        heapify(items, heapSize)
    }
}

function heapify(items, i) {
    // 自下而上式堆化
    while (Math.floor(i / 2) > 0 && items[i] > items[Math.floor(i / 2)]) {
        swap(items, i, Math.floor(i / 2)); // 交换
        i = Math.floor(i / 2);
    }
}

function swap(items, i, j) {
    let temp = items[i]
    items[i] = items[j]
    items[j] = temp
}

// 测试
var items = [, 1, 9, 2, 8, 3, 7, 4, 6, 5]
// 初始有效序列长度为 1
buildHeap(items, 1)
// console.log(items)
// [empty, 1, 2, 3, 5, 4]

function heapSort(items) {
    let result = []
    while (items.length > 1) {
        buildHeap(items, 1)
        result.push(items.splice(1, 1)[0])
    }
    return result
}

console.log(heapSort([, 1, 9, 2, 8, 3, 7, 4, 6, 5]));
