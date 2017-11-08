module.exports = function () {
    var server = document.location.hostname + ":" + document.location.port;
    var protocol = document.location.protocol;

    return {
        webSocketUrl: "ws://" + server + "/ws",
        serviceUrl: protocol + "//" + server
    }
}