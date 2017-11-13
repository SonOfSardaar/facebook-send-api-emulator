const config = require("../config");
const uuidv1 = require('uuid/v1');

module.exports = function CallbackFactory(psid) {
  const base = this;
  var psid = psid;

  base.createCallback = function (message) {
    var callbackData = {
      recipient: {
        id: config.pageScopeId
      },
      sender: {
        id: psid
      },
      timestamp: Date.now(),
      message: {
        mid: "mid.12345678:" + uuidv1()
      }
    };

    if (message.type === "text")
      callbackData.message.text = message.text;
    else if (message.type === "quickReply") {
      Object.assign(callbackData.message, {
        text: message.text,
        quick_reply: {
          payload: message.payload
        }
      })
    } else if (message.type === "image") {
      Object.assign(callbackData.message, {
        attachments: [{
          type:"image",
          payload: {
            url: message.payload
          }
        }]
      })
    } else {
      Object.assign(callbackData, {
        postback: {
          payload: message.payload
        }
      })
    }

    var callback = {
      object: "page",
      entry: [{
        id: uuidv1(),
        time: Date.now(),
        messaging: [callbackData]
      }]
    };
  
    return callback;
  }
}