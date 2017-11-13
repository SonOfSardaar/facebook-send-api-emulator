const chatWorker = require("../services/chatWorker");
const users = require("../services/users");
const database = require("../services/database");
const WebHook = require("../services/webHook");

module.exports = function (app) {
    app.post("/v2.6/me/messages", function (request, response) {
        console.log(request.body);
        chatWorker.send(request.body);
        response.send("OK");
    })

    app.post("/v2.6/me/messenger_profile", function (request, response) {
        var model = request.body;
        for(var property in model){
            var value=model[property];
            database.saveData(property,value);
        }
                    
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
        var {authorization_code} = request.query;
                
        console.log("Accepting authorization_code",authorization_code);
        
        const webHook=new WebHook(chatWorker);

        webHook.dispatch({authorization_code});

        response.status("201").send();
    })

    app.get("/v2.6/:psid", function (request, response) {
        var psid = request.params.psid;
        var user = users.get(psid);
        console.log("user resolved " + psid, user);
        response.send(user)
    })
}