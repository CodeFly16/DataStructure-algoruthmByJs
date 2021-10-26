//原型链继承
// function SuperType() {
//     this.property = true
// }
//
// SuperType.prototype.getSuperValue = function () {
//     return this.property
// }
//
// function SubType() {
//     this.subproperty = false;
// }
//
// SubType.prototype = {
//     getSubValue: function () {
//         return this.subproperty
//     }
// }
//
// SubType.prototype = new SuperType()
//
// let instance = new SubType()
// // console.log(instance.getSuperValue());
// console.log(instance.getSubValue())

//借助构造函数继承
// function SuperType() {
//     this.color = ["red", "green", "blue"];
// }
//
// function SubType() {
//     //继承自SuperType
//     SuperType.call(this);
// }
//
// let instance1 = new SubType();
// instance1.color.push("black");
// console.log(instance1.color)//"red,green,blue,black"
//
// let instance2 = new SubType();
// console.log(instance2.color)//"red,green,blue"

//组合继承
// function SuperType(name) {
//     this.name = name;
//     this.colors = ["red", "blue", "green"];
// }
//
// SuperType.prototype.sayName = function () {
//     console.log(this.name)
// };
//
// function SubType(name, age) {
//     // 继承属性
//     // 第二次调用SuperType()
//     SuperType.call(this, name);
//     this.age = age;
// }
//
// // 继承方法
// // 构建原型链
// // 第一次调用SuperType()
// SubType.prototype = new SuperType()
// // 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
// SubType.prototype.constructor = SubType
// SubType.prototype.sayAge = function () {
//     console.log(this.age)
// }
// let instance1 = new SubType("Nicholas", 29);
// instance1.colors.push("black");
// console.log(instance1.colors);//"red,blue,green,black"
// instance1.sayName(); //"Nicholas";
// instance1.sayAge(); //29
//
// let instance2 = new SubType("Greg", 27);
// console.log(instance2.colors) //"red,blue,green"
// instance2.sayName(); //"Greg";
// instance2.sayAge(); //27

//寄生组合式继承
// function inheritPrototype(subType, superType) {
//     let prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
//     prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
//     subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
// }
//
// // 父类初始化实例属性和原型属性
// function SuperType(name) {
//     this.name = name;
//     this.colors = ["red", "blue", "green"];
// }
//
// SuperType.prototype.sayName = function () {
//     console.log(this.name)
// };
//
// // 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
// function SubType(name, age) {
//     SuperType.call(this, name);
//     this.age = age;
// }
//
// // 将父类原型指向子类
// inheritPrototype(SubType, SuperType);
//
// // 新增子类原型属性
// SubType.prototype.sayAge = function () {
//     alert(this.age);
// }
//
// var instance1 = new SubType("xyc", 23);
// var instance2 = new SubType("lxy", 23);
//
// instance1.colors.push("2"); // ["red", "blue", "green", "2"]
// instance2.colors.push("3"); // ["red", "blue", "green", "3"]
//
// console.log(instance1.colors)
// console.log(instance2.colors)

//混入方式继承
// function MyClass() {
//     SuperClass.call(this);
//     OtherSuperClass.call(this);
// }
//
// // 继承一个类
// MyClass.prototype = Object.create(SuperClass.prototype);
// // 混合其它
// Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// // 重新指定constructor
// MyClass.prototype.constructor = MyClass;
//
// MyClass.prototype.myMethod = function () {
//     // do something
// };

//extends继承
class Rectangle {
    // constructor
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    // Getter
    get area() {
        return this.calcArea()
    }

    // Method
    calcArea() {
        return this.height * this.width;
    }
}

const rectangle = new Rectangle(10, 20);
console.log(rectangle.area);
// 输出 200
// 继承
class Square extends Rectangle {

    constructor(length) {
        super(length, length);
        // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
        this.name = 'Square';
    }

    get area() {
        return this.height * this.width;
    }
}

const square = new Square(10);
// console.log(Square.__proto__)
// console.log(Square.prototype.__proto__)
// console.log(square.area);
// console.log(square.constructor)

console.log([1,1,2].slice(0,2))
