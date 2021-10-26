// //递归处理
// function flat1(arr) {
//     let result = []
//
//     function setArray(arr) {
//         for (let item of arr) {
//             if (Array.isArray(item)) {
//                 setArray(item)
//             } else {
//                 result.push(item)
//             }
//         }
//     }
//
//     setArray(arr)
//     return result
// }
//
// //reduce处理
// function flatten(arr) {
//     return arr.reduce((pre, cur) => {
//         return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
//     }, [])
// }
//递归处理
const flat1 = function (array) {
    let result = []
    array.forEach(item => {
        if (Array.isArray(item)) {
            result.push(...flat1(item))
        } else {
            result.push(item)
        }
    })
    return result
}

const flat2 = function (array) {
    return array.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flat2(cur) : cur)
    }, [])
}

const flat3 = function (array) {
    while (array.some(Array.isArray)) {
        array = [].concat(...array)
    }
    return array
}
let arr = [1, [2, [3, [4]]], [2, [3, [4]]]]
// while (arr.some(Array.isArray)) {
//     console.log('...arr', [...arr])
//     arr = [].concat(...arr)
// }
console.log(flat1(arr));
console.log(flat2(arr));
console.log(flat3(arr))
// console.log(flatten([1, [2, [3, [4]]]]));
