const users=require("./users");

const chatWorker = {}

chatWorker.send=function(model){
    var json=JSON.stringify(model);
    chatWorker.currentSocket.send(json);
}

chatWorker.sendActiveUser=function(){
    var user=users.activeUser();
    chatWorker.send(user);
}

chatWorker.start = function (server) {
    server.on("connection", socket => {
        chatWorker.currentSocket=socket;   
        chatWorker.sendActiveUser();     
    })
}

module.exports = chatWorker;