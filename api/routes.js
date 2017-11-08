const chatWorker=require("./chatWorker");

module.exports=function(app,config){
    var users=require("./users");
    app.get("/status",(request,response)=>{
        response.send(chatWorker.status);
    })

    app.get("/v2.6/me",function(request,response){
        var psid="1663671807007534";//actually get it from page access token
        var user=users.get("1663671807007534");
        response.send(user)
    })

    app.get("/v2.6/me/messages",function(request,response){
        response.send({message:"Its a me MARIO!",config:config})
    })

    app.get("/v2.6/accountLinking",function(request,response){
        var authorizationCode=request.query.authorization_code;
        response.send({message:"Its a me MARIO!",config:config})
    })

    app.get("/v2.6/:psid",function(request,response){
        var psid=request.params.psid;
        var user=users.get(psid);
        response.send(user)
    })
}