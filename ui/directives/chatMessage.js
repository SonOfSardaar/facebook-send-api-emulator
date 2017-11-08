module.exports = function ($compile) {//chat message directive
    return {
        replace: true,
        template: '<div ng-include="getTemplateUrl()" ng-class="getTemplateClassName()"></div>',
        link: function (scope, element) {
            if (scope.message.elements) {
                var width = scope.message.elements.length * 350 + "px";
                scope.message.containerStyle = {
                    width: width
                };
            }

            scope.getTemplateClassName = function () {
                return scope.message.type + "-message";
            };
            scope.getTemplateUrl = function () {
                return "templates/" + scope.message.type + ".html";
            };
        }
    };
}