module.exports = function ($compile) {//dropdown menu directive
    return {
        replace: true,
        scope:{menu:"=",itemSelect:"&"},
        template: function (element, attrs) {
            return `<ul class="dropdown-menu">
                        <li ng-class="{'dropdown-submenu':item.type==='nested'}"
                            ng-repeat="item in menu">
                            <a ng-href="{{item.url||'#'}}" href-target
                            ng-click="itemSelect()(item)">{{item.title}}</a>
                            <dropdown-menu menu="item.call_to_actions" item-select="itemSelect()"/>
                        </li>
                    </ul>`;
        }
    };
}