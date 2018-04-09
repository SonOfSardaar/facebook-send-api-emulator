const users = require("../services/users");
const database = require("../services/database");
const WebHook = require("../services/webHook");
const shortid = require("shortid");
const version="v2.11";

module.exports = function (app, config, chatWorker) {
    app.put("/user/:id", (request, response) => {
        users.activate(request.params.id);
        chatWorker.send({
            user: users.activeUser()
        })
        response.send("OK");
    })

    app.get(`/${version}/:psid(\\d+)`, function (request, response) {
        var psid = request.params.psid;
        var user = users.get(psid);
        console.log("user resolved " + psid, user);
        response.send(user)
    })

    app.post(`/${version}/me/messages`, function (request, response) {
        console.log(request.body);
        chatWorker.send(request.body);
        var message_id = "mid.$cACCxO" + shortid.generate();
        var recipient_id = request.body.recipient.id;
        response.send({recipient_id, message_id });        
    })

    app.get(`/${version}/me/messenger_profile`, function (request, response) {
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

    app.post(`/${version}/me/messenger_profile`, function (request, response) {
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

    //Create Custom Label {name:labelName}
    app.post(`/${version}/me/custom_labels`, function (request, response) {
        console.log(request.body);
        var label = database.addLabel(request.body);
        response.send({id:label.id});
    })
    
    //Get Label Details
    app.get(`/${version}/:labelId`, function (request, response) {
        console.log(request.body);
        var label = database.getLabel(request.params.labelId);

        response.send(label);
    })

    //Delete Label Details
    app.delete(`/${version}/:labelId`, function (request, response) {
        console.log(request.body);
        database.removeLabel(request.params.labelId);

        response.send({success: true});
    })

    //Retrieve All Labels
    app.get(`/${version}/me/custom_labels`, function (request, response) {
        console.log(request.body);
        var labels=database.getLabels();
        response.send({data:labels});
    })

    //Associate Label to PSID {user:PSID}
    app.post(`/${version}/:labelId/label`, function (request, response) {
        console.log(request);
        if(!request.params.labelId) throw "labelId missing from url"

        var label = database.addUserLabel(request.body.user, request.params.labelId);
        response.send({success:true});
    })

    //Remove Label from PSID {user:PSID}
    app.delete(`/${version}/:labelId/label`, function (request, response) {
        console.log(request);
        if(!request.params.labelId) throw "labelId missing from url"

        var label = database.removeUserLabel(request.body.user, request.params.labelId);
        response.send({success:true});
    })

    //Retrieve a List of All Assosiated Labels
    app.get(`/${version}/:psid(\\d+)/custom_labels`, function (request, response) {
        console.log(request.body);
        var labels=database.getUserLabels(request.params.psid);
        response.send({data:labels});
    })
        
    app.post(`/${version}/me/message_creatives`, function (request, response) {
        console.log(request.body);
        response.send({
            message_creative_id: shortid.generate()
        });
    })

    app.post(`/${version}/me/broadcast_messages`, function (request, response) {
        console.log(request.body);
        //chatWorker.send(request.body);
        response.send({
            broadcast_id: shortid.generate()
        });
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