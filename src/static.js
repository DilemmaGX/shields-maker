function g_url(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", source = "default") {
    var url = "https://custom-icon-badges.demolab.com/badge/";
    left += "-" || "";
    if (right != "") {
        url += left + right + "-" + color + "?style=" + style;
        if (logo != "") {
            url += "&logo=" + logo + "&logoColor=" + logoColor;
        }
        if (source != "default") {
            return url + "&logoSource=" + source;
        } else {
            return url;
        }
    }
}

function g_html(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link, source = "default") {
    var url = g_url(left, right, color, style, logo, logoColor, source);
    var html;
    if (link !== "") {
        if (!RegExp("^https?:\/\/").test(link)) {
            link = "http://" + link;
        }
        html = '<a href="' + link + '"><img src="' + url + '"></a>';
    } else {
        html = '<img src="' + url + '">';
    }
    return html;
}

function g_md(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link, source = "default") {
    var url = g_url(left, right, color, style, logo, logoColor, source);
    var md;
    if (link !== "") {
        if (!RegExp("^https?:\/\/").test(link)) {
            link = "http://" + link;
        }
        md = "[![](" + url + ")](" + link + ")";
    } else {
        md = "![](" + url + ")";
    }
    return md;
}

function g_ad(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link, source = "default") {
    var url = g_url(left, right, color, style, logo, logoColor, source);
    var ad;
    if (link !== "") {
        if (!RegExp("^https?:\/\/").test(link)) {
            link = "http://" + link;
        }
        ad = link + "[image:" + url + "[Static Badge]]";
    } else {
        ad = "image:" + url + "[Static Badge]";
    }
    return ad;
}

function g_rst(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link, source = "default") {
    var url = g_url(left, right, color, style, logo, logoColor, source);
    var rst;
    if (link !== "") {
        if (!RegExp("^https?:\/\/").test(link)) {
            link = "http://" + link;
        }
        rst = ".. image:: " + url + "\n   :target: " + link;
    } else {
        rst = ".. image:: " + url;
    }
    return rst;
}

function g_bbc(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link, source = "default") {
    var url = g_url(left, right, color, style, logo, logoColor, source);
    var rst;
    if (link !== "") {
        if (!RegExp("^https?:\/\/").test(link)) {
            link = "http://" + link;
        }
        rst = "[url=" + link + "][img]" + url + "[/img][/url]";
    } else {
        rst = "[img]" + url + "[/img]";
    }
    return rst;
}

function auto() {
    var logo = document.getElementById("logo").value;
    var left = document.getElementById("left").value;
    var right = document.getElementById("right").value;

    var style = document.getElementById("style").value;
    var logoColor = document.getElementById("logoColor").value;
    console.log(logoColor);
    var color = document.getElementById("color").value;
    var link = document.getElementById("link").value;
    var source = document.getElementById("source").value;

    var o_img = document.getElementById("o_img");
    var o_url = document.getElementById("o_url");
    var o_html = document.getElementById("o_html");
    var o_md = document.getElementById("o_md");
    var o_ad = document.getElementById("o_ad");
    var o_rst = document.getElementById("o_rst");
    var o_bbc = document.getElementById("o_bbc");

    left = left.replace(/[-_]/g, m => m === '-' ? '--' : '__').replace(/\s/g, '_');
    right = right.replace(/[-_]/g, m => m === '-' ? '--' : '__').replace(/\s/g, '_');

    if (color == "" || color == undefined) {
        color = "default";
    }
    if (logoColor == "" || logoColor == undefined) {
        logoColor = "default";
    }

    o_img.innerHTML = g_html(left, right, color, style, logo, logoColor, link, source);
    o_url.innerHTML = "<pre><code style=\"white-space: pre-wrap;word-wrap: break-word;\">" + g_url(left, right, color, style, logo, logoColor, source).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
    o_html.innerHTML = "<pre><code style=\"white-space: pre-wrap;word-wrap: break-word;\">" + g_html(left, right, color, style, logo, logoColor, link, source).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
    o_md.innerHTML = "<pre><code style=\"white-space: pre-wrap;word-wrap: break-word;\">" + g_md(left, right, color, style, logo, logoColor, link, source).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
    o_ad.innerHTML = "<pre><code style=\"white-space: pre-wrap;word-wrap: break-word;\">" + g_ad(left, right, color, style, logo, logoColor, link, source).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
    o_rst.innerHTML = "<pre><code style=\"white-space: pre-wrap;word-wrap: break-word;\">" + g_rst(left, right, color, style, logo, logoColor, link, source).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
    o_bbc.innerHTML = "<pre><code style=\"white-space: pre-wrap;word-wrap: break-word;\">" + g_bbc(left, right, color, style, logo, logoColor, link, source).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
}

function copy(id) {
    const element = document.getElementById(id);
    const textContent = element.textContent;
    navigator.clipboard.writeText(textContent)
    addSuccessAlertSuccess("<h4>Copy success!</h4><hr><p>" + textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</p>");
}

function addSuccessAlertSuccess(str) {
    const newAlertDiv = document.createElement('div');
    newAlertDiv.className = 'alert alert-success alert-dismissible';
    newAlertDiv.role = 'alert';
    const svgIcon = document.createElement('svg');
    svgIcon.className = 'bi flex-shrink-0 me-2';
    svgIcon.role = 'img';
    svgIcon.ariaLabel = 'Success:';
    const useElement = document.createElement('use');
    useElement.setAttribute('xlink:href', '#check-circle-fill');
    svgIcon.appendChild(useElement);
    newAlertDiv.appendChild(svgIcon);
    newAlertDiv.innerHTML = str;
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.dataset.bsDismiss = 'alert';
    closeButton.ariaLabel = 'Close';
    newAlertDiv.appendChild(closeButton);
    const alertsContainer = document.getElementById('alerts');
    while (alertsContainer.firstChild) {
        alertsContainer.removeChild(alertsContainer.firstChild);
    }
    alertsContainer.appendChild(newAlertDiv);
}