function flatten1(array) {
    return array.reduce((prev, curr) => {
        return prev.concat(Array.isArray(curr) ? flatten1(curr) : curr);
    }, [])
}

function flatten2(array) {
    while (array.some(Array.isArray)) {
        array = [].concat(...array)
    }
    return array
}

function flatten3(array) {
    let result = []
    array.forEach(item => {
        if (Array.isArray(item)) {
            result.push(...flatten3(item))
        } else {
            result.push(item)
        }
    })
    return result
}

let arr1 = [1, [2, [3, [4]]], [2, [3, [4]]]]
let arr2 = [1, [2, [3, [4]]], [2, [3, [4]]]]
let arr3 = [1, [2, [3, [4]]], [2, [3, [4]]]]
console.log(flatten1(arr1))
console.log(flatten2(arr2))
console.log(flatten3(arr3))

