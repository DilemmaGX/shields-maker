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

function g_html(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link = "http://") {
    var url = g_url(left, right, color, style, logo, logoColor);
    if (!RegExp("^https?:\/\/").test(link)) {
        link = "http://" + link;
    }
    var html;
    if (link !== undefined) {
        html = '<a href="' + link + '"><img src="' + url + '"></a>';
    } else {
        html = "<img src=" + url + ">";
    }
    return html;
}

function g_md(left = "", right, color = "default", style = "flat", logo = "", logoColor = "default", link = "http://") {
    var url = g_url(left, right, color, style, logo, logoColor);
    if (!RegExp("^https?:\/\/").test(link)) {
        link = "http://" + link;
    }
    var md;
    if (link !== undefined) {
        md = "[![](" + url + ")](" + link + ")";
    } else {
        md = "![](" + url + ")";
    }
    return md;
}

function auto() {
    var logo = document.getElementById("logo").value;
    var left = document.getElementById("left").value;
    var right = document.getElementById("right").value;

    var style = document.getElementById("style").value;
    var logoColor = document.getElementById("logoColor").value;
    var color = document.getElementById("color").value;
    var link = document.getElementById("link").value;

    var o_img = document.getElementById("o_img");
    var o_html = document.getElementById("o_html");
    var o_md = document.getElementById("o_md");

    if (color = "" || color == undefined) {
        color = "default";
    }
    if (logoColor = "" || logoColor == undefined) {
        logoColor = "default";
    }

    document.getElementById("o_img").innerHTML = g_html(left, right, color, style, logo, logoColor, link)
    document.getElementById("o_html").innerHTML = "<pre><code>" + g_html(left, right, color, style, logo, logoColor, link).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
    document.getElementById("o_md").innerHTML = "<pre><code>" + g_md(left, right, color, style, logo, logoColor, link).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</pre></code>";
}