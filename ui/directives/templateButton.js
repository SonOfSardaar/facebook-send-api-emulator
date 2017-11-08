module.exports = function ($compile) {//template button directive
    return {
        replace: true,
        template: function (element, attrs) {
            return '<span class="postback-button">{{button.title}}</div>';
        },
        link: function (scope, element, attrs) {
            if (scope.button.type === "account_link") {
                scope.button.title = "Log In";
                element.html("<a href='" + scope.button.url + "?redirect_uri=http%3A%2F%2Flocalhost%3A43878%2Fv2.6%2FaccountLinking%2F%3Faccount_linking_token%3Dxxxx'>Sign In</a>");
            }

            if (scope.button.type === "web_url") {
                var linkHtml = "<a href='" + scope.button.url + "' target='empty'>" + scope.button.title + "</a>";
                element.html(linkHtml);
            }
        }
    };
}