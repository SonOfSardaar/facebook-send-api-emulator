module.exports = function ($compile) { //auto pan directive
    return {
        link: function (scope, element, attrs) {
            element.css({"width": "100%", "overflow-x": "hidden"});
            element.on("mousemove",function(){
                var sender = element[0];
                var diff = sender.scrollWidth - sender.clientWidth + 50;
                var dx=diff / sender.clientWidth;
                var scroll=event.layerX * dx;
                sender.scrollLeft = scroll;
            })
        }
    };
}