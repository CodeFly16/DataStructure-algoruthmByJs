function jsonStringify(obj) {
    let type = typeof obj
    if (type !== 'object') {
        if (/string|undefine|function/.test(obj)) {
            obj = '"' + obj + '"'
        }
        return obj
    } else {
        let json = []
        let arr = Array.isArray(obj)
        for (let k in obj) {
            let v = obj[k];
            let type = typeof v;
            if (/string|undefined|function/.test(type)) {
                v = '"' + v + '"';
            } else if (type === "object") {
                v = jsonStringify(v);
            }
            json.push((arr ? "" : '"' + k + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
}

console.log(jsonStringify({x: 5})); // "{"x":5}"
console.log(jsonStringify([1, "false", false,{a:'b'}])); // "[1,"false",false]"
console.log(jsonStringify({b: undefined})); // "{"b":"undefined"}"

function jsonParse(opt) {
    return eval('(' + opt + ')');
}

console.log(jsonParse(jsonStringify({x: 5})));
// Object { x: 5}
console.log(jsonParse(jsonStringify([1, "false", false])));
// [1, "false", falsr]
console.log(jsonParse(jsonStringify({b: undefined})));
