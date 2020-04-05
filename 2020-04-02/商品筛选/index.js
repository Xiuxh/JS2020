let shopModule = (function () {
    let chooseBox = document.querySelector('#choose'),
        typeBox = document.querySelector('#type'),
        links = null;

    // 构建数据模型
    let chooseData = [{
        typeId: 1,
        name: '华为'
    }]; 
    let typeData = [{
        id: 1,
        name: '品牌',
        content: ['苹果','华为','小米','锤子','魅族','三星','OPPO']
    },{
        id: 2,
		name: '尺寸',
		content: ["3.0英寸以下", "3.0-3.9英寸", "4.0-4.5英寸", "4.6-4.9英寸", "5.0-5.5英寸", "6.0英寸以上"]
    },{
        id: 3,
		name: '系统',
		content: ["安卓 ( Android )", "苹果 ( IOS )", "微软 ( WindowsPhone )", "其他"]
    },{
        id: 4,
		name: '网络',
		content: ["联通3G", "双卡单4G", "双卡双4G", "联通4G", "电信4G", "移动4G"]
    }];

    // 渲染数据
    let chooseRender = function chooseRender() {// 选择栏渲染
        let str = ``;
        str += `你的选择：`;
        // 渲染前先照typeId排序
        chooseData.sort((a,b) => a.typeId - b.typeId).forEach(item => {
            str += `
             <mark>
             ${item.name}
             <a herf="javascript:;" data-id='${item.typeId}'>x</a>
             </mark> `;
        });
        chooseBox.innerHTML = str;
        handleClose();
    };
    
    
    // 每一次重选渲染了选中数据后，我们获取当前选中区域的a，点击实现一处操作
    
    

    let typeRender = function typeRender() {
        let str = ``;
        typeData.forEach(item => {
            let {
                id,
                name,
                content
            } = item
            str += `<li>`; 
            str += `${name}: `;
            content.forEach(cur =>{
                str += `
                <a href="javascript:;" data-id='${id}'>
					${cur}
				</a>`;
            });
            str += `</li>`
        });
        typeBox.innerHTML = str;

        // 绑定完后获取所有A标签
        links = typeBox.querySelectorAll('a');
    } ;

    // 类别中所有A的点击事件
    let handleLinks = function () {
        [].forEach.call(links,item => {
            item.onclick = function () {
            // 给choose-data新增的每一项数据
                let obj = {
                    typeId: parseInt(this.getAttribute('data-id')),
                    name: this.
                    innerText.trim()
            // trim：移除头尾空格
                };
                // 校检：每一个类别中只能保留一个（在新增之前，把原始数据和新增数据type-id相同的一项移除）
                chooseData = chooseData.filter(item => {
                    return item.typeId !== obj.typeId;
                });
                chooseData.push(obj);
                chooseRender();
            };
        });
    }; 

    // 关闭按钮的点击事件
    let handleClose = function handleClose() {
        let closeBtns = chooseBox.querySelectorAll('a');
        [].forEach.call(closeBtns,item => {
            item.onclick = function () {
                let typeId = parseInt(this.getAttribute('data-id'));
                chooseData = chooseData.filter(cur => cur.typeId !== typeId);
                chooseRender()
            };
        });
    };

    return {
        init() {
            chooseRender();
            typeRender();
            handleLinks();
        }
    }
})();
shopModule.init();