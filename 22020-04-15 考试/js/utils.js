let utils = (function utils() {
    function getCss(element, attr) {
        let value = window.getComputedStyle(element)[attr],
            reg = /^\d?(px|rem|em)?$/i;
        reg.test(attr) ? value = parseFloat(value) : null;
        return value;
    }
    function setCss(element, attr, value) {
        if (attr === "opacity") {
            element['style']['opacity'] = value;
            element['style']['fileter'] = `alpha(${value*100})`;
            return;
        }
        let reg = /^(width|height|margin|padding)?(top|left|bottom|right)?$/i;
        if (reg.test(value)) {
            value = value += 'px';
        }
        return element['style'][attr] = value;
    }
    function setGroupCss(element, options) {
        for (let key in options) {
            if (!options.hasOwnProperty(key)) break;
            setCss(element, key, options[key]);
            return;
        }
    }
    function css(element) {
        let l = arguments.length,
            attr = arguments[1],
            value = arguments[2];
        if (l >= 3) {
            setCss(element, attr, value);
            return;
        }
        if (attr !== null && typeof attr === "object") {
            setGroupCss(element, attr);
            return;
        }
        getCss(element, attr);
    } 
    function offset(element) {
        let parent = element.offsetParent,
            left = element.offsetLeft,
            top = element.offsetTop;
        if (parent) {
            if (!/MSIE 8/.test(navigator.userAgent)) {
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

    return {
        css,
        offset
    }
})();