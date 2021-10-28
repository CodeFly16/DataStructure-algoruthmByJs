// 具体步骤
// 1.用new Object() 的方式新建了一个对象 obj
// 2.取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
// 3.将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
// 4.使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
// 5.返回 obj , 如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么

function objectFactory() {
    let obj = {}
    let Constructor = [].shift.apply(arguments);
    obj.__proto__ = Constructor.prototype;
    let ret = Constructor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj;

}

function Otaku(name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}
var person = objectFactory(Otaku, 'Kevin', '18')
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60
person.sayYourName(); // I am Kevin
