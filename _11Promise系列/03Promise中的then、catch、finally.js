/**
 * 总结：
 * 1 Promise的状态一经改变就不能再改变。(见3.1)
 * 2 .then和.catch都会返回一个新的Promise。(上面的1.4证明了)
 * 3 catch不管被连接到哪里，都能捕获上层未捕捉过的错误。(见3.2)
 * 4 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
 * 5 Promise 的 .then 或者 .catch 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。(见3.5)
 * 6 .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。(见3.6)
 * 7 .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。(见3.7)
 * 8 .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。(见3.8)
 * 9 .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法。(见3.9)
 * 10 .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数。
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
/*
/!**
 * Promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。
 *!/
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
*/
/*
/!**
 * 这也验证了第4点和第6点，返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))。
 *!/
Promise.resolve().then(() => {
    return new Error('error!!!');
}).then(res => {
    console.log("then: ", res);
}).catch(err => {
    console.log("catch: ", err);
});
// then: Error: error!!!
*/
/*
/!**
 * .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
 *!/
const promise = Promise.resolve().then(() => {
    return promise;
})
promise.catch(console.err);
//Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
*/
/*
/!**
 * 这道题看着好像很简单，又感觉很复杂的样子，怎么这么多个.then啊…
 * 其实你只要记住原则8：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。
 * 第一个then和第二个then中传入的都不是函数，一个是数字类型，一个是对象类型，因此发生了透传，将resolve(1) 的值直接传到最后一个then里。
 *!/
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log);
// 1（不是2也不是3）*/
/*
/!**
 * 第一个参数是用来处理Promise成功的函数，第二个则是处理失败的函数。
 * 也就是说Promise.resolve('1')的值会进入成功的函数，Promise.reject('2')的值会进入失败的函数。
 *!/
Promise.reject('err!!!')
    .then((res) => {
        console.log('success', res);
    }, (err) => {
        console.log('error', err);
    }).catch(err => {
    console.log('catch', err);
});
// error error!!!

/!**
 * 如果把第二个参数去掉，就进入了catch()中：
 *!/
Promise.reject('error!!!')
    .then((res) => {
        console.log('success', res);
    }).catch(err => {
    console.log('catch', err);
});
// catch error

/!**
 * 由于Promise调用的是resolve()，因此.then()执行的应该是success()函数，可是success()函数抛出的是一个错误，它会被后面的catch()给捕获到，而不是被fail1函数捕获。
 *!/
Promise.resolve()
    .then(function success(res) {
        throw new Error('error!!!');
    }, function fail1(err) {
        console.log('fail1', err);
    }).catch(function fail2(err) {
    console.log('fail2', err);
});
// fail2 Error: error!!!
*/
/*
/!**
 * 只要记住它三个很重要的知识点就可以了：
 * .finally()方法不管Promise对象最后的状态如何都会执行
 * .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道Promise最终的状态是resolved还是rejected的
 * 它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。
 *!/
Promise.resolve('1')
    .then(res => {
        console.log(res);
    })
    .finally(() => {
        console.log('finally');
    });
Promise.resolve('2')
    .finally(() => {
        console.log('finally2');
        return '我是finally2返回的值';
    })
    .then(res => {
        console.log('finally2后面的then函数', res);
    });
// 1
// finally2
// finally
// finally2后面的then函数 2

/!**
 * 但是如果改为return new Error('我是finally中抛出的异常')，打印出来的就是'finally后面的then函数 1'
 *!/
Promise.resolve('1')
    .finally(() => {
        console.log('finally1');
        throw new Error('我是finally中抛出的异常');
    })
    .then(res => {
        console.log('finally后面的then函数', res);
    })
    .catch(err => {
        console.log('捕获错误', err);
    });
// finally1
// 捕获错误 Error: 我是finally中抛出的异常
/!**
 * 执行过程：
 * 首先定义了两个函数promise1和promise2，先不管接着往下看。
 * promise1函数先被调用了，然后执行里面new Promise的同步代码打印出promise1
 * 之后遇到了resolve(1)，将p的状态改为了resolved并将结果保存下来。
 * 此时promise1内的函数内容已经执行完了，跳出该函数
 * 碰到了promise1().then()，由于promise1的状态已经发生了改变且为resolved因此将promise1().then()这条微任务加入本轮的微任务列表(这是第一个微任务)
 * 这时候要注意了，代码并不会接着往链式调用的下面走，也就是不会先将.finally加入微任务列表，那是因为.then本身就是一个微任务，它链式后面的内容必须得等当前这个微任务执行完才会执行，因此这里我们先不管.finally()
 * 再往下走碰到了promise2()函数，其中返回的new Promise中并没有同步代码需要执行，所以执行reject('error')的时候将promise2函数中的Promise的状态变为了rejected
 * 跳出promise2函数，遇到了promise2().catch()，将其加入当前的微任务队列(这是第二个微任务)，且链式调用后面的内容得等该任务执行完后才执行，和.then()一样。
 * OK， 本轮的宏任务全部执行完了，来看看微任务列表，存在promise1().then()，执行它，打印出1，然后遇到了.finally()这个微任务将它加入微任务列表(这是第三个微任务)等待执行
 * 再执行promise2().catch()打印出error，执行完后将finally2加入微任务加入微任务列表(这是第四个微任务)
 * OK， 本轮又全部执行完了，但是微任务列表还有两个新的微任务没有执行完，因此依次执行finally1和finally2。
 *!/
function promise1() {
    let p = new Promise((resolve) => {
        console.log('promise1');
        resolve('1');
    });
    return p;
}

function promise2() {
    return new Promise((resolve, reject) => {
        reject('error');
    })
}

promise1()
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => console.log('finally1'));

promise2()
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => console.log('finally2'));
// promise1
// 1
// error
// finally1
// finally2
*/

