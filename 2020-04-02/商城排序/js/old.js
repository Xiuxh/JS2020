let shopModule = (function () {
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        productBox = document.querySelector('.productBox'),
        cardLixt = null,
        data = null;
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };
    // bindHTML 完成数据绑定
    let bindHtml = function bindHtml() {
        let str = ``;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let {
                title,
                price,
                time,
                hot,
                img
            } = item
            str += `
            <div class="card" data-price="${price}" data-time="${time}"
                data-hot="${hot}">
                <img src="${img}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">价格：￥${price.toFixed(2)}</p>
                    <p class="card-text">销量：${hot}</p>
                    <p class="card-text">时间：${time}</p>
                </div>
            </div>
            `;
        };
        productBox.innerHTML = str;
        cardList = productBox.querySelectorAll('.card');
    };

    let clear = function clear() {
        [].forEach.call(navList,item => {
            item !== this ? item.flag = -1 : null ;
        });
    };

    let sortCard = function sortCard(i) 
    {
        let arr = Array.from(cardList);
        let char = 'data-price';
        i === 1 ? char = 'data-time' : null ;
        i === 2 ? char = 'data-hot' : null;
        arr.sort((a,b) => {
            a = a.getAttribute(char);
            b = b.getAttribute(char);
            if (char === 'data-time') {
                a = a.replace(/-/g,'');
                b = b.replace(/-/g,'');
            }
            return (a - b) * this.flag
        });
        for (let k = 0; k < arr.length; k++) {
            productBox.appendChild(arr[k]);
        }
    }

    let handle = function handle() {
        [].forEach.call(navList,(item,index) => {
            item.flag = -1;
            item.onclick = function () {
                clear.call(this);
                this.flag *= -1;
                sortCard.call(this,index);
            } 
        });
    };

    return {
        init() {
            queryData();
            bindHtml();
            handle();
        }
    };
})();
shopModule.init();