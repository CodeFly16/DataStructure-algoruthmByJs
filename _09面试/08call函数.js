Function.prototype.call2 = function (context) {
    var context = context || window
    var args = []
    for (let i = 1; i < arguments.length; i++) {
        args.push(i)
    }
    context.fn = this
    var result = eval('context.fn(' + args + ')')
    context.fn()
    delete context.fn
    return result

}

// 测试一下
var value = 2;
var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2
console.log(bar.call2(obj, 'kevin', 18));
