/*
/!**
 * 过程分析：
 * 首先一进来是创建了两个函数的，我们先不看函数的创建位置，而是看它的调用位置
 * 发现async1函数被调用了，然后去看看调用的内容
 * 执行函数中的同步代码async1 start，之后碰到了await，它会阻塞async1后面代码的执行，因此会先去执行async2中的同步代码async2，然后跳出async1
 * 跳出async1函数后，执行同步代码start
 * 在一轮宏任务全部执行完之后，再来执行刚刚await后面的内容async1 end。
 * 在这里，你可以理解为「紧跟着await后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then中」。
 *!/
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2() {
    console.log("async2");
}
async1();
console.log('start');
// async1 start
// async2
// start
// async1 end*/
/*
async function async1() {
    console.log("async1 start");
    new Promise(resolve => {
        console.log('promise');
    })
    console.log("async1 end");
}

async1();
console.log("start");
// async1 start
// promise
// async1 end
// start
*/
/*
/!**
 *定时器始终还是最后执行的，它被放到下一条宏任务的延迟队列中。
 *!/
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2() {
    setTimeout(() => {
        console.log('timer');
    }, 0)
    console.log("async2");
}
async1();
console.log("start");
// async1 start
// async2
// start
// async1 end
// timer
*/
/*async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
    setTimeout(() => {
        console.log('timer1');
    }, 0);
}
async function async2() {
    setTimeout(() => {
        console.log('timer2');
    }, 0)
    console.log("async2");
}
async1();
setTimeout(() => {
    console.log('timer3');
}, 0);
console.log("start");
// async1 start
// async2
// start
// async1 end
// timer2
// timer3
// timer1*/
/*async function fn() {
    // return await 1234
    // 等同于
    return 1234;
}

fn().then(res => console.log(res));
//1234*/
/*
/!**
 * 在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，因此相当于一直在await，await，await却始终没有响应…
 * 所以在await之后的内容是不会执行的，也包括async1后面的 .then。
 *!/
async function async1() {
    console.log('async1 start');
    await new Promise(resolve => {
        console.log('promise1');
        resolve("test")
    })
    console.log('async1 success');
    return 'async1 end';
}

console.log('srcipt start');
async1().then(res => console.log(res));
console.log('srcipt end');
// srcipt start
// async1 start
// promise1
// srcipt end*/
/*async function async1 () {
    console.log('async1 start');
    await new Promise(resolve => {
        console.log('promise1');
        resolve('promise1 resolve');
    }).then(res => console.log(res))
    console.log('async1 success');
    return 'async1 end';
}
console.log('srcipt start');
async1().then(res => console.log(res));
console.log('srcipt end');
// srcipt start
// async1 start
// promise1
// srcipt end
// promise1 resolve
// async1 success
// async1 end*/
/*

/!**
 * 这道题应该也不难，不过有一点需要注意的，在async1中的new Promise它的resovle的值和async1().then()里的值是没有关系的，
 * 很多小伙伴可能看到resovle('promise resolve')就会误以为是async1().then()中的返回值。
 *!/
async function async1() {
    console.log('async1 start');
    await new Promise(resolve => {
        console.log('promise1');
        resolve('promise resolve');
        ;
    })
    console.log('async1 success');
    return 'async1 end';
}

console.log('srcipt start');
async1().then(res => {
    console.log(res);
})
new Promise(resolve => {
    console.log('promise2');
    setTimeout(() => {
        console.log('timer');
    })
});
// srcipt start
// async1 start
// promise1
// promise2
// async1 success
// async1 end
// timer
*/
/*
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(function() {
    console.log("setTimeout");
}, 0);

async1();

new Promise(function(resolve) {
    console.log("promise1");
    resolve();
}).then(function() {
    console.log("promise2");
});
console.log('script end');
// script start
// async1 start
// async2
// promise1
// async1 end
// promise2
// setTimeout*/
/*
async function testSometing() {
    console.log("执行testSometing");
    return "testSometing";
}

async function testAsync() {
    console.log("执行testAsync");
    return Promise.resolve("hello async");
}

async function test() {
    console.log("test start...");
    const v1 = await testSometing();
    console.log(v1);
    const v2 = await testAsync();
    console.log(v2);
    console.log(v1, v2);
}

test();

var promise = new Promise(resolve => {
    console.log("promise start...");
    resolve("promise");
});
promise.then(val => console.log(val));

console.log("test end...");
// test start...
// 执行testSometing
// promise start...
// test end...
// testSometing
// 执行testAsync
// promise
// hello async
// testSometing hello async*/
