let carouselModule = (function () {
    // 获取需要操作的元素
    let mysteries = document.querySelector('.mysteries'),
        ul = document.querySelector('ul')
        leftBtn = document.querySelector('.leftBtn'),
        rightBtn = document.querySelector('.rightBtn'),
        points = document.querySelectorAll('.circle p'),
        start = 0,
        p = 0;
        timer = null;

    // 轮播图自动切换
    function turnRound() {
        timer = setInterval(() => {
            start -= 640;
            p >= 3 ? p = 0: p +=1;
            if (start < -2560) {
                start = 0;
                ul.style.transition = 'none';
                ul.style.transform = `translateX(${start}px)`;
                let i = ul.offsetWidth;
                start = -640;
                p = 1;
                ul.style.transition = 'all 0.3s';
            } else {
                ul.style.transition = 'all 0.3s'
            }
            ul.style.transform = `translateX(${start}px)`;
            changeColor();
        },2000);    
        // 滑过盒子 清除定时器
        mysteries.onmouseenter = function () {
            clearInterval(timer);
        }
        // 离开盒子 重启定时器
        mysteries.onmouseleave = function () {
            turnRound();
        }
    };
    turnRound();

    // 左右两边按钮
    let buttonHandle = function () {
        let minus = function () {
            start += 640;
            p <= 0? p = 3: p -= 1;
            if (start > 0) {
                start = -2560;
                ul.style.transition = '';
                ul.style.transform = `translateX(${start}px)`;
                let l = ul.offsetHeight;
                start = -1920;
                p = 3;
                ul.style.transition = 'all 0.3s';
            } else {
                ul.style.transition = 'all 0.3s';
            }
            ul.style.transform = `translateX(${start}px)`;
            changeColor();
        };
        let plus = function () {
            start -= 640;
            p >= 3 ? p = 0: p += 1 ;
            if (start < -2560) {
                start = 0;
                ul.style.transition = '';
                ul.style.transform = `translateX(${start}px)`;
                let l = ul.offsetHeight;
                start = -640;
                p = 0;
                ul.style.transition = 'all 0.3s';
            } else {
                ul.style.transition = 'all 0.3s';
            }
            ul.style.transform = `translateX(${start}px)`;
            changeColor();
        };
        leftBtn.onclick = minus;
        rightBtn.onclick = plus;
        return {minus,plus}
    };
    // 小图标变色
    let changeColor = function () {
        points.forEach((item,index) => {
            item.className = '';
        });
        points[p].className = 'choose';
    }

    // 点击小图标切换图片
    let turnImg = function () {
        points.forEach((item,index) => {
            item.onclick = function () {
                p = index;
                changeColor();
                start = -p * 640;
                ul.style.transition = 'all 0.3s';
                ul.style.transform = `translateX(${start}px)`;
            };
        })
    }; 

    return {
        init() {
            buttonHandle();
            turnImg();
        }
    }
})();
carouselModule.init();