function isObject(target) {
    return (typeof target === 'object' || typeof target === 'function') && target !== null;
}

function deepClone(obj, map = new WeakMap()) {
    if (map.get(obj)) return obj
    if (isObject(obj)) {
        map.set(obj, true)
        const cloneObj = Array.isArray(obj) ? [] : {};
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) cloneObj[prop] = deepClone(obj[prop], map);
        }
        return cloneObj
    } else {
        return obj
    }
}

const a = {val: 2};
a.target = a;
let newA = deepClone(a);
console.log(newA)

