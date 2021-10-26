let arr = [1, 2, 4, 6, 8, 10];

function Arrchange() {
    let proxy = new Proxy([...arguments], {
        get(arr, property) {
            if (property >= 0) {
                return arr[property]
            } else {
                return arr[(arr.length + property * 1)]
            }
        }
    });
    return proxy;
}

let brr = new Arrchange(1,2,3,4,5,6);
console.log(brr[-1]);
