require("bootstrap/dist/css/bootstrap.min.css")
require("bootstrap/dist/css/bootstrap-theme.min.css")
require("./styles/index.css")
require("jquery")
require("bootstrap")
const angular = require("angular");

const ChatController = require("./controllers/chatController");

const chatty = angular.module("chatty", []);

chatty.factory("config", require("./factories/configFactory"));

chatty.filter("url", require("./filters/urlFilter"));

chatty.directive("chatMessage", require("./directives/chatMessage"));

chatty.directive("handleEnter", require("./directives/handleEnter"))

chatty.directive("backgroundImage", require("./directives/backgroundImage"));

chatty.directive("templateButton", require("./directives/templateButton"));

chatty.controller("chatController", ["$http", "$scope", "config", ChatController]);