module.exports = function(model) {
    var message = {
        type: "unknown"
    };

    message.type = "unknown";

    this.identify = function (scope) {

        if (model.message.type === "echo") {
            message.type = "echo";
            Object.assign(message, model.message);
        }
        else if (model.message.text) {
            message.type = "text";
            Object.assign(message, model.message);
        }
        else if (model.message.attachment) {
            var attachment = model.message.attachment;
            var payload = attachment.payload;
            if (attachment.type === "template") {

                if (payload.template_type === "button")
                    message.type = "button-template";

                else if (payload.template_type === "generic")
                    message.type = "generic-template";

                else if (payload.template_type === "list") {
                    if (payload.top_element_style === "compact") {
                        message.type = "compact-list";
                    } else {
                        message.type = "list-template";
                        payload.top_element = payload.elements.pop();
                    }
                }
            }

            if (attachment.type === "image") {
                message.type = model.message.type || "image";
            }

            Object.assign(message, payload);
        }

        if (model.message.quick_replies) {
            scope.quick_replies = model.message.quick_replies;
        }
        return message;
    }
}