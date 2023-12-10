function rgbToHex(rgb) {
    // 将RGB格式的颜色值拆分为红色、绿色和蓝色的相应部分。
    const [r, g, b] = rgb.match(/\d+/g);

    // 将每个部分的整数值转换为两位的十六进制值。
    const rHex = parseInt(r).toString(16).padStart(2, '0');
    const gHex = parseInt(g).toString(16).padStart(2, '0');
    const bHex = parseInt(b).toString(16).padStart(2, '0');

    // 将三个部分的十六进制值合并为一个HEX格式的颜色值。
    const hexColor = `#${rHex}${gHex}${bHex}`;

    return hexColor;
}

function copyText(id) {
    var text = document.getElementById(id).innerText;
    var input = document.getElementById("copy-cache");
    input.value = text; // 修改文本框的内容
    input.select(); // 选中文本
    document.execCommand("copy"); // 执行浏览器复制命令
}

function replaceSingleDash(str) {
    return str.replace(/(?<!-)-(?!-)/g, "--");
}

function escapeHtml(html) {
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function checkInput() {
    var input = document.getElementById("input-text-right");
    var button = document.getElementById("g_button");

    if (input.value === "") {
        button.classList.add("disabled");
        button.innerHTML = "Required right text";
    } else {
        button.classList.remove("disabled");
        button.innerHTML = "Generate Badge";
    }
}

function generateBadge() {
    var leftText = replaceSingleDash(document.getElementById('input-text').value) || '';
    var rightText = replaceSingleDash(document.getElementById('input-text-right').value) || '';
    var textColor = rgbToHex(getComputedStyle(document.getElementById('input-color')).getPropertyValue("background-color")) || '';
    var url = document.getElementById('input-url').value || '';
    var logo = document.getElementById('input-logo').value || '';
    var logoColor = rgbToHex(getComputedStyle(document.getElementById('input-logo-color')).getPropertyValue("background-color")) || '';
    var style = document.getElementById('styleSelect').value;

    // 如果rightText为空，则不执行任何操作    
    if (rightText === '') {
        return;  // 点击按钮后什么也不干  
    }

    // 如果leftText为空，则直接使用rightText生成URL    
    if (leftText === '') {
        var badgeUrl = 'https://img.shields.io/badge/' + encodeURIComponent(rightText) + '-' + textColor.replace(/[^a-zA-Z0-9]/g, '');
    } else {
        var badgeUrl = 'https://img.shields.io/badge/' + encodeURIComponent(leftText) + '-' + encodeURIComponent(rightText) + '-' + textColor.replace(/[^a-zA-Z0-9]/g, '');
    }

    if (logo != '') {
        if (logoColor === '') {
            badgeUrl = badgeUrl + '?style=' + style + '&logo=' + logo;
        } else {
            badgeUrl = badgeUrl + '?style=' + style + '&logo=' + logo + '&logoColor=' + logoColor.replace(/[^a-zA-Z0-9]/g, '');
        }
    } else {
        badgeUrl = badgeUrl + '?style=' + style;
    }

    var html = '<a href="' + url + '"><img src="' + badgeUrl + '" alt="' + leftText + ' - ' + rightText + '"></a>';
    var md = '![' + leftText + '](' + badgeUrl + ')';

    document.getElementById('result-html').innerHTML = html;
    if (url === '') {
        html = '<a href="' + badgeUrl + '"><img src="' + badgeUrl + '" alt="' + leftText + ' - ' + rightText + '"></a>';
        document.getElementById('result-html').innerHTML = html;
        document.getElementById('result-pure').innerText = html;
        document.getElementById('result-md').innerHTML = md;
    } else {
        if (!/^https?:\/\//.test(url)) {
            url = "http://" + url;
        }
        html = '<a href="' + url + '"><img src="' + badgeUrl + '" alt="' + leftText + ' - ' + rightText + '"></a>';
        document.getElementById('result-html').innerHTML = html;
        document.getElementById('result-pure').innerText = html;
        document.getElementById('result-md').innerText = "[" + md + "](" + url + ")";
    }
}

checkInput();
