/*
// 需要实现的函数
function repect (func,times,wait){}
// 使下面代码能正常工作
const repectFunc = repect(console.log, 4, 3000)

repectFunc('helloworld') //会输出 4 次 hellworld，每次间隔 3 秒

*/

function repect(func, times, wait) {
    return function (str) {
        let count = 0
        let interval = setInterval(() => {
            count++
            func(str)
            if (count === times) clearInterval(interval)
        }, wait)
    }
}

const repectFunc = repect(console.log, 10, 100)

repectFunc('helloworld') //会输出 4 次 hellworld，每次间隔 3 秒
