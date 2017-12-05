const users = require("./users");
const WebHook = require("./webHook")
const database = require("./database");

module.exports = function ChatWorker(server) {
    const base = this;
    const webHook = new WebHook(this);
    
    server.on("connection", socket => {
        console.log("new connection made..");
        base.socket = socket;
        socket.on("message", message => {
            var object = JSON.parse(message);
            webHook.dispatch(object);
        })

        base.sendInitialData();
    })

    base.sendInitialData = function () {
        var user = users.activeUser();
        var persistent_menu = database.getData("persistent_menu");
        var images = database.getData("images") || [];
        var data = {
            user,
            persistent_menu,
            images
        };
        
        base.send(data);
    }

    base.send = function (model) {
            if (!base.socket) throw "No socket connected. Refresh the ui and try again"

            var json = JSON.stringify(model);
            base.socket.send(json);
        },

    base.sendActiveUser = function () {
        var user = users.activeUser();
        var data = {
            user
        };
        base.send(data);
    }
}