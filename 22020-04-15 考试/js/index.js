let waterFallModule = (function () {
    let columns = Array.from(document.querySelectorAll('.column')),
        data = null;
    
    // 获取数据
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };
    // 绑定数据
    let bindHTML = function bindHTML() {
        data = data.map(item => {
            let h = item.height,
                w = item.width;
            item.height = h / (w / 230);
            return item;
        });
        // for (let i = 0; i < data.length; i += 3) {
            // let group = data.slice(i,i + 3);
            // group.sort((a,b) => a.height - b.height);
            // columns.sort((a,b) => b.offsetHeight - a.offsetHeight);
            // group.forEach((item,index) => {
            //     let card = document.createElement('div');
            //     card.className = "card";
            //     card.innerHTML = `
            //     <a href="${item.link}">
            //         <div class="lazyImageBox" style="height: ${item.height}px;">
            //             <img src="" alt="" data-image="${item.pic}">
            //         </div>
            //         <p>${item.title}</p>
            //     </a>`;
            //     columns[index].appendChild(card);
        // }); 
            // }
            data.forEach(item => {
                let str = `<div class="card">
                <a href="${item.link}">
                <div class="lazyImageBox" style="height: ${item.height}px;">
                    <img src="" alt="" data-image="${item.pic}">
                </div>
                <p>${item.title}</p>
            </a>
            </div>`;
            columns.sort((a,b) => a.offsetHeight -b.offsetHeight);
            columns[0].innerHTML += str;
            });
            
        
    };
    // 懒加载
    let lazyFunc = function lazyFunc() {
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        Array.from(lazyImageBoxs).forEach(item => {
            let isLoad = item.getAttribute('isLoad');
            if (isLoad === "true") return;
            let B = utils.offset(item).top + item.offsetHeight / 2,
                A = document.documentElement.clientHeight + document.documentElement.scrollTop;
            if (B <= A) {
                lazyImg(item);
            }
        }); 
    }
    let lazyImg = function lazyImg(x) {
        let img = x.querySelector('img'),
            dataImage = img.getAttribute('data-image'),
            tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = () => {
            img.src = dataImage;
            utils.css(img, 'opacity', 1);
        };
        img.removeAttribute('data-image');
        tempImage = null;
        x.setAttribute('isLoad', 'true');
    };
    
    //加载更多数据
    let isRender;
    let loadMore = function loadMore() {
        let HTML = document.documentElement;
        if (HTML.clientHeight * 3 / 2 + HTML.offsetTop >= bindHTML.scrollHeight) {
            if (isRender) return;
            isRender = true;
            queryData();
            bindHTML();
            lazyFunc();
            isRender = false;
        }
    }


    return {
        init() {
            queryData();
            bindHTML();
            lazyFunc();
            window.onscroll = () => {
                lazyFunc();
                loadMore();
            }
        }
    }
})();
waterFallModule.init()