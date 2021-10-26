/**
 * 总结
 * Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
 * .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
 * Promise.all().then()结果中数组的顺序和Promise.all()接收到的数组顺序一致。
 * all和race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。
 */

/*
function runAsync(x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000));
    return p;
}

Promise.all([runAsync(1), runAsync(2), runAsync(3), runAsync(4)])
    .then(res => console.log(res));
// 1
// 2
// 3
// 4
// [1, 2, 3, 4]
*/
/*
/!**
 *题目二
 * 我新增了一个runReject函数，它用来在1000 * x秒后reject一个错误。
 * 同时.catch()函数能够捕获到.all()里最先的那个异常，并且只执行一次。
 * 想想这道题会怎样执行呢？
 *!/

/!**
 * .catch是会捕获最先的那个异常，在这道题目中最先的异常就是runReject(2)的结果。
 * 另外，如果一组异步操作中有一个异常都不会进入.then()的第一个回调函数参数中。
 * 注意，为什么不说是不进入.then()中呢 ？
 * 哈哈，大家别忘了.then()方法的第二个参数也是可以捕获错误的：
 *!/
function runAsync(x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000 * x));
    return p;
}

function runReject(x) {
    const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x));
    return p;
}

Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
    .then(res => console.log(res))
    .catch(err => console.log(err));
// 1
// 2
// error: Error: 2
// 3
// 4*/
/*function runAsync (x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000));
    return p;
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
    .then(res => console.log('result: ', res))
    .catch(err => console.log(err));
// 1
// result: 1
// 2
// 3*/
