var isPalindrome = function(x) {

    if(x<0) return false
    let str = x.toString()
    for(let i = 0,j = str.length - 1;i<=j;i++,j--){
        if(str[i] != str[j]) return false
    }
    return true
};
isPalindrome(10)


function isPrime(x){
    if(x <=2) return false
    let temp = Math.sqrt(x)
    for(let i = 2;i<=temp;i++){
        if(x%i === 0) return  false
    }
    return  true
}

console.log(isPrime(9));
