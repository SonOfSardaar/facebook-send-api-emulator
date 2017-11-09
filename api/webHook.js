const axios = require("axios");
const uuidv1 = require('uuid/v1');
const crypto = require("crypto");

module.exports = function WebHook(chatWorker) {
  const base = this;
  base.dispatch = function (message) {
    console.log("dispatching:", message);

    const callbackData = {
      recipient: {
        id: "1527809300625543"
      },
      sender: {
        id: "1663671807007534"
      },
      timestamp: Date.now()
    };

    if (message.type === "text") 
      Object.assign(callbackData, {
        message:{
          mid: "mid.12345678:" + uuidv1(),
          text: message.text}
      })
    else if (message.type === "quickReply") {
      Object.assign(callbackData, {
        message:{
          text: message.text,
          mid: "mid.12345678:" + uuidv1(),
          quick_reply: {
            payload: message.payload
          }
        }
      })
    } else if (message.type === "image") {
      Object.assign(callbackData, {
        message: {
          mid: "mid.12345678." + uuidv1(),
          attachments: [
            {
              payload: {
                url: message.paylod
              }
            }
          ]
        }
      })
    } else {
      Object.assign(callbackData, {
        postback: {
          payload: message.payload
        }
      })
    }

    const callback = {
      object:"page",
      entry: [
        {
          id: uuidv1(),
          time: Date.now(),
          messaging: [callbackData]
        }
      ]
    };

    var json=JSON.stringify(callback);
    var hash=crypto.createHmac("sha1","ec593732a9ae9748451e9527c4d1a9e3").update(json).digest("hex");
//"http://localhost:9191/customer/converse/v1/channels/facebook/conversation", callback
    axios({
      method:"post",
      url:"http://localhost:9191/customer/converse/v1/channels/facebook/conversation",
      data:callback,
      headers:{"X-Hub-Signature":"sha1=" + hash}}).then(response => {
        console.log(response.statusText);
      })
      .catch(error => {
        console.log(error.response.statusText);

        var response = {
          type: "text",
          text: error.response.statusText
        }

        chatWorker.send({message:response});
      });
  }
}