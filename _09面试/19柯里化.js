// 分批传入参数
// redux 源码的compose也是用了类似柯里化的操作
const curry = (fn, arr = []) => {// arr就是我们要收集每次调用时传入的参数
    let len = fn.length; // 函数的长度，就是参数的个数

    return function (...args) {
        let newArgs = [...arr, ...args] // 收集每次传入的参数

        // 如果传入的参数个数等于我们指定的函数参数个数，就执行指定的真正函数
        if (newArgs.length >= len) {
            return fn(...newArgs)
        } else {
            // 递归收集参数
            return curry(fn, newArgs)
        }
    }
}

// const curry_add = (...a) => {
//     let sum = a.reduce((pre, cur) => pre + cur, 0)
//     const item = (...b) => {
//         sum += b.reduce((pre, cur) => pre + cur, 0)
//         return item
//     }
//     item.toString = () => sum
//     return item
// }
// console.log(curry_add(1)(2, 3)(4).toString()); // 10
let fn = curry((a, b, c, d) => {
    return a + b + c + d;
})
console.log(fn(3)(4, 5, 1, 2));
