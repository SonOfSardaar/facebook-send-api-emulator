const chatWorker = require("./chatWorker");
const users = require("./users");
const database = require("./database");

module.exports = function (app, config) {
    var users = require("./users");

    app.post("/settings/user/:psid", (request, response) => {
        users.activate(request.params.psid)
        chatWorker.sendActiveUser();
    })

    app.post("/v2.6/me/messages", function (request, response) {
        console.log(request.body);
        chatWorker.send(request.body);
        response.send("OK");
    })

    app.post("/v2.6/me/messenger_profile", function (request, response) {
        var model = request.body;
        if (model.persistent_menu) 
            database.saveData("persistent_menu",model.persistent_menu);

        if (model.get_started) 
            database.saveData("get_started",model.get_started);

        if (model.greeting) 
            database.saveData("greeting",model.greeting);
        
        if(model.whitelisted_domains)
            database.saveData("whitelisted_domains",model.whitelisted_domains);
            
        response.send({result:"success"});
    })

    app.get("/v2.6/me/messenger_profile", function (request, response) {
        var fields = (request.query.fields||"").split(",");

        var model = {data:[]};

        fields.forEach(function(field) {
            var data=database.getData(field);
            var item={};
            item[field]=data;
            if(data) model.data.push(item);                
        });             
        
        response.send(model);
    })

    app.get("/v2.6/accountLinking", function (request, response) {
        var authorizationCode = request.query.authorization_code;
    })

    app.get("/v2.6/:psid", function (request, response) {
        var psid = request.params.psid;
        var user = users.get(psid);
        console.log("user resolved " + psid, user);
        response.send(user)
    })
}