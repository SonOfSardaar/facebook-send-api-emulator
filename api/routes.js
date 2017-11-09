const chatWorker=require("./chatWorker");
const users=require("./users");
const database=require("./database");

module.exports=function(app,config){
    var users=require("./users");

    app.post("/settings/user/:psid", (request, response)=>{
        users.activate(request.params.psid)
        chatWorker.sendActiveUser();
    })

    app.post("/v2.6/me/messages",function(request,response){
        console.log(request.body);
        chatWorker.send(request.body);
        response.send("OK");
    })

    app.post("/v2.6/me/messenger_profile",function(request,response){
        var model=request.body;
        if(model.persistent_menu)
            database.savePersistantMenu(model.persistent_menu);

        response.send("OK");
    })

    app.get("/v2.6/accountLinking",function(request,response){
        var authorizationCode=request.query.authorization_code;        
    })

    app.get("/v2.6/:psid",function(request,response){
        var psid=request.params.psid;
        var user=users.get(psid);
        console.log("user resolved " + psid, user);
        response.send(user)
    })
}