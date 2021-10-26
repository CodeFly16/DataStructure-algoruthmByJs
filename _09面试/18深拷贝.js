const isObject = (target) => {
    return (typeof target === 'object' || typeof target === 'function') && target !== null;
}

// const deepClone = (target, map = new WeakMap) => {
//     if (map.get(target)) return target
//     if (isObject(target)) {
//         map.set(target, true)
//         const cloneTarget = Array.isArray(target) ? [] : {}
//         for (let key in target) {
//             if (target.hasOwnProperty(key))
//                 cloneTarget[key] = deepClone(target[key],map)
//         }
//         return cloneTarget
//
//     } else {
//         return target
//     }
// }

const deepClone = function (target, map = new WeakMap()) {
    if (map.get(target)) return target
    if (isObject(target)) {
        map.set(target, true)
        const cloneTarget = Array.isArray(target) ? [] : {}
        for (let key in target) {
            if (target.hasOwnProperty(key)) {
                cloneTarget[key] = deepClone(target[key], map)
            }
        }
        return cloneTarget
    } else {
        return target
    }
}

const a = {val: 2};
a.target = a;
let newA = deepClone(a);
console.log(newA)//{ val: 2, target: { val: 2, target: [Circular] } }
