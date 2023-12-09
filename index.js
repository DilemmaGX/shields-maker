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
    var leftText = document.getElementById('input-text').value || '';
    var rightText = document.getElementById('input-text-right').value || '';
    var textColor = rgbToHex(getComputedStyle(document.getElementById('input-color')).getPropertyValue("background-color")) || '';
    var url = document.getElementById('input-url').value || '';
    var logo = document.getElementById('input-logo').value || '';
    var logoColor = rgbToHex(getComputedStyle(document.getElementById('input-logo-color')).getPropertyValue("background-color")) || '';

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
            badgeUrl = badgeUrl + '?logo=' + logo;
        } else {
            badgeUrl = badgeUrl + '?logo=' + logo + '&logoColor=' + logoColor.replace(/[^a-zA-Z0-9]/g, '');
        }
    }

    var html = '<a href="' + url + '"><img src="' + badgeUrl + '" alt="' + leftText + ' - ' + rightText + '"></a>';
    var md = '![' + leftText + '](' + badgeUrl + ')';

    document.getElementById('result-html').innerHTML = html;
    if (url === '') {
        var html = '<a href="' + badgeUrl + '"><img src="' + badgeUrl + '" alt="' + leftText + ' - ' + rightText + '"></a>';
        document.getElementById('result-html').innerHTML = html;
        document.getElementById('result-md').innerHTML = md;
    } else {
        if (!/^https?:\/\//.test(url)) {
            url = "http://" + url;
        }
        var html = '<a href="' + url + '"><img src="' + badgeUrl + '" alt="' + leftText + ' - ' + rightText + '"></a>';
        document.getElementById('result-html').innerHTML = html;
        document.getElementById('result-md').innerHTML = "[" + md + "](" + url + ")";
    }
}

checkInput();
