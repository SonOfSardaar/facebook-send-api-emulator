const axios = require("axios");

function WebHook() {
    const base = this;
    base.dispatch = function (message) {
        console.log("dispatching:", message);
        
        axios
        .post("http://somecrazyurl.com/webhook")
        .then(response => {
          console.log(response.status);
        })
        .catch(error => {
          console.log(error);
        });
        
    }
}

module.exports = new WebHook("url");