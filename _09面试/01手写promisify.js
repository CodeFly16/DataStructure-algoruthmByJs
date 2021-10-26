function promisify(fn) {
    //返回一个函数
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
            fn.apply(null, args)
        })
    }
}
