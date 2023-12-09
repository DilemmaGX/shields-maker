function generateBadge() {
    var leftText = document.getElementById('input-text').value || '';
    var rightText = document.getElementById('input-text-right').value || '';
    var textColor = document.getElementById('input-color').value || 'default';
    var url = document.getElementById('input-url').value || '';
    var logo = document.getElementById('input-logo').value || '';
    var logoColor = document.getElementById('input-logo-color').value || '';

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
            badgeUrl = badgeUrl + '?logo=' + logo + '&logoColor=' + logoColor;
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
