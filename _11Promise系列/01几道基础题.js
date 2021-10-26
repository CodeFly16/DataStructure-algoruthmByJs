/*const promise1 = new Promise((resolve, reject) => {
    console.log('promise1');
    resolve("3")
}).then(res => {
    console.log(res)
})
console.log('1', promise1);
// promise1
// 1 Promise{<pending>}
// 3*/
/*const promise2 = new Promise((resolve, reject) => {
    console.log(1);
    resolve('success')
    console.log(2);
});
promise2.then(() => {
    console.log(3);
});
console.log(4);
// 1
// 2
// 4
// 3*/
/*
/!**
 * 和题目二相似，只不过在promise中并没有resolve或者reject
 * 因此promise.then并不会执行，它只有在被改变了状态之后才会执行。
 *!/
const promise = new Promise((resolve, reject) => {
    console.log(1);
    console.log(2);
});
promise.then(() => {
    console.log(3);
});
console.log(4);
// 1
// 2
// 4
*/
/*
/!**
 * 过程分析：
 * 从上至下，先遇到new Promise，执行该构造函数中的代码promise1
 * 碰到resolve函数, 将promise1的状态改变为resolved, 并将结果保存下来
 * 碰到promise1.then这个微任务，将它放入微任务队列
 * promise2是一个新的状态为pending的Promise
 * 执行同步代码1， 同时打印出promise1的状态是resolved
 * 执行同步代码2，同时打印出promise2的状态是pending
 * 宏任务执行完毕，查找微任务队列，发现promise1.then这个微任务且状态为resolved，执行它。
 *!/

const promise1 = new Promise((resolve, reject) => {
    console.log('promise1');
    resolve('resolve1');
})
const promise2 = promise1.then(res => {
    console.log(res);
})
console.log('1', promise1);
console.log('2', promise2);

// promise1
// 1 Promise{<fulfilled>: 'resolve1'}
// 2 Promise{<pending>}
// resolve1
*/

/*
/!**
 * 这道题里最先执行的是'start'吗 ？
 * 请仔细看看哦，fn函数它是直接返回了一个new Promise的，而且fn函数的调用是在start之前，所以它里面的内容应该会先执行。
 *!/
const fn = () => (new Promise((resolve, reject) => {
    console.log(1);
    resolve('success');
}))
fn().then(res => {
    console.log(res);
})
console.log('start');
// 1
// start
// success
*/
