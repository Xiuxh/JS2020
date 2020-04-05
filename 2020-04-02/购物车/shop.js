let shopModule = (function () {
    // 获取要操作的元素
    let box = document.querySelector('.box'),
        data = null;
    // 构建数据模型（已建立JSON）
    // 获取JSON中的数据
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './shop.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    }; 
    // 渲染数据
    let render = function render() {
        let counts = 0,
            total = 0,
            priceArr = [];
        // 数据绑定
        let str = `<ul class = "list">`;
        data.forEach(item => {
            let {
                id,
                count,
                price
            } = item;
            counts += count;
            total += count *price;
            count > 0 ? priceArr.push(price) : null ;

            str += `
            <li>
				<i data-btn='minus' data-id='${id}'></i>
				<em>${count}</em>
				<i data-btn='plus' data-id='${id}'></i>
				<span>
					单价：<strong>${price}元 </strong> 
					小计：<strong>${count*price}元</strong>
				</span>
			</li>
            `
        });
        str += `</ul>`;
        str += `
        <div class="info">
			<span>商品公合计：<em>${counts}</em>件</span>
			<span>共花费了：<em>${total}</em>元</span>
			<br />
			<br />
			<span>其中最贵的商品单价是：<em>${Math.max(...priceArr)}</em>元</span>
		</div>`;
        box.innerHTML = str;
    
        // 每一次页面按照数据重新渲染完，都获取所有的+/-标签，绑定点击事件
        handle();
    };
    // 事件绑定
    let handle = function handle() {
        let btns = Array.from(box.querySelectorAll('i'));
        btns.forEach(item => {
            item.onclick = function () {
                //每一次点击，我们需要明确：加还是减？哪一行，对应哪个数据？
                let btn = this.getAttribute('data-btn'),
                id = parseInt(this.getAttribute('data-id'));
                data = data.map(cur => {
                    if (cur.id === id) {
                        if (btn === 'minus') {
                            cur.count--;
                            cur.count < 0 ? cur.count = 0 : null ; 
                        } else {
                            cur.count++
                        }
                    }
                    return cur;
                });
                render();
            };
        });
    };
    return {
        init() {
            queryData();
            render();
        }
    };
})();
shopModule.init();