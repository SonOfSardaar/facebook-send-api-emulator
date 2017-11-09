const users=require("./users");
const WebHook=require("./webHook")

function ChatWorker(){
    const base=this;
    const webHook=new WebHook(this);
    
    base.send=function(model){
        var json=JSON.stringify(model);
        base.socket.send(json);
    },

    base.sendActiveUser=function(){
        var user=users.activeUser();
        base.send(user);
    }

    base.start = function (server) {
        server.on("connection", socket => {
            base.socket=socket;
            socket.on("message",message=>{
                var object=JSON.parse(message);
                webHook.dispatch(object);
            })   
            base.sendActiveUser();     
        })
    }
}

module.exports = new ChatWorker();