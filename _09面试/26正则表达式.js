/*let tel = '010-99999999'
console.log(/(010|020)\-\d{7,8}/.test(tel))*/

/*
let reg = /(12|45)/
let hd = '123456'
console.log(hd.match(reg));
*/

/*let hd = `
    #1 js,200元 #
    #2 node,300元 #
    #3 html,30元 #
    #4 css,190元 #
`

console.log(hd.match(/^#*.+#*$/mg).map(v => {
    v = v.replace(/\s+#\d*\s*!/, '').replace(/\s*#\s*!/, '')
    let [name, value] = v.split(',')
    return {name, value}
    /!*let [name, price] = v
    return {name, price}*!/
}));*/
/*
//邮箱验证
let mail = '466885667@qq.com'
let mailFalse = '21233qq.com'
let reg = /^[\w-]{7,10}@[\w-]+\.(com|org|cn|net)$/i
console.log(mail.match(reg));
console.log(mailFalse.match(reg));
*/

/*
//域名抓取
let hd = `
    https://www.baidu.com
    http://baidu.cn
    https://lyfbaidu.com
`

let reg = /https?:\/\/((?:\w+\.)?\w+\.(?:com|cn|org))/gi
let urls = []
while ((res = reg.exec(hd))) {
    urls.push(res[1])
}
console.log(urls)
*/

/*let hd = `
       <h1>baidu.com</h1>
       <h2>baiduren.com</h2>
       <h1>百度</h1>
`
let reg = /<(h[1-6])>([\s\S]+?)<\/\1>/gi

let contents = hd.matchAll(reg)

let contentArray = []
for (const regElement of contents) {
    contentArray.push(regElement[2])
}
console.log(contentArray)*/

/*let hd = '(010)99999999 (020)8888888'
let reg = /\((\d{3,4})\)(\d{7,8})/g
console.log(hd.replace(reg, '$1-$2'))*/


/*let users = `
    百度电话:12345678901
    阿里电话:98798323421
`

let reg = /(?<=\d{6})\d{5}/ig

users = users.replace(reg,v=>{
    return '*'.repeat(5)
})

console.log(users)*/





