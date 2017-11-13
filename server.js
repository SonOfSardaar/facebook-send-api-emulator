const config=require("./api/data/config");
const express = require('express');
const app = express();
const http=require("http");
const port = config.port;
const bodyParser = require("body-parser");
const sendApiRoutes = require("./api/routes/sendApi");
const sampleWebhookRoutes = require("./api/routes/sampleWebhook");
const WebSocket=require("ws");
const ChatWorker=require("./api/services/chatWorker");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server=http.createServer(app);
var webSocketServer=new WebSocket.Server({server})

const chatWorker=new ChatWorker(webSocketServer);

app.use(express.static("dist"))

sendApiRoutes(app,config,chatWorker);
sampleWebhookRoutes(app,config,chatWorker);

server.listen(port);

console.log(config);
console.log('API server started on: ' + port);