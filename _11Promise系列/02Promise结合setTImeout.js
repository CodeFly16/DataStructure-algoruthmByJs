/*
/!**
 * 过程分析：
 * 刚开始整个脚本作为一个宏任务来执行，对于同步代码直接压入执行栈进行执行，因此先打印出start和end。
 * setTimout作为一个宏任务被放入宏任务队列(下一个)
 * Promise.then作为一个微任务被放入微任务队列
 * 本次宏任务执行完，检查微任务，发现Promise.then，执行它
 * 接下来进入下一个宏任务，发现setTimeout，执行。
 *!/
console.log('start');
setTimeout(() => {
    console.log('time');
})
Promise.resolve().then(() => {
    console.log('resolve');
})
console.log('end');
// start
// end
// resolve
// time
*/
/*
/!**
 * 过程分析：
 * 和题目1.2很像，不过在resolve的外层加了一层setTimeout定时器。
 * 从上至下，先遇到new Promise，执行该构造函数中的代码1
 * 然后碰到了定时器，将这个定时器中的函数放到下一个宏任务的延迟队列中等待执行
 * 执行同步代码2
 * 跳出promise函数，遇到promise.then，但其状态还是为pending，这里理解为先不执行
 * 执行同步代码4
 * 一轮循环过后，进入第二次宏任务，发现延迟队列中有setTimeout定时器，执行它
 * 首先执行timerStart，然后遇到了resolve，将promise的状态改为resolved且保存结果并将之前的promise.then推入微任务队列
 * 继续执行同步代码timerEnd
 * 宏任务全部执行完毕，查找微任务队列，发现promise.then这个微任务，执行它。
 *!/
const promise = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        console.log("timerStart");
        resolve("success");
        console.log("timerEnd");
    }, 0);
    console.log(2);
});
promise.then((res) => {
    console.log(res);
});
console.log(4);
// 1
// 2
// 4
// timerStart
// timerEnd
// success
*/
/*
/!**
 * 这两个例子，看着好像只是把第一个定时器中的内容换了一下而已。
 * 一个是为定时器timer3，一个是为Promise.then
 * 但是如果是定时器timer3的话，它会在timer2后执行，而Promise.then却是在timer2之前执行。
 * 你可以这样理解，Promise.then是微任务，它会被加入到本轮中的微任务列表，而定时器timer3是宏任务，它会被加入到下一轮的宏任务中。
 *!/
//1
setTimeout(() => {
    console.log('timer1');
    setTimeout(() => {
        console.log('timer3')
    }, 0);
}, 0);
setTimeout(() => {
    console.log('timer2');
}, 0);
console.log('start');
// start
// timer1
// timer2
// timer3

//2
setTimeout(() => {
    console.log('timer1');
    Promise.resolve().then(() => {
        console.log('promise');
    });
}, 0);
setTimeout(() => {
    console.log('timer2');
}, 0);
console.log('start');
// start
// timer1
// promise
// timer2
*/
/*
/!**
 * 过程分析：
 * 刚开始整个脚本作为第一次宏任务来执行，我们将它标记为宏1，从上至下执行
 * 遇到Promise.resolve().then这个微任务，将then中的内容加入第一次的微任务队列标记为微1
 * 遇到定时器timer1，将它加入下一次宏任务的延迟列表，标记为宏2，等待执行(先不管里面是什么内容)
 * 执行宏1中的同步代码start
 * 第一次宏任务(宏1)执行完毕，检查第一次的微任务队列(微1)，发现有一个promise.then这个微任务需要执行
 * 执行打印出微1中同步代码promise1，然后发现定时器timer2，将它加入宏2的后面，标记为宏3
 * 第一次微任务队列(微1)执行完毕，执行第二次宏任务(宏2)，首先执行同步代码timer1
 * 然后遇到了promise2这个微任务，将它加入此次循环的微任务队列，标记为微2
 * 宏2中没有同步代码可执行了，查找本次循环的微任务队列(微2)，发现了promise2，执行它
 * 第二轮执行完毕，执行宏3，打印出timer2
 *!/
Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
        console.log('timer2');
    }, 0);
});
const timer1 = setTimeout(() => {
    console.log('timer1');
    Promise.resolve().then(() => {
        console.log('promise2');
    })
}, 0)
console.log('start');
// start
// promise1
// timer1
// promise2
// timer2
*/
/*
/!**
 * 过程分析：
 * 从上至下，先执行第一个new Promise中的函数，碰到setTimeout将它加入下一个宏任务列表
 * 跳出new Promise，碰到promise1.then这个微任务，但其状态还是为pending，这里理解为先不执行
 * promise2是一个新的状态为pending的Promise
 * 执行同步代码console.log('promise1')，且打印出的promise1的状态为pending
 * 执行同步代码console.log('promise2')，且打印出的promise2的状态为pending
 * 碰到第二个定时器，将其放入下一个宏任务列表
 * 第一轮宏任务执行结束，并且没有微任务需要执行，因此执行第二轮宏任务
 * 先执行第一个定时器里的内容，将promise1的状态改为resolved且保存结果并将之前的promise1.then推入微任务队列
 * 该定时器中没有其它的同步代码可执行，因此执行本轮的微任务队列，也就是promise1.then，它抛出了一个错误，且将promise2的状态设置为了rejected
 * 第一个定时器执行完毕，开始执行第二个定时器中的内容
 * 打印出'promise1'，且此时promise1的状态为resolved
 * 打印出'promise2'，且此时promise2的状态为rejected
 *!/
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 1000);
});
const promise2 = promise1.then(() => {
    throw new Error('error!!!');
})
console.log('promise1', promise1);
console.log('promise2', promise2);
setTimeout(() => {
    console.log('promise1', promise1);
    console.log('promise2', promise2);
}, 2000);
// promise1 Promise{<pending>}
// promise2 Promise{<pending>}
// Error: error!!!
// promise1 Promise{<fulfilled>: "success"}
// promise2 Promise{<rejected>: Error: error!!!}
*/
/*const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
        console.log("timer1");
    }, 1000);
    console.log("promise1里的内容");
});
const promise2 = promise1.then(() => {
    throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
    console.log("timer2");
    console.log("promise1", promise1);
    console.log("promise2", promise2);
}, 2000);
// promise1里的内容
// promise1 Promise{<pending>}
// promise2 Promise{<pending>}
// timer1
// Error: error!!!
// promise1 Promise{<fulfilled>: "success"}
// promise2 Promise{<rejected>: Error: error!!!}*/
