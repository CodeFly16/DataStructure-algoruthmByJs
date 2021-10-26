/**getAction请求
 * @param {string} url 请求路径
 * @param {object} query 请求要携带的参数
 */
getAction = function (url, params, fn, isJson = true) {
    if (params) {
        url += '?' + Object.entries(params).map(item => `${item[0]}=${item[1]}`).join('&')
    }
    let xhr = new XMLHttpRequest();
    xhr.open('get', url)
    xhr.send()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
                fn && fn(res)
            }
        }
    }
}

/*getAction('www.baidu.com', {param1: 123, param2: 234}, (res) => {
    console.log(res)
})*/

/**ajax post请求
 * @param {string} url 请求路径
 * @param {object} query 请求要携带的参数
 * @param {function} fn 请求成功之后的回调函数
 * @param {boolean} [isjson] 请求数据是否为json 默认值为true
 */
postAction = function (url, params, fn, isJson = true) {
    let query = ''
    if (params) {
        query = Object.entries(params).map(item => `${item[0]}=${item[1]}`).join('&')
    }
    let xhr = new XMLHttpRequest()
    xhr.open('post', url)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send(query)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText
                fn && fn(res)
            }
        }
    }
}

postAction('www.baidu.com', {param1: 123, param2: 234, param3: 456}, (res) => {
    console.log(res)
})
