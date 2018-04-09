const ChatMessage = require("../models/chatMessage");
module.exports = function ($http, $scope, config) {
    var socket = new WebSocket(config.webSocketUrl);
    $scope.messages = [];
    $scope.persistentMenu = {};
    $scope.images=[];

    showMessage("Connecting...");

    socket.onmessage = function (event) {
        $scope
            .$apply(function (scope) {
                var model = JSON.parse(event.data);
                if(model.images){
                    $scope.images=model.images;
                    showMessage("image list updated!")
                }

                if (model.persistent_menu) {
                    $scope.persistentMenu = model.persistent_menu[0];
                    showMessage("persistent menu updated!")                    
                }

                if (model.user) {
                    var user = model.user
                    $scope.user = user;
                    showMessage("hello " + user.first_name);
                }

                $scope.quick_replies = [];
                
                $scope.sender_action=model.sender_action;

                if(!model.message) 
                    return;

                $scope
                    .messages
                    .push(new ChatMessage(model).identify($scope));

                scrollChatToBottom();
            });
    }

    function scrollChatToBottom(){
        window.setTimeout(function() {
            var elem = document.getElementById("messageWindow");
            elem.scrollTop = elem.scrollHeight;
            }, 100);
    }

    function showMessage(text) {
        $scope
            .messages
            .push(new ChatMessage({
                message: {
                    type: "text",
                    text: text
                }
            }).identify());            
    }

    function echo(text) {
        $scope
            .messages
            .push(new ChatMessage({
                message: {
                    type: "echo",
                    text: text
                }
            }).identify());

        scrollChatToBottom();
    }

    function echoImage(url) {
        $scope
            .messages
            .push(new ChatMessage({
                message: {
                    type: "image-echo",
                    attachment: {
                        type: "image",
                        payload: {
                            url: url
                        }
                    }
                }
            }).identify());
    }

    function sendMessage(text) {
        echo(text);

        var message = {
            type: "text",
            text: text
        };

        sendJson(message);
    }

    function sendJson(model) {
        var json = JSON.stringify(model);
        socket.send(json);
    }

    $scope.sendImage=function(index){
        var url = $scope.images[index];
        sendJson({type: "image", payload: url});
        echoImage(url);
    }

    $scope.sendRandomImage = function () {
        var index = Math.ceil(Math.random() * $scope.images.length) - 1;
        $scope.sendImage(index);
    }

    $scope.doPostback = function (button, message) {
        if(!button) return;
        if(button.type==="nested") return;

        $scope.quick_replies = [];

        if ((message || {}).type === "quick-replies") 
            message.clicked = true;
        
        if (!button.url) 
            echo(button.title);
        
        sendJson({
            type: button.type || "quickReply",
            text: button.title,
            payload: button.payload
        });
    }

    $scope.switchUser = function (id) {
        $http
            .put(config.serviceUrl + "/user/" + id)
            .then(function () {});
    }
    
    $scope.sendMessage = sendMessage;
}