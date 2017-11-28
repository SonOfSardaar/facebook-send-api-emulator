var users = {
    list: [{
        index:1,
        id:"5666671847402514",
        first_name: "John",
        last_name: "Doe",
        gender: "male",
        active: true
    }, {
        index:2,
        id:"6666671847402514",
        first_name: "Jane",
        last_name: "Doe",
        gender: "female",
        active: false
    }]
};

users.get = function (psid) {
    var user = users
        .list
        .filter(user => {
            return user.id === psid
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

users.activate = function (id) {
    users.list
        .forEach(function (user) {
            user.active = user.index == id;
        });
}

module.exports = users