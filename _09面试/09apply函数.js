Function.prototype.apply1 = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}


function call(context) {
    var context = context || window
    context.fn = this
    var result = context.fn(...[...arguments].slice(1))
    delete context.fn
    return result
}

function apply(context) {
    var context = context || window
    context.fn = this
    var result
    if (!arguments[1]) {
        result = context.fn()
    } else {
        result = context.fn(...arguments[1])
    }
    delete context.fn
    return result
}

function bind(context){
    var context = context || window
    var args = [...arguments].slice(1)
    const _this = this
    return function (){
        _this.apply(context,args.concat(...arguments))
    }
}
