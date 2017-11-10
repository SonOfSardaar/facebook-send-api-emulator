module.exports = function ($compile) {//persistent menu directive
    return {
        replace: true,
        scope:{menu:"="},
        template: function (element, attrs) {
            return `<ul class="dropdown-menu">
            <li ng-if="item.type==='nested'"><a href="javascript:void(0)" ng-repeat="item in menu[0].call_to_actions" ng-click="showSubmenu(item)">{{item.title}}</a>
            <persistent-menu menu="item"/>
            </li>            
            <li ng-if="item.type!=='nested'"><a href="javascript:void(0)" ng-repeat="item in menu[0].call_to_actions" ng-click="doPostback(item)">{{item.title}}</a></li>            
        </ul>`;
        },
        controller:function($scope){
            
        }
    };
}