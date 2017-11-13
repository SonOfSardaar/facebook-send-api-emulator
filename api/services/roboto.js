const brain = require("../data/robotosBrain");

module.exports = function Roboto(messenger, config) {
    this.handle = function (callback) {
        if (!callback.entry) {
            console.write("No entry in the message..");
            return;
        }

        var entry = callback.entry[0];

        console.log("Handling entry..", entry.id);

        var eventData = entry.messaging[0];

        this.handleMessage(eventData);
    }

    this.handleMessage = function (eventData) {
        console.log("Handling event data...", eventData);

        var sender = eventData.sender.id;
        var message = eventData.message;

        if ((message.text||"").match(/hi|hello|howdy/ig)) {
            const index = Math.floor(Math.random() * brain.greetings.length);
            const greeting = brain.greetings[index];
            messenger.sendTextMessage(sender, greeting);
            return;
        }

        if ((message.text||"").match(/infinity stones/ig)) {
            const stones = brain.infinityStones.map(stone => {
                return stone.name
            });
            var text = "There are 6 inifinity stones, which one are you interested in?";

            var quickReplies = stones.map(stone => {
                return {
                    "content_type": "text",
                    "title": stone,
                    "payload": "infinityStones"
                }
            });

            messenger.sendQuickReplies(sender, text, quickReplies);
            return;
        }

        if (message.quick_reply && message.quick_reply.payload === "infinityStones") {
            var stone = brain.infinityStones.find(x => x.name == message.text);
            messenger.sendTextMessage(sender, stone.detail);

            const text = "If you are interested in knowing more then follow this link";

            const buttons = [{
                "type": "web_url",
                "url": "https://www.theverge.com/2015/5/7/8560555/marvel-infinity-stones-avengers-infinity-war-movie",
                "title": "Read More...",
            }];

            messenger.sendButtons(sender, text, buttons)
            return;
        }

        if(message.attachments){            
            messenger.sendTextMessage(sender, "Nice photo!");
            return;    
        }

        messenger.sendTextMessage(sender, "Sorry I don't understand this");

        const subjects = [{
            content_type: "text",
            title: "Infinity Stones",
            payload: "infinityStones"
        }];

        messenger.sendQuickReplies(sender, "But i can talk about one of these things", subjects);
    }
}