//实现一个延时执行队列， 要求分别在 1,3,4 秒后打印出 "1", "2", “ 3"
class Queue {
    constructor(queue = []) {
        this.queue = queue
        this.index = 0
        this.timer = null
    }

    task(time, fn) {
        this.queue.push({fn: fn, time})
        return new Queue(this.queue)
    }

    start() {
        //递归执行
        if (this.index < this.queue.length) {
            this.timer = setTimeout(() => {
                this.queue[this.index].fn()
                this.index++
                this.start()
            }, this.queue[this.index].time)
        }
    }

    stop() {
        setTimeout(() => {
            clearTimeout(this.timer)
            this.timer = null
        })

    }
}

let q = new Queue()
q
    .task(1000, () => {
        console.log(1)
    })
    .task(2000, () => {
        console.log(2)
    })
    .task(1000, () => {
        console.log(3)
    })
    .start()

