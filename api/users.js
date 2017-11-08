var users = {
    list: [
        {
            firstname: "John",
            lastname: "Doe",
            pageScopeId: "1663671807007534",
            gender: "male",
            isActive: true
        },
        {
            firstname: "Jane",
            lastname: "Doe",
            pageScopeId: "2663671807007534",
            gender: "female",
            isActive: false
        }
    ]
};

users.get = function (psid) {
    var user = users.list.filter(user => { return user.pageScopeId == psid })[0];    
    return user;
}

module.exports = users