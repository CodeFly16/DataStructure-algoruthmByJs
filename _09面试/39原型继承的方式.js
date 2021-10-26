//01组合继承
// function superType(name) {
//     this.name = name
// }
//
// function subType(name, age) {
//     // 继承属性
//     superType.call(this, name)
//     this.age = age
// }
//
// // 继承方法
// subType.prototype = new superType()
// subType.prototype.constructor = subType;


//02原型式继承
// let person = {
//     name: "Nicholas",
//     friends: ["Shelby", "Court", "Van"]
// };
//
// let anotherPerson = Object.create(person);
// anotherPerson.name = "Greg";
// anotherPerson.friends.push("Rob");
//
// let yetAnotherPerson = Object.create(person);
// yetAnotherPerson.name = "Linda";
// yetAnotherPerson.friends.push("Barbie");

//03寄生组合式继承
// function inheritPrototype(subType, superType) {
//     let prototype = Object.create(superType.prototype)
//     prototype.constructor = subType
//     subType.prototype = prototype
// }
//
// function superType(name) {
//     this.name = name;
//     this.colors = ["red", "blue", "green"];
// }
//
// function subType(name, age) {
//     superType.call(this, name)
//     this.age = age
// }
//
// inheritPrototype(subType, superType)
//
// var instance1 = new subType("xyc", 23);
// var instance2 = new subType("lxy", 23);
//
// instance1.colors.push("2"); // ["red", "blue", "green", "2"]
// instance2.colors.push("3"); // ["red", "blue", "green", "3"]
// console.log(instance1.colors)
// console.log(instance2.colors)


