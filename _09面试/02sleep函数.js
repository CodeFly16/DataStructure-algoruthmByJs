//Promise
const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}

//Generator
function* sleepGenerator(time) {
    yield new Promise(resolve => setTimeout(resolve, time))
}

console.log(sleepGenerator(1000))
sleepGenerator(1000).next().value.then(() => {
    console.log(123213)
})

//async await
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}

async function output(time) {
    let out = await sleep(time);
    console.log(1);
    return out;
}


/*function f(fn) {
    return function (...args) {
        return new Promise((resolve) => {
            console.log(args)
            args.unshift(resolve)
            console.log(args)
            fn(...args)
        })
    }
}

const sleep = f(setTimeout);
console.log('===',sleep)
sleep(2000).then(() => console.log('hi'));*/
