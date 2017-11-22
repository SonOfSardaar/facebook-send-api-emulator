module.exports = function ($compile, $location) {//template button directive
    const host=$location.host();
    const port=$location.port();
    const accountLinkingUrl="http://"+ host + ":" + port + "/v2.6/accountLinking?account_linking_token=XXXX";
    const redirectUri=`http%3A%2F%2F${host}%3A${port}%2Fv2.6%2FaccountLinking%2F%3Faccount_linking_token%3Dxxxx`;

    return {
        replace: true,
        template: function (element, attrs) {
            return '<span class="postback-button">{{button.title}}</div>';
        },
        link: function (scope, element, attrs) {
            if (scope.button.type === "account_link") {
                scope.button.title = "Log In";

                element.html(`<a target="_blank" href="${scope.button.url}?redirect_uri=${redirectUri}">` + scope.button.title + `</a>`);
            }

            if (scope.button.type === "web_url") {
                var linkHtml = "<a href='" + scope.button.url + "' target='empty'>" + scope.button.title + "</a>";
                element.html(linkHtml);
            }

            if(scope.button.type==="element_share")
                scope.button.title="Share";
        }
    };
}