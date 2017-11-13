const FacebookMessenger=require("../services/messenger");
const Roboto=require("../services/roboto");

module.exports=(app,config)=>{
    var endpointUrl=`http://localhost:${config.port}`;
    var pageAccessToken=config.pageAccessToken;

    var messenger=new FacebookMessenger(endpointUrl, pageAccessToken);
    var bot=new Roboto(messenger,config);

    app.post("/webhook",(request,response)=>{        
        console.log("WEBHOOK RECIEVED...")
        bot.handle(request.body);
        response.send("OK");
    })
}