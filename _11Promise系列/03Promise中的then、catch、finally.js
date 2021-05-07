/**
 * 总结：
 * Promise的状态一经改变就不能再改变。(见3.1)
 * .then和.catch都会返回一个新的Promise。(上面的1.4证明了)
 * catch不管被连接到哪里，都能捕获上层未捕捉过的错误。(见3.2)
 * 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
 * Promise 的 .then 或者 .catch 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。(见3.5)
 * .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。(见3.6)
 * .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。(见3.7)
 * .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。(见3.8)
 * .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法。(见3.9)
 * .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数。
 */
/*
/!**
 * 构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用 。验证了第一个结论，Promise的状态一经改变就不能再改变。
 *!/
const promise = new Promise((resolve, reject) => {
    resolve("success1");
    reject("error");
    resolve("success2");
});
promise
    .then(res => {
        console.log("then: ", res);
    }).catch(err => {
    console.log("catch: ", err);
});
// then: success1
*/
/*
/!**
 * 验证了第三个结论，catch不管被连接到哪里，都能捕获上层未捕捉过的错误。
 * 至于then3也会被执行，那是因为catch()也会返回一个Promise，且由于这个Promise没有返回值，所以打印出来的是undefined。
 *!/
const promise = new Promise((resolve, reject) => {
    reject("error");
    resolve("success2");
});
promise
    .then(res => {
        console.log("then1: ", res);
    }).then(res => {
    console.log("then2: ", res);
}).catch(err => {
    console.log("catch: ", err);
    // return 123
}).then(res => {
    console.log("then3: ", res);
});
// catch: error
// then3: undefined
*/
/*
/!**
 * Promise可以链式调用，不过promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用, 它并不像一般我们任务的链式调用一样return this。
 * 上面的输出结果之所以依次打印出1和2，那是因为resolve(1)之后走的是第一个then方法，并没有走catch里，所以第二个then中的res得到的实际上是第一个then的返回值。
 * 且return 2会被包装成resolve(2)
 *!/
Promise.resolve(1)
    .then(res => {
        console.log(res);
        return 2;
    })
    .catch(err => {
        return 3;
    })
    .then(res => {
        console.log(res);
    });
// 1
// 2
*/
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('----')
    }, 500)
    setTimeout(() => {
        console.log('timer');
        resolve('success');
    }, 1000);
})
const start = Date.now();
promise.then(res => {
    console.log(res, Date.now() - start);
});
promise.then(res => {
    console.log(res, Date.now() - start);
});
// timer
// success 1001
// success 1002
