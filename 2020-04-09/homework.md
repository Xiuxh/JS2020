## 珠峰培训正式课-阶段测试题
### 第一部分 以往做过的题目
#### 1.下面代码运行的结果？为什么/
+ 'number'
+ res = praseFloat ('left: 200px') => NaN
    NaN不等于200，也不等于NaN，typeof NaN === 'number'  => 输出结果为字符串'number'
#### 2.下面代码的运行结果
+ 'NaN北京珠峰培训nulltrue[object object]'  
//Number({}) => [object object]
#### 3.下面代码运行的结果
+ 12  13  12
#### 4.下面代码运行的结果
+ undefined  {n: 1, x: {n: 2}}
#### 5.下面代码运行的结果
+ 'string'
#### 6.下面代码运行的结果
+ '珠峰培训'  '珠峰培训'  undefined
#### 7.下面代码运行的结果
+ 11,6  13  10,6
#### 8.下面代码运行的结果
+ 9  10  10  1
#### 9.下面代码运行的结果
+ 13  234  95,234
#### 10.下面代码运行的结果
+ 21 1
//?
#### 11.下面代码的运行结果
+ undefined  0  1  1
#### 12.下面代码a在什么情况下会输出1
a ={
    i: 0,
    toString: function () {
        return ++this.i;}
}
或 a = [1,2,3]  a.toString = a.shift
#### 13.改造下面代码，使之输出0~9
for (var i = 0; i < 10; i++) {//=>13
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
将var改为let，每次判断执行都建立私有上下文，让每次输出的i都是私有上下文中私有的
#### 14.下面代码的输出结果是多少，为什么？如何改造一下，就能让其输出20 10？
+ 输出结果为 function b() {b = 20; console.log(b);}  10
+ 自执行函数中函数名只能调用不能修改，而函数中的b = 20 相当于修改函数名，不生效
+ 可以让b = 20改成var/let b = 20; 变成申明定义私有变量b，即可正常输出
#### 15.下面代码运行的结果
{
    0: 10,
    1: 20,
    length: 2,
    push: Array.prototype.push
}
#### 16.下面代码运行的结  果
+ '培训'  '珠峰'  '培训'
#### 17.下面代码运行的结果
+ 2  4  1  1  2  3  3
#### 18.下面代码运行的结果
+ "4"
#### 19.实现函数fn让其具有如下效果
    let fn = function (a,b) {
        return function (c) {
            return a + b + c;
        }; 
    }
    let res = fn(1,2)(3);
    console.log(res) 
#### 20.下面代码运行的结果
+ "Tomundefinedjoin"
#### 21.下面代码运行的结果
+ 1  undefined  function () {this.a = 3}  false  true  true
#### 22.重构内置new方法
```
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.bark = function () {
        console.log('wangwang');
    }
    Dog.prototype.sayName = function () {
        console.log('my name is ' + this.name);
    }
    function _new() {
        //=>完成你的代码
        let arr = Array.from(arguments).slice(1),
                obj = Object.create(Fn.prototype);
            let result = Fn.apply(obj, arr);
            if (result !== null && (typeof result === "object" || typeof result === "function")) {
                return result;
            }
            return obj;
    }
    let sanmao = _new(Dog, '三毛');
    sanmao.bark(); //=>"wangwang"
    sanmao.sayName(); //=>"my name is 三毛"
    console.log(sanmao instanceof Dog); //=>true
```
#### 23.实现如下要求
```
    let n = 10;
    Number.prototype.plus= function (a) {return this + a;};
    Number.prototype.minus = function (b) {return this - b;};
    let m = n.plus(10).minus(5);
    console.log(m);//=>15（10+10-5）
```
#### 24.实现如下要求
```
String.prototype.queryURLParams = function queryURLParams(item) {
            // 基于正则
            // let obj = {};
            // this.replace(/(#[^?#&=]+)/g, (_, group) => {
            //     obj['_HASH'] = group;
            // });
            // this.replace(/([^?#&=]+)=([^?#&=]+)/g, (_, key, value) => {
            //     obj[key] = value;
            // });
            // 基于字符串自身
            let obj = {},
                askIndex = this.indexOf('?'),
                polIndex = this.lastIndexOf('#');
            let askText = this.substring(askIndex + 1,polIndex),
                polText = this.substring(polIndex + 1);
            if (askText) {
                askText.split('&').forEach(cur => {
                    let arr = cur.split('=');
                    obj[arr[0]] = arr[1];
                    return obj;
                });
            }
            polText.length > 0 ? obj['_HASH'] = polText : null;
            return obj[item];
        };
```
#### 25.基于ES6中的class重构下面的代码
```
    class Model{
            constructor(x,y,n,setNumber) {
                this.x = x;
                this.y = y;
                n = 200;
                setNumber = function (n) {
                    this.n = n
                }
            }
            z = 10;
            getX() {
                console.log(this.x);
            }
            getY() {
                console.log(this.y);
            }
        }
        let n = new Model(10,20);
```

### 第二部分：综合练习题
#### 1.介绍下Set、Map、WeakSet和WeakMap的区别
Set：
+ 成员唯一、无序且不重复；
+ [value,value] 键值与键名是一致的（或者说只有键值，没有键名）；
+ 可以遍历，方法有add、delete、has、clear、enterries、forEach、keys、value；
+ Set也能用来保存NaN和undefined，如果有重复的NaN，Set会认为只有一个NaN;
Map：
+ 本质上是键值对的集合，类似集合；
+ 可以遍历，方法很多，可以喝各种数据格式转换
WeakSet：
+ 成员都是对象；
+ 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏；
+ 不能遍历，方法有add、delete、has
WeakMap：
+ 只接受对象作为键名（null除外），不接受其他类型的值作为键名；
+ 键名是弱引用，键值所指向的对象可以被垃圾回收，此时键名是无效的；
+ 不能遍历，方法有get、set、has、delete

#### 2.介绍下var、let、const的区别
+ var 
    - 在代码执行前存在变量提升；
    - 在申明变量的同时，会在GO中生成相应的变量并赋值；
+ let、const 
    - 在当前上下文中申明的变量如果被重复声明，会在词法解析时报错，当前剩下文代码君不被执行；
    - 在循环、判断等大括号中声明变量会形成块级作用域。形成的子级作用域下的变量都是私有变量；
    - 可以再typeof检测的变量后面进行申明，解决浏览器暂时性死区的bug
+ const：
    - const申明的基本数据类型的变量值不能进行修改、申明的引用数据类型的变量地址不能进行变更

#### 3.<script>放在页面头部以及尾部的区别？以及解决办法？
+ <script>在页面加载时是基于同步加载的，如果放在页面头部，在加载完JS代码之前，页面中的其他代码都不会被加载，且JS代码中对之后加载的页面样式进行操控的代码都不生效。
+ 解决方法：

#### 4.如何基于ES5/ES6实现类的继承，两种方式有什么区别
+ ES5 通过原型链实现继承，常见的继承方法是组合继承和寄生组合继承
+ 通过class来实现继承
区别：
+ ES5 ：先创造子类的实例对象、this, 然后再通过call 将父类方法添加到this上面
+ ES6：调用super方法 先创造父类的实例对象、this,然后再用子类的构造函数修改this
#### 5. 请说出 “箭头函数和普通函数“ 的区别？

#### 6. 请说出你对 “重排和重绘读写分离” 的理解！

#### 7. 请说出你对 “闭包” 的理解！

#### 8. 请说出你对 “面向对象” 的理解！

#### 9.下面代码的输出结果，为什么？
+ [1,NaN,NaN,NaN]
map方法执行，回调函数会自动传入三个参数：数组元素、元素索引、数组本身；
parseInt函数执行需要传两个参数，需要转换的字符串和解析数字的基数（该值介于2~36之间。如果省略改参数或其值为0，则数字将以10为基础来解析。如果它以"0x"或"0X"开头，，将以"16"为基数。如果该参数小于2或者大于36，则parseInt将返回NaN）
arr.map(parseInt); 相当于 arr.map((item,index) => parseInt(item,index))，输出的结果即为1,NaN,NaN,NaN]
#### 10.下面代码的输出结果？为什么？
#### 11.实现如下要求
//=>编写toType方法，实现数据类型检测
        function toType( obj ) {
        //完成你的代码
            let x = Object.prototype.toString.call(obj),
                reg = /\s+([a-z]+)/i;
            return reg.exec(x)[1].toLocaleLowerCase();
        }
        console.log(toType(1)); //=>"number"
        console.log(toType(NaN)); //=>"number"
        console.log(toType([])); //=>"array"
        console.log(toType(/^\d+$/)); //=>"regexp"
        console.log(toType({})); //=>"object"
#### 12.实现如下要求
    let arr = [];
    // for (let i = 0; i < arguments.length; i++) {
    //     arr[i] = arguments[i];
    // }
    Array.from(arguments).forEach(item => {
            // arr.push(item);
            arr.unshift(item);
        });
        arr = arr.reverse();  
    console.log(arr); 
#### 13.实现如下需求
    let xiu = {};
    xiu.name = 'Alibaba';
    this(arguments[1],arguments[2]);
    xiu.total = window.total;
    return xiu;

#### 14.
#### 15.对象(数组)的深克隆和浅克隆（头条)
+ 浅克隆：
    - 1.直接申明新变量，并将原数组赋值给该变量；
    - 2.利用Object.assign() 将空数组原始数组合并得到新数组；
    - 3.利用jQuery的extend方法，$.extend()将空数组与原数组合并（undefined）不参与合并；
+ 深克隆：
    - 1.利用for循环，将原始数组中的每一项根据索引顺序置于新数组中；
    - 2.利用for in循环，遍历原始数组，将其自身的每一项传赋值给新数组中对应的位置；
    - 3.利用数组的slice方法，从索引0开始截断，得到返回的新数组；
    - 4.利用数组的concat方法，将原始数组与空数组合并
    - 5.利用展开运算符进行传递赋值`[...arr2] = arr`，得到新数组arr2
    - 6.利用jQuery的extend方法，$.extend()将true与原始数组合并
#### 16.实现如下要求
