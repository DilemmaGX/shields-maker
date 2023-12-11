function g_url(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default") {
    var url = "https://img.shields.io/badge/";
    left += "-" || "";
    if (right != "") {
        url += left + right + "-" + color + "?style=" + style;
        if (logo != "") {
            url += "&logo=" + logo + "&logoColor=" + logoColor;
        }
        return url;
    }
}

function g_html(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link) {
    var url = g_url(left, right, color, style, logo, logoColor);
    var html;
    if (link !== "") {
        if (!RegExp("^https?:\/\/").test(link)) {
            link = "http://" + link;
        }
        html = '<a href="' + link + '"><img src="' + url + '"></a>';
    } else {
        html = "<img src=" + url + ">";
    }
    return html;
}

function g_md(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link) {
    var url = g_url(left, right, color, style, logo, logoColor);
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

function g_ad(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link) {
    var url = g_url(left, right, color, style, logo, logoColor);
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

function auto() {
    var logo = document.getElementById("logo").value;
    var left = document.getElementById("left").value;
    var right = document.getElementById("right").value;

    var style = document.getElementById("style").value;
    var logoColor = document.getElementById("logoColor").value;
    console.log(logoColor);
    var color = document.getElementById("color").value;
    var link = document.getElementById("link").value;

    var o_img = document.getElementById("o_img");
    var o_url = document.getElementById("o_url");
    var o_html = document.getElementById("o_html");
    var o_md = document.getElementById("o_md");
    var o_ad = document.getElementById("o_ad");

    if (color == "" || color == undefined) {
        color = "default";
    }
    if (logoColor == "" || logoColor == undefined) {
        logoColor = "default";
    }

    o_img.innerHTML = g_html(left, right, color, style, logo, logoColor, link)
    o_url.innerHTML = "<pre><code>" + g_url(left, right, color, style, logo, logoColor).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>"
    o_html.innerHTML = "<pre><code>" + g_html(left, right, color, style, logo, logoColor, link).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
    o_md.innerHTML = "<pre><code>" + g_md(left, right, color, style, logo, logoColor, link).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
    o_ad.innerHTML = "<pre><code>" + g_ad(left, right, color, style, logo, logoColor, link).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
}

function copy(id) {
    const element = document.getElementById(id);
    const textContent = element.textContent;
    navigator.clipboard.writeText(textContent)
    addSuccessAlertSuccess("<h4>Copy success!</h4><hr><p>" + textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</p>");
}

function addSuccessAlertSuccess(str) {
    const newAlertDiv = document.createElement('div');
    newAlertDiv.className = 'alert alert-success alert-dismissible fade show';
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