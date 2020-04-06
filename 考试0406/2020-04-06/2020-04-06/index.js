let shopModule = (function () {
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        productBox = document.querySelector('.productBox'),
        data = null;

    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './2020-04-06/json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };

    let render = function render() {
        let str = ``;
        data.forEach(item => {
            let {
                title,
                price,
                time,
                hot,
                img
            } = item;
            str += `
            <div class="card">
                    <img src="./2020-04-06/${img}" alt="">
                    <h4>${title}</h4>
                    <p class="price">价格：${price.toFixed(2)}元</p>
                    <p class="hot">销量：${hot}件</p>
                    <p class="time">发售时间：${time.replace(/-/g,'/')}</p>
                </div>`;
        });
        productBox.innerHTML = str;
    }
 
    let clear = function clear() {
        Array.from(navList).forEach(item => {
            item !== this ? item.flag = -1 : null ;
        });
    };

    let handle = function handle() {
        Array.from(navList).forEach(item => {
            item.flag = -1;
            item.onclick = function () {
                clear.call(this);
                this.flag *= -1;
                let char = this.getAttribute('data-char');
                data.sort((a,b) => {
                    a = String(a[char]).replace(/-/g,'');
                    b = String(b[char]).replace(/-/g,'');
                    return (a - b) * this.flag 
                });
                render();
            };
            
        });
    }; 

    return {
        init() {
            queryData();
            render();
            handle();
        }
    }

})();
shopModule.init();