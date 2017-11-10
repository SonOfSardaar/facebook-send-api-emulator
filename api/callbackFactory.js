const config = require("../config");
const uuidv1 = require('uuid/v1');

function MessengerUser(id){
    this.id=id;
}

module.exports = function CallbackFactory(psid) {
    const base = this;
    var psid = psid;
    var callback = {
      object: "page",
      entry: [
        {
          id: uuidv1(),
          time: Date.now(),
          messaging: []
        }
      ]
    };
  
    base.createCallback = function (message) {
      var callbackData = {
        recipient : new MessengerUser(config.pageScopeId),
        sender : new MessengerUser(psid),
        timestamp : Date.now(),
        message:{ mid: "mid.12345678:" + uuidv1() }
      };
      if (message.type === "text") 
        callbackData.extend({text: message.text});
      else if (message.type === "quickReply") {
        callbackData.extend({
          text: message.text,
          quick_reply: {
            payload: message.payload
          }
        })
      } else if (message.type === "image") {
        callbackData.extend({
          attachments: [
            {
              payload: {
                url: message.paylod
              }
            }
          ]
        })
      } else {
        callbackData.extend({
          postback: {
            payload: message.payload
          }
        })
      }
    }  
  }