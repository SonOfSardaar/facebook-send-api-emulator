module.exports = function () {//href target directive
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
        var url=attrs["ngHref"];
          var href = element.href;
          if(url==='#') return;

          element.attr("target", "_blank");
        }
    };
}