const ChatMessage = require("../models/chatMessage");
const images = require("../data/imageList");

module.exports = function ($http, $scope, config) {
    var socket = new WebSocket(config.webSocketUrl);
    $scope.messages = [];
    $scope.persistantMenu = [];

    showMessage("Connecting...");

    socket.onmessage = function (event) {
        $scope
            .$apply(function (scope) {
                var model = JSON.parse(event.data);

                if (model.user) {
                    var user = model.user
                    $scope.user = user;
                    showMessage("hello " + user.first_name);
                }

                if (model.persistent_menu) {
                    $scope.persistantMenu = model.persistent_menu;
                }

                $scope.quick_replies = [];

                if(!model.message) return;
                $scope
                    .messages
                    .push(new ChatMessage(model).identify($scope));
            });
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

    $scope.showSettingsDialog = function () {
        $http
            .get(config.serviceUrl + "/settings")
            .then(function (response) {
                if (response.status !== 200) {
                    showMessage("could not get settings. " + response.statusText);
                    return;
                }

                $scope.settings = response.data;
            });
    }

    $scope.sendRandomImage = function () {
        var index = Math.ceil(Math.random() * images.length) - 1;
        var url = images[index];
        sendJson({type: "image", payload: url});
        echoImage(url);
    }

    $scope.discardChanges = function () {
        $scope.settings = [];
    }

    $scope.saveSettings = function () {
        $http
            .put(config.serviceUrl + "/settings", $scope.settings)
            .then(function (response) {
                showMessage("settings saved");
            }, function (response) {
                showMessage("could not save settings. " + response.status);
            });
    }

    $scope.doPostback = function (button, message) {
        $scope.quick_replies = [];

        if ((message || {}).type === "quick-replies") 
            message.clicked = true;
        
        if (!button.type) 
            echo(button.title);
        
        sendJson({
            type: button.type || "quickReply",
            text: button.title,
            payload: button.payload
        });
    }

    $scope.switchUser = function (id) {
        $http
            .put(config.serviceUrl + "/settings/user/" + id)
            .then(function () {});
    }
    $scope.sendMessage = sendMessage;
}