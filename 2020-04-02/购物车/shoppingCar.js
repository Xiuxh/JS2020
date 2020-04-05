// 获取需要操作的DOM元素
let liList = document.querySelectorAll('.wrap.li'),
    btnLeft = document.querySelectorAll('.btn-l'),
    numberList = document.querySelectorAll('.wrap.list em')
    btnRight = document.querySelectorAll('.btn-r'),
    sumList = document.querySelectorAll('.info em'),
    letter = 0,
    price = 0,
    arr = [],
    ary = [];
    //给每个li加上三个隐藏属性，unit,number，total
for (let i = 0; i < liList.length; i++) {
    liList[i].unit = Number(document.getElementsByTagName('strong')[i*2].innerHTML); 
    // console.log(unit);
    liList[i].number = 0;
    liList[i].number = 0;
}
// 利用自执行函数形成闭包
let shopSum = (function () {
    // 增加单件数量
    let numberUp = ()=> {
        for (let i = 0; i < btnRight.length; i++) {
            btnRight[i].onclick = () => {
                liList[i].number++;
                numberList[i].innerText = liList[i].number;
                liList[i]
            }
        }
    }
    

})()