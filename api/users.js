var users = {
    list: [{
        first_name: "John",
        last_name: "Doe",
        pageScopeId: "5666671847402514",
        gender: "male",
        active: true
    }, {
        first_name: "Jane",
        last_name: "Doe",
        pageScopeId: "6666671847402514",
        gender: "female",
        active: false
    }]
};

users.get = function (psid) {
    var user = users
        .list
        .filter(user => {
            return user.pageScopeId === psid
        })[0];
    return user;
}

users.activeUser = function () {
    var user = users
        .list
        .filter(user => {
            return user.active === true
        })[0];
    return user;
}

users.activate = function (psid) {
    users.list
        .forEach(function (user) {
            user.active = user.pageScopeId === psid;
        });
}

module.exports = users