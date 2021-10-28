//防抖
function debounce(fn, wait) {
    let timer = null
    return function () {
        let args = arguments
        let that = this
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(that, args)
        }, wait)
    }
}

// 函数节流的实现;
function throttle(fn, delay) {
    let preTime = Date.now()
    return function () {
        let curTime = Date.now()
        if (curTime - preTime >= delay) {
            preTime = Date.now();
            return fn.apply(this, arguments)
        }
    }
}

function fn1() {
    console.log(123)
}

