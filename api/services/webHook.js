const axios = require("axios");
const uuidv1 = require('uuid/v1');
const crypto = require("crypto");
const users = require("./users");
const config = require("../data/config");
const CallbackFactory = require("./callbackFactory");

const unicodeToHex = function (byte) {
  const escape = byte.toString(16);
  const rep = '\\u' + ('0000' + escape).slice(-4);
  return rep;
}

const escapeUnicodeBuffer = function (buffer) {
  var escaped = "";

  buffer.forEach(function (byte) {
    if (byte > 127)
      escaped += unicodeToHex(byte);
    else switch (String.fromCharCode(byte)) {
      case "<":
        escaped += "\\u003c";
        break;

      case "%":
        escaped += "\\u0025";
        break;

      case "&":
        escaped += "\\u0040";
        break;

      default:
        escaped += String.fromCharCode(byte);
    }
  });

  return escaped;
}

module.exports = function WebHook(chatWorker) {
  const base = this;
  const pageScopeId = config.pageScopeId;
  const appSecret = config.appSecret;
  const webHookUrl = config.webHookUrl;

  base.dispatch = function (message) {
    console.log("dispatching:", message.type);
    var activeUser = users.activeUser();
    const callbackFactory = new CallbackFactory(activeUser.id);
    const callback = callbackFactory.createCallback(message);
    var json = JSON.stringify(callback);
    var escapedJson = escapeUnicodeBuffer(new Buffer(json, "utf-8"));
    console.log("posting", escapedJson)
    var hash = crypto
      .createHmac("sha1", appSecret)
      .update(new Buffer(escapedJson, "utf-8"))
      .digest("hex");

    axios({
      method: "post",
      url: webHookUrl,
      data: callback,
      headers: {
        "X-Hub-Signature": "sha1=" + hash
      }
    }).then(response => {
      console.log(response.statusText);
    }).catch(error => {
      console.log(error.message || error.response.statusText);

      var response = {
        type: "text",
        text: error.message || error.response.statusText
      }

      chatWorker.send({
        message: response
      });
    });
  }
}