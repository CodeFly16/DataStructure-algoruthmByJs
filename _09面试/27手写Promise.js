class HD {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'

    constructor(executor) {
        this.status = HD.PENDING
        this.value = null
        this.callbacks = []
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (err) {
            this.reject(err)
        }
    }

    resolve(value) {
        if (this.status === HD.PENDING) {
            this.value = value
            this.status = HD.FULFILLED
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(value)
                })
            })
        }
    }

    reject(reason) {
        if (this.status === HD.PENDING) {
            this.value = reason
            this.status = HD.REJECTED
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onRejected(reason)
                })
            })
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== "function") {
            onFulfilled = () => this.value
        }
        if (typeof onRejected !== "function") {
            onRejected = () => this.value
        }
        let promise = new HD((resolve, reject) => {
            if (this.status === HD.PENDING) {
                this.callbacks.push({
                    onFulfilled: value => {
                        this.parse(promise, onFulfilled(value), resolve, reject)
                    },
                    onRejected: value => {
                        this.parse(promise, onRejected(value), resolve, reject)
                    }
                })
            }
            if (this.status === HD.FULFILLED) {
                setTimeout(() => {
                    this.parse(promise, onFulfilled(this.value), resolve, reject)
                })

            }
            if (this.status === HD.REJECTED) {
                setTimeout(() => {
                    this.parse(promise, onRejected(this.value), resolve, reject)
                })
            }
        })
        return promise
    }

    parse(promise, result, resolve, reject) {
        if (promise === result) {
            throw  new TypeError("Chaining cycle detected")
        }
        try {
            if (result instanceof HD) {
                result.then(resolve, reject)
            } else {
                resolve(result)
            }
        } catch (err) {
            reject(err)
        }

    }

    static resolve(value) {
        return new HD((resolve, reject) => {
            if (value instanceof HD) {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }

    static reject(value) {
        return new HD((resolve, reject) => {
            if (value instanceof HD) {
                value.then(resolve, reject)
            } else {
                reject(value)
            }
        })
    }

    static all(promises) {
        return new HD((resolve, reject) => {
            const values = []
            promises.forEach((promise, index) => {
                promise.then(
                    value => {
                        values.push({value, index})
                        if (values.length === promises.length) {
                            resolve(
                                values
                                    .sort((a, b) => a.index - b.index)
                                    .map(item => item.value)
                            )
                        }
                    },
                    reason => {
                        reject(reason)
                    })
            })
        })
    }

    static race(promises) {
        return new HD((resolve, reject) => {
            promises.map(promise => {
                promise.then(
                    value => {
                        resolve(value)
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }
}

/*new HD((resolve, reject) => {
    setTimeout(() => {
        // resolve("解决")
        reject('拒绝')
    }, 2000)
}).then(res => {
    console.log(res)
    return new HD((resolve, reject) => {
        setTimeout(() => {
            resolve('李逸飞')
        }, 1000)
    })
}, err => {
    console.log(err)
    return new HD((resolve, reject) => {
        setTimeout(() => {
            resolve('失败 fail')
        }, 1000)
    })
}).then(res => {
    console.log(res)
}, err => {
    console.log(err)
})*/

/*
let p = HD.resolve("李逸飞").then(res => {
    return res
})

HD.reject(p).then(res => {
    console.log(res)
}, err => {
    console.log(err)
})
*/

/*let p1 = new HD((resolve, reject) => {
    setTimeout(() => {
        resolve('0 success 2000')
    }, 2000)

})

let p2 = new HD((resolve, reject) => {
    setTimeout(() => {
        resolve('1 success 500')
    }, 500)
})

let p3 = new HD((resolve, reject) => {
    setTimeout(() => {
        resolve('2 success 1000')
    }, 1000)
})

HD.all([p1, p2, p3]).then(res => {
    console.log(res)
}, err => {
    console.log(err)
})*/

/*let p1 = new HD((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 2000)
})

let p2 = new HD((resolve, reject) => {
    setTimeout(() => {
        resolve('failed')
    }, 1000)
})

HD.race([p1, p2]).then(res => {
    console.log(res)
}, err => {
    console.log(err)
})*/
