const axios = require("axios");
const uuidv1 = require('uuid/v1');
const crypto = require("crypto");
const users = require("./users");
const config = require("../config");
const CallbackFactory = require("./callbackFactory");

const escapeUnicode=function(text){
  //[^\x00-\x7F]+
  return text.replace(/[^\x00-\x7F]+/g, function(character) {
		var escape = character.charCodeAt().toString(16),
		    longhand = escape.length > 2;
    const rep= '\\' + (longhand ? 'u' : 'x') + ('0000' + escape).slice(longhand ? -4 : -2);
    return rep;
	});
}

module.exports = function WebHook(chatWorker) {
  const base = this;
  const pageScopeId = config.pageScopeId;
  const appSecret = config.appSecret;
  const webHookUrl = config.webHookUrl;

  base.dispatch = function (message) {
    console.log("dispatching:", message.type);
    var activeUser = users.activeUser();
    const callbackFactory = new CallbackFactory(activeUser.pageScopeId);
    const callback = callbackFactory.createCallback(message);
    var json = JSON.stringify(callback);
    var escapedJson=escapeUnicode(json);
    console.log("posting", escapedJson)
    var hash = crypto
      .createHmac("sha1", appSecret)
      .update(escapedJson)
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