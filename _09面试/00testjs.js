// // let line;
// // while(line=read_line()){ // 有多个输入样例，只要每一行有数据 ，就会继续循环读取单行数据
// //     let lines = line.trim().split(' '); // 去掉每一行的首尾空格，用空格分隔每一行的数据
// //     let a = parseInt(lines[0]);  // 将分隔出的字符串转为整型，并存储在变量 a 中
// //     let b = parseInt(lines[1]);
// //     print(getSXH(a,b));
// // }
//
// function getSXH(num1, num2) {
//     let result = []
//     for (let i = num1; i < num2; i++) {
//         let num = (i + '').split('')
//         let [a, b, c] = num.map(Number)
//         if (a * a * a + b * b * b + c * c * c === i) {
//             result.push(i)
//         }
//     }
//     return result.length > 0 ? result.join(' ') : "no"
// }
//
// console.log(getSXH(375, 380));

// setTimeout(() => {
//     console.log(1);
// }, 0);
// setInterval(() => {
//     console.log(2);
// }, 0);
// console.log(3);
// new Promise(() => {
//     console.log(4);
// });
//
// // 3 4 1 2
// setTimeout(() => {
//     console.log(1);
// }, 0);
// setInterval(() => {
//     console.log(2);
// }, 0);
// console.log(3);
// new Promise(() => {
//     console.log(4);
// });
//
// while(5){
//     console.log(5);
// }
//
// let allQuan = [1, [5, 3], [10, 5], [1, 2]]
// allQuan = allQuan.slice(1)
// let getData = function (allQuan) {
//     let get = 0, pay = 0
//     allQuan.forEach(item => {
//         if (item[0] <= item[1]) {
//             get += item[1]
//         } else {
//             get += item[0]
//             pay += item[0] - item[1]
//         }
//     })
//     return get + ' ' + pay
// }
// console.log(getData(allQuan));

// function getStr(str){
//     str = str.trim()
//     console.log(str)
//     let pre = str[0]
//     let result = [str[0]]
//     for(let i = 1;i<str.length;i++){
//         if(str[i] === ' ') continue
//         if(str[i] === pre){
//             continue
//         }else{
//             result.push(str[i])
//             pre = str[i]
//         }
//     }
//     return result.join('')
// }
//
// console.log(getStr("    a  A F  "));

//读取一行输入：read_line()
//将读取至多1024个字符，当还未达到1024个时如果遇到回车或结束符，提前结束。
//读取多行最简单的办法是while((line = read_line()) != '')。

// function getPrevSum(array) {
//     let sum = 0
//     for (let i = 1; i < array.length; i++) {
//         let preNumArray = array
//             .slice(0, i)
//             .filter(item => item < array[i])
//             .sort((a, b) => b - a)
//         let prev = 0
//         if (preNumArray.length > 0) {
//             prev = preNumArray[0]
//         }
//         sum += (i + 1) * prev
//     }
//     return sum
// }
//
// console.log(getPrevSum([1, 6, 3, 3, 8]));

// function getMin(array) {
//     let count = 0
//     let left = array.slice(0, array.length / 2)
//     let right = array.slice((array.length / 2))
//     for (let i = 0; i < left.length; i++) {
//         if (left[i] !== right[i]) count++
//     }
//     return count
// }
//
// console.log(getMin([4, 2, 1, 5, 2, 10, 2, 1, 5, 8]));

// function getSuccessNum(k, data) {
//     data = data.sort((a, b) => b - a)
//     let count = data.slice(0, k).filter(item => item > 0).length
//     if (count < k) return count
//     if (parseInt(count) === parseInt(k)) {
//         for (let i = k ; i < data.length; i++) {
//             if (data[i] === data[k - 1]) {
//                 count++
//             } else {
//                 break;
//             }
//         }
//     }
//     return count
// }
//
// console.log(getSuccessNum(4, [0, 2, 2, 2, 2, 3, 4]));

