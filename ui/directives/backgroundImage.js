module.exports = function ($compile) {//background image directive
    return {
        link: function (scope, element, attrs) {
            element.addClass("image");
            var url = attrs.url.startsWith("http") ? attrs.url : "http://" + attrs.url;
            
            element.css({
                "background-image": "url('" + url + "')"
            });
        }
    };
}