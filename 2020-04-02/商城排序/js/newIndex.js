// 通过操作数据的方式
// 通过自执行函数建立闭包保护代码
let shopModule = (function shopModule () {
    // 获取需要的DOM元素
    // 按照class名获取元素，切记加.
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),//需要操作的点击列表
        productBox = document.querySelector('.productBox'),// 产品数据盒子
        data = null;// 产品数据

    // 从服务器获取数据
    // 将此方法封装成一个函数queryData
    let queryData = function queryData() {
        // 创建XNLHttpRequest对象
        let xhr = new XMLHttpRequest;
        // 配置请求信息 open(),get
        xhr.open('GET', './json/product.json', false);
        // 注册回调函数
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        // 发送请求
        xhr.send(null);
    };
    // 根据获取的数据，把产品信息渲染到页面中
    // 将次渲染的方法封装为一个render函数
    let render = function render() {
        // 申明str来储存每个card中的内容
        let str = ``;
        // 通过遍历获取到的产品数据data来拼接str
        data.forEach(item =>{
        // 将从JSON中获取的数据逐一对应
            let {
                title,
                price,
                time,
                hot,
                img
            } = item;
            // 根据页面中的样式加入html标签进行拼接，${value}=> key对应的value
            // ${time}.replace(/-/g,'/')
            str += `
            <div class="card">
				<img src="${img}" class="card-img-top" alt="">
				<div class="card-body">
					<h5 class="card-title">${title}</h5>
					<p class="card-text">价格：￥${price.toFixed(2)}</p>
					<p class="card-text">销量：${hot}</p>
					<p class="card-text">时间：${time.replace(/-/g,'/')}</p>
				</div>
			</div>
            `;
        });
        // 将拼接好的字符串渲染到页面中
        productBox.innerHTML = str;
    }
    
    // 循环所有的li，给每个li添加绑定事件
    // 初始化每个li的标识值
    let clear = function clear() {
        // 遍历navList的每一项，让非当前项的flag初始为-1
        Array.from(navList).forEach(item =>{
            item !== this ? item.flag = -1 : null;
        });
    };
    // 每次点击不同的li，执行不同的操作
    let handle = function handle() {
    // 遍历li的每一项，并给其绑定点击事件
        Array.from(navList).forEach(item =>{
    // 给每一项都设置一个升降序标识flag
            item.flag = -1;
            item.onclick = function () {//绑定点击事件
    // 点击当前li，按照当前维度排序，并让其他维度的升降序标识初始化
                clear.call(this);
    // 不论点击哪一个li，进来的第一步都是把当前的li的升降序标识乘以-1，从而实现升降序的切换
                this.flag *= -1;
    // 在结构中把每一个li的排序标识字段设置自定义属性，点击是获取其对应的排序字段
                let char= this.getAttribute('data-char');
                data.sort((a,b) =>{
    // sort排序，返回值为正升序，(a,b)=> a:下一项，b:当前项（return a - b;升序）
                    a = String(a[char]).replace(/-/g,'');
                    b= String(b[char]).replace(/-/g,'');
                    return (a-b) *this.flag;
                });
    // 执行完点击事件后，再次进行渲染
                render();
            } ;
        });
    };
    


    // 返回函数集，方便外部调用
    return {
        init() {//init: function () {...}
            queryData();
            render();
            handle();
        } 
    };
})();
shopModule.init();