// function getMaxTreap(nums) {
//     const len = nums.length;
//     //数组长度为1，返回值
//     if (len === 1) return nums[0];
//
//     // 找到数组最大子数组
//     let max = nums[0];
//     let current = nums[0];
//     for (let i = 1; i < len; i++) {
//         current = Math.max(current + nums[i], nums[i])
//         max = Math.max(max, current)
//     }
//
//     //找到数组最小子数组
//     let min = nums[0];
//     let next = nums[0];
//     for (let i = 1; i < len; i++) {
//         next = Math.min(next + nums[i], nums[i]);
//         min = Math.min(min, next)
//     }
//     // 数组和
//     const total = nums.reduce((a, b) => a + b);
//
//     //对比数组最大子数组，与数组和-数组最小子数组
//     return Math.max(max, total - min)
// }
//
// console.log(getMaxTreap([3, -2,-1,-2, 4, -1]));


// console.log(trans('get-element-by-id')); // 'getElementById'
// function trans(char) {
//     return char.split('-').map((item, index) => index !== 0 ? item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase()).join('')
// }

// let array = [
//     {'id': '1', 'value': '1', 'parentId': ''},
//     {'id': '2', 'value': '2', 'parentId': '1'},
//     {'id': '3', 'value': '3', 'parentId': '2'},
//     {'id': '4', 'value': '4', 'parentId': '2'},
//     {'id': '5', 'value': '4', 'parentId': ''},
// ]
//
// const util = require('util')

// 非递归
// function transArrayToTree(list, parId) {
//     let obj = {};
//     let result = [];
//     //将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
//     list.map(el => {
//         obj[el.id] = el;
//     })
//     for (let i = 0; i < list.length; i++) {
//         let id = list[i].parentId;
//         delete list[i].parentId
//         if (id == parId) {
//             result.push(list[i])
//             continue
//         }
//         if (obj[id].children) {
//             obj[id].children.push(list[i]);
//         } else {
//             obj[id].children = [list[i]];
//         }
//     }
//     return result
// }
// //递归
// function transArrayToTree(list, parId) {
//     function loop(parId) {
//         let res = []
//         for (let i = 0; i < list.length; i++) {
//             if(list[i].parentId == parId){
//                 list[i].children = loop(list[i].id)
//                 res.push(list[i])
//             }
//         }
//         return res
//     }
//
//     return loop(parId)
// }
//
// console.log(util.inspect(transArrayToTree(array, ''), {showHidden: false, depth: null}))

// function test(text = "666", time = 1000) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve(text)
//         }, time)
//     })
// }
//
// let p1 = test("p1", 3000)
// let p2 = test("p2", 1000)
// let p3 = test("p3", 2000)
// let pArr = [p1, p2, p3]
//
//
// function promiseAll(promiseArr) {
//     if (!Array.isArray(promiseArr)) {
//         return "参数为数组"
//     }
//     return new Promise(function (resolve, reject) {
//         let resolveValues = []
//         let resolveCount = 0
//         for (let i = 0; i < promiseArr.length; i++) {
//             Promise.resolve(promiseArr[i]).then(function (res) {
//                 console.log("res", res)
//                 // 和promise.race的主要差别
//                 resolveCount++
//                 resolveValues[i] = res
//                 if (resolveCount === promiseArr.length) {
//                     resolve(resolveValues)
//                 }
//             }, function (err) {
//                 reject(err)
//             })
//         }
//     })
// }

// promiseAll(pArr).then((res) => {
//     console.log("res", res)
// }, (err) => {
//     console.log("err", err)
// })
//
// function promiseRace(promiseArr) {
//     if (!Array.isArray(promiseArr)) {
//         return "参数为数组"
//     }
//     return new Promise(function (resolve, reject) {
//         for (let i = 0; i < promiseArr.length; i++) {
//             Promise.resolve(promiseArr[i]).then((res) => {
//                 resolve(res) // 和promise.all的主要差别
//             }, (err) => {
//                 reject(err)
//             })
//         }
//     })
// }
//
// promiseRace(pArr).then((res) => {
//     console.log("res", res)
// }, (err) => {
//     console.log("err", err)
// })

// function getType(obj) {
//     if (obj === null) return String(obj);
//     // 对象类型 "[object XXX]"->XXX的小写 简单类型typeof obj
//     return typeof obj === 'object' ? Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '').toLowerCase() : typeof obj;
// }
//
// // 调用
// console.log(getType(null)); // null
// console.log(getType(undefined)); // undefined
// console.log(getType({})); // object
// console.log(getType([])); // array
// console.log(getType(123)); // number
// console.log(getType(true)); // boolean
// console.log(getType('123')); // string
// console.log(getType(/123/)); // regexp
// console.log(getType(new Date())); // date
// var name="martin";
// var obj={
//     name:"lucy",
//     say:function(year,place){
//         console.log(this.name+" is "+year+" born from "+place);
//     }
// };
// var say=obj.say;
// setTimeout(function(){
//     say.apply(obj,["1996","China"])
// } ,0); //lucy is 1996 born from China,this改变指向了obj
// say("1996","China") //martin is 1996 born from China,this指向window，说明apply只是临时改变一次this指向


// function getAllStr(char) {
//     let tranfChar
//     if (char.indexOf('-') > -1) {
//         tranfChar = char.split('-')
//     } else if (char.indexOf('_') > -1) {
//         tranfChar = char.split('_')
//     } else {
//         tranfChar = [char[0]]
//         for (let i = 1; i < char.length; i++) {
//             if (char[i] >= 'A' && char[i] <= 'Z') {
//                 tranfChar.push(char[i])
//             } else {
//                 tranfChar[tranfChar.length - 1] += char[i]
//             }
//         }
//     }
//     console.log(tranfChar)
//     return `${allToUpper(tranfChar).join('')} ${firstToUpper(tranfChar).join('')} ${allToLower(tranfChar).join('_')} ${allToLower(tranfChar).join('-')}`
// }
//
// function allToUpper(charArray) {
//     return charArray.map(item => item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase())
// }
//
// function allToLower(charArray) {
//     return charArray.map(item => item.toLowerCase())
// }
//
// function firstToUpper(charArray) {
//     let str = charArray.map(item => item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase())
//     str[0] = str[0].toLowerCase()
//     return str
// }
//
// console.log(getAllStr('pascal_case_test'));

// function checkValidString(s) {
//     let starStack = []
//     let leftStack = []
//     for (let i = 0; s < s.length; s++) {
//         if (s[i] === '*') starStack.push('*')
//         if (s[i] === '[') leftStack.push('[')
//         if (s[i] === ']') {
//             if (starStack.length || leftStack.length) return false
//             if (leftStack.length) {
//                 leftStack.pop()
//             } else {
//                 starStack.pop()
//             }
//         }
//     }
//     if (leftStack.pop()) {
//         if (starStack.pop()) {
//             return false
//         }
//     }
//     return true
// }
//
// console.log(checkValidString("(*))"));
// var data = ['1', '2', '3', '4']
// console.log(data.map(Number).reduce((pre, cur) => pre + cur));

// var lastRemaining = function (n, m) {
//     let array = []
//     let cur = 0
//     for (let i = 0; i < n; i++) array.push(i)
//     while (array.length > 1) {
//         for (let i = 0; i < m - 1; i++) {
//             if (cur > array.length) {
//                 cur = 0
//                 continue
//             }
//             cur++
//         }
//         array.splice(cur, 1)
//     }
//     return array[0]
// };
//
// console.log(lastRemaining(5, 3));

// /**
//  * @param {string} s
//  * @return {string}
//  */
// var longestPalindrome = function (s) {
//     let result = s[0]
//     let str = [s[0]]
//     for (let i = 1; i < s.length; i++) {
//         str.push(s[i])
//         if (isPalindrome(str)) {
//             str.length > result.length ? result = str.join('') : ''
//         }
//     }
//     while (str.length) {
//         str.shift()
//         if (isPalindrome(str)) {
//             str.length > result.length ? result = str.join('') : ''
//         }
//         if (str.length) {
//             str.pop()
//             if (isPalindrome(str)) {
//                 str.length > result.length ? result = str.join('') : ''
//             }
//         }
//     }
//     return result
// };
//
// function isPalindrome(s) {
//     let str = s.join('')
//
//     return str === str.split('').reverse().join('')
// }
//
// console.log(longestPalindrome("eabcb"));

var longestPalindrome = function (s) {
    if (s.length < 2) {
        return s
    }
    let res = ''
    for (let i = 0; i < s.length; i++) {
        // 回文子串长度是奇数
        helper(i, i)
        // 回文子串长度是偶数
        helper(i, i + 1)
    }

    function helper(m, n) {
        while (m >= 0 && n < s.length && s[m] == s[n]) {
            m--
            n++
        }
        // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
        // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
        if (n - m - 1 > res.length) {
            // slice也要取[m+1,n-1]这个区间
            res = s.slice(m + 1, n)
        }
    }

    return res
}

longestPalindrome("babad")
