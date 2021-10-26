// 有参数限制
function curry(fn, arr = []) {
    let len = fn.length;
    return function (...args) {
        let newArgs = [...arr, ...args]
        if (newArgs.length >= len) {
            return fn(...newArgs)
        } else {
            return curry(fn, newArgs)
        }
    }
}

let fn = curry((a, b, c, d) => {
    return a + b + c + d;
})
console.log(fn(3)(4, 5, 6, 7));

// 无参数限制
function curry_add(...args) {
    let sum = args.reduce((prev, next) => prev + next, 0)

    const item = function (...b) {
        sum += b.reduce((prev, next) => prev + next, 0)
        return item;
    }

    item.toString = () => sum
    return item
}

console.log(curry_add(1)(2, 3)(4).toString());
