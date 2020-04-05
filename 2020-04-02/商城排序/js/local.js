// 获取页面中需要操作的DOM元素
let navList = document.querySelectorAll('.navbar-nav.nav-item'),
    productBox = document.querySelector('.productBox'),
    cardList = productBox.querySelectorAll('.card'),
    dataPrice = productBox.getElementsByClassName('price'),
    dataNum = productBox.querySelectorAll('.num'),
	dataTime = productBox.querySelectorAll('.time'),
	arr = [];

    console.log(dataPrice[0].innerText.slice(4),dataTime[0].innerText,dataNum[0].innerText);
// 使用自执行函数形成闭包
let shopModule = (function () {
    let clear = function clear() {
		// this : 当前点击的这个LI
		[].forEach.call(navList, item => {
			if (item !== this) {
				item.flag = -1;
			}
		});
    };

    // sortCard：排序
	let sortCard = function sortCard(i) {
		// this : 当前点击的这个LI
		let arr = Array.from(cardList);
		let char = dataPrice[i].innerText;
		i === 1 ? char = dataTime : null;
		i === 2 ? char = 'data-hot' : null;
		arr.sort((a, b) => {
			a = a.getAttribute(char);
			b = b.getAttribute(char);
			if (char === 'data-time') {
				a = a.replace(/-/g, '');
				b = b.replace(/-/g, '');
			}
			return (a - b) * this.flag;
		});
		for (let j = 0; j < arr.length; j++) {
			productBox.appendChild(arr[j]);
		}
	};
    // handleNav：按钮的循环事件绑定
	let handleNav = function handleNav() {
		[].forEach.call(navList, (item, index) => {
			item.flag = -1;
			item.onclick = function () {
				// this : 当前点击的这个LI
				clear.call(this);
				this.flag *= -1;
				sortCard.call(this, index);
			};
		});
	};

	return {
		init() {
			handleNav();
		}
	};
    
})();
shopModule.init();