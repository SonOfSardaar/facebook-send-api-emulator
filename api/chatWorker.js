const chatWorker = {
    status: "idle"
}

chatWorker.start = function (server) {
    server.on("connection", socket => {
        chatWorker.status="Connected!";

        console.log("new socket connected")
        socket.on("message", message => {
            socket.send(message);
        })

        socket.send(chatWorker.status)
    })
}

module.exports = chatWorker;