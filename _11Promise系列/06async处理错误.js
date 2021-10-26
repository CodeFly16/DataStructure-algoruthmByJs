/*async function async1 () {
    await async2();
    console.log('async1');
    return 'async1 success';
}
async function async2 () {
    return new Promise((resolve, reject) => {
        console.log('async2');
        reject('error');
    })
}
async1().then(res => console.log(res));
//===
async function async1 () {
    await async2();
    console.log('async1');
    return 'async1 success';
}
async function async2 () {
    return new Promise((resolve, reject) => {
        console.log('async2');
        reject('error');
    })
}
async1().then(res => console.log(res));
// async2
// Uncaught (in promise) error
// async2
// Uncaught (in promise) error*/

async function async1 () {
    try {
        await Promise.reject('error!!!');
    } catch(e) {
        console.log(e);
    }
    console.log('async1');
    return Promise.resolve('async1 success');
}
async1().then(res => console.log(res));
console.log('script start');
// script start
// error!!!
// async1
// async1 success
