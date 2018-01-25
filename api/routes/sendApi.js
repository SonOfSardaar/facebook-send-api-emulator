const users = require("../services/users");
const database = require("../services/database");
const WebHook = require("../services/webHook");

module.exports = function (app, config, chatWorker) {
    app.put("/user/:id", (request, response) => {
        users.activate(request.params.id);
        chatWorker.send({
            user: users.activeUser()
        })
        response.send("OK");
    })

    app.get("/v2.11/:psid", function (request, response) {
        var psid = request.params.psid;
        var user = users.get(psid);
        console.log("user resolved " + psid, user);
        response.send(user)
    })

    app.post("/v2.11/me/messages", function (request, response) {
        console.log(request.body);
        chatWorker.send(request.body);
        response.send("OK");
        // In Graph API the success response body is:
        // {
        //   "recipient_id": "597464983710493",
        //   "message_id": "mid.$cAACxOundcUZnWaCZ2VhKFtRJR5BJ"
        // }
    })

    app.get("/v2.11/me/messenger_profile", function (request, response) {
        var fields = (request.query.fields || "").split(",");

        var model = {
            data: []
        };

        fields.forEach(function (field) {
            var data = database.getData(field);
            var item = {};
            item[field] = data;
            if (data) model.data.push(item);
        });

        response.send(model);
    })

    app.post("/v2.11/me/messenger_profile", function (request, response) {
        var model = request.body;
        for (var property in model) {
            var value = model[property];
            database.saveData(property, value);
            chatWorker.send({
                [property]: value
            })
        }
        response.send({
            result: "success"
        });
    })

    //This is not Graph API url. This is CALLBACK_URL where we must redirect the browser to this location at the end of the authentication flow.
    //For more detail please see: https://developers.facebook.com/docs/messenger-platform/identity/account-linking
    app.get("/messenger_platform/account_linking", function (request, response) {
        console.log("GET /v2.6/accountLinking\n")
        var {
            authorization_code
        } = request.query;

        console.log("Accepting authorization_code", authorization_code);

        const webHook = new WebHook(chatWorker);

        webHook.dispatch({
            authorization_code
        });

        response.status("201").send();
    })

    //This is not Graph API url. This is local url to configure emulator.
    app.get("/emulator/configuration", function (request, response) {        
        
        var model = {
            data: [{configuration:config}]
        };

        response.send(model);
    })

    //This is not Graph API url. This is local url to configure emulator.
    app.put("/emulator/configuration", function (request, response) {
        var {configuration} = request.body;
        Object.assign(config, configuration);
        database.saveData("configuration", configuration);

        response.send({
            result: "success"
        });
    })
}