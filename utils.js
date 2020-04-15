/* 
    utils中包含以后可能会经常用的方法
*/
let utils = (function () {
    //获取页面中元素样式
    function getCss(element, attr) {
        let value = window.getComputedStyle(element)[attr],
            reg = /^\d+(px|rem|en)?$/i;
        reg.test(value) ? value = parseFloat(value) : null ;
        return value;
    }

    // 给页面中的某个元素设置样式
    function setCss(element, attr, value) {
        if (attr === "opacity") {
            element['style']['opacity'] = value;
            element['style']['filter'] = `alpha(opacity=${value*100})`;
            return;
        }
        let reg = /^(width|height|margin|padding)?(top|left|bottom|right?$)/i;
        if (reg.test(attr)) {
            !isNaN(value) ? value += 'px': null ;
        }
        element['style'][attr] = value;
    }

    // 给页面中的元素类设置css样式
    function setGroupCss(element, options) {
        for (let key in options) {
            if (!options.hasOwnProperty(key)) break;
            setCss(elemnet, key, options[key]);
        }
    }

    // 给页面元素设置CSS样式
    function css(element) {
        let len = arguments.length,
            attr = arguments[1],
            value = arguments[2];
        if (len >= 3) {
            //单一样式设置
            setCss(element, attr, value);
            return;
        }
        if (attr !== null && typeof attr === "object") {
            //批量设置
            setGroupCss(element, attr);
            return;
        }
        //获取样式
        return getCss(element, attr);
    }

    function offset(element) {
        let parent = element.offsetParent,
            top = element.offsetTop,
            left = element.offsetLeft;
        while (parent) {
            if(!/MSIE 8\.0/.test(navigator.userAgent)) {
                left += parent.clientLeft;
                top += parent.clientTop;
            }
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            left,
            top
        };
    }

    function formatTime(template) {
        let arr = this.match(/\d+/g).map(item =>{
            return item.length < 2 ? '0' + item : item ;
        });
        template = template || `{0}年{1}月{2}日 {3}时{4}分{5}秒`;
        return template.replace(/\{\(d+)\}/g,(_,group) => {
            return arr[group] || '00';
        });
    }

    function queryURLParams() {
        let obj = {};
        //哈希值的处理
        this.replace(/#[^?=#&]+/g, (_,group) => {
            obj['HASH'] = group;
        });
        // 问号后传递信息的处理
        this.replace(/([^?#=&]+)=([^?#=&]+)/g, (_,group1,group2) => {
            obj[group1] = group2;
        });
        return obj;
    }
    //千分符，针对整数
    function millimeter() {
        return this.repalce(/\d{1,3}(?=(\d{3})+$)/g, value => {
            return value + ',';
        });
    }

    return {
        css,
        offset,
        formatTime,
        queryURLParams,
        millimeter
    };
})();