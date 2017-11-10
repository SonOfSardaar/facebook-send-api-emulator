const axios = require("axios");
const uuidv1 = require('uuid/v1');
const crypto = require("crypto");
const users = require("./users");
const config = require("../config");
const CallbackFactory = require("./callbackFactory");

module.exports = function WebHook(chatWorker) {
  const base = this;
  const pageScopeId = config.pageScopeId;
  const appSecret = config.appSecret;
  const webHookUrl = config.webHookUrl;

  base.dispatch = function (message) {
    return;
    console.log("dispatching:", message.type);
    var activeUser = users.activeUser();
    const callbackFactory = new CallbackFactory(activeUser.pageScopeId);
    const callback = callbackFactory.createCallback(message);
    var json = JSON.stringify(callback);
    console.log("posting", json)
    var hash = crypto.createHmac("sha1", appSecret).update(json).digest("hex");
    
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
      console.log(error.response.statusText);

      var response = {
        type: "text",
        text: error.response.statusText
      }

      chatWorker.send({message: response});
    });
  }
}