function debounce(fn, delay) {
    let timer = null;
    return function () {
        let args = arguments
        let that = this
        if (timer) {
            clearTimeout(timer);
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(that, args)
        }, delay)
    }
}

function throttle(fn, delay) {
    let previous = 0;
    return function () {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > delay) {
            fn.apply(context, args);
            previous = now;
        }
    }
}

function fn1() {
    console.log(123)
}

const debounceFn = debounce(fn1, 3000)
const throttleFn = throttle(fn1, 3000)
let time = 0
// setInterval(() => {
//     console.log(++time)
// }, 1000)
// setTimeout(() => {
//     debounceFn()
// }, 1000)
// setTimeout(() => {
//     debounceFn()
// }, 2000)
throttleFn()
setTimeout(() => {
    throttleFn()
}, 1000)
