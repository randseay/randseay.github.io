(function () {
    function PageError(message, source, lineno, colno, error) {
        this.message = message;
        this.source = source;
        this.lineno = lineno;
        this.colno = colno;
        this.error = error;
    }

    var pageErrors = [];

    function renderPageErrorLink(errors) {
        var jsDebug = document.getElementById("jsDebug");
        var jsDebugStyle = "position:fixed;" +
            "background:whitesmoke;" +
            "border-radius:10px 0 0 0;" +
            "border:1px solid lightgray;" +
            "bottom:0;" +
            "box-shadow: 0 0 20px -5px rgba(153,153,153,0.9);" +
            "display:inline;" +
            "padding:10px;" +
            "color:indianred;" +
            "font-family:sans-serif;" +
            "font-size:12px;" +
            "font-weight:bold;" +
            "right:0;" +
            "z-index:9999;";
        var jsDebugText = errors.length + " JS error";
        if (errors.length > 1) {
            jsDebugText += "s";
        }

        jsDebug.text = jsDebugText;
        jsDebug.style.cssText = jsDebugStyle;

    };

    window.onload = function () {
        var jsDebug = document.createElement("a");
        jsDebug.id = "jsDebug";
        jsDebug.style.cssText = "display:none;";
        document.body.appendChild(jsDebug);

        if (pageErrors.length) {
            renderPageErrorLink(pageErrors);
        }
    }

    window.onerror = function (message, source, lineno, colno, error) {
        pageErrors.push(new PageError(message, source, lineno, colno, error));
    };

    throw "keyboard operator error"
})();
