const chatWorker=require("./chatWorker");
const users=require("./users");

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