const chatWorker=require("./chatWorker");

module.exports=function(app,config){
    var users=require("./users");

    app.post("/settings/user/:id", (request, response)=>{
        //chatWorker.sendActiveUser();
    })

    app.get("/v2.6/me",function(request,response){
        var psid="1663671807007534";//actually get it from page access token
        var user=users.get("1663671807007534");
        response.send(user)
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
        response.send(user)
    })
}