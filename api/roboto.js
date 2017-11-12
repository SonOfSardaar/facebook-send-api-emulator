module.exports = function Roboto(messenger, config) {
    this.handle = function (callback) {
        if(!callback.entry){
            console.write("No entry in the message..");
            return;
        }

        var entry=callback.entry[0];
        
        console.log("Handling entry..", entry.id);

        var eventData=entry.messaging[0];

        this.handleMessage(eventData);
    }

    this.handleMessage=function(eventData){
        console.log("Handling event data...", eventData);

        var sender=eventData.sender.id;
        var message=eventData.message;

        var reply=`You said '${message.text}'`;

        messenger.sendTextMessage(sender, reply);
    }
}