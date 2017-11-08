const express = require('express');
const app = express();
const http=require("http");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const routes = require("./api/routes");
const WebSocket=require("ws");
const chatWorker=require("./api/chatWorker");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var config={
    WebHookUrl:process.env["FacebookChatEmulator.WebHookUrl"]
};

const server=http.createServer(app);

var webSocketServer=new WebSocket.Server({server})
chatWorker.start(webSocketServer);

app.use(express.static("dist"))
routes(app,config);

server.listen(port);

console.log('API server started on: ' + port);