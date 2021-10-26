// //第一版
// function objectFactory1() {
//     let obj = new Object()
//     let Constructor = [].shift.call(arguments)
//     obj.__proto__ = Constructor.prototype
//     Constructor.apply(obj, arguments)
//     return obj
// }
//
// function Otaku(name, age) {
//     this.name = name;
//     this.age = age;
//
//     this.habit = 'Games';
// }
//
// Otaku.prototype.strength = 60;
// Otaku.prototype.sayYourName = function () {
//     console.log('I am ' + this.name);
// }
// var person = objectFactory1(Otaku, 'Kevin', '18')
// console.log(person.name) // Kevin
// console.log(person.habit) // Games
// console.log(person.strength) // 60
// person.sayYourName(); // I am Kevin
//
// //第二版
// function objectFactory2() {
//     var obj = new Object()//从Object.prototype上克隆一个对象
//
//     var Constructor = [].shift.call(arguments);//取得外部传入的构造器
//
//     var F = function () {
//     };
//     // F.prototype = Constructor.prototype;
//     obj = new F();//指向正确的原型
//
//     var ret = Constructor.apply(obj, arguments);//借用外部传入的构造器给obj设置属性
//
//     return typeof ret === 'object' ? ret : obj;//确保构造器总是返回一个对象
// }
//


Function.prototype.a = 'Function';
Object.prototype.a = 'Object';
function Person(){};
var child = new Person();
console.log(Person.a); // Object
console.log(Person.__proto__)
console.log(child.a);  //Object
console.log(child.__proto__.__proto__.constructor.constructor.constructor); //Funciton
