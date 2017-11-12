const axios = require("axios");

function FacebookMessenger(endpointUrl, token) {
    const base = this;

    this.sendAction = function (id, action) {
        this.sendMessage(id, action)
    }

    this.sendTextMessage = function (id, text, cb) {
        const messageData = {
            text: text
        }
        this.sendMessage(id, messageData, cb)
    }

    this.sendImageMessage = function (id, imageURL, cb) {
        const messageData = {
            'attachment': {
                'type': 'image',
                'payload': {
                    'url': imageURL
                }
            }
        }
        this.sendMessage(id, messageData, cb)
    }

    this.sendHScrollMessage = function (id, elements, cb) {
        const messageData = {
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': elements
                }
            }
        }
        this.sendMessage(id, messageData, cb)
    }

    this.sendButtonsMessage = function (id, text, buttons, cb) {
        const messageData = {
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'button',
                    'text': text,
                    'buttons': buttons
                }
            }
        }
        this.sendMessage(id, messageData, notificationType, cb)
    }

    this.sendListMessage = function (id, elements, buttons, topElementStyle, cb) {
        buttons = buttons || []
        topElementStyle = topElementStyle || 'large'
        const messageData = {
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'list',
                    'top_element_style': topElementStyle,
                    'elements': elements,
                    'buttons': buttons
                }
            }
        }
        this.sendMessage(id, messageData, cb)
    }

    this.sendReceiptMessage = function (id, payload, cb) {
        payload.template_type = 'receipt'
        const messageData = {
            'attachment': {
                'type': 'template',
                'payload': payload
            }
        }
        this.sendMessage(id, messageData, cb)
    }

    this.sendQuickRepliesMessage = function (id, attachment, quickReplies, cb) {
        const attachmentType = (typeof attachment === 'string' ? 'text' : 'attachment')
        const attachmentObject = typeof attachment === 'string' ? attachment : {
            type: 'template',
            'payload': {
                'template_type': 'generic',
                'elements': attachment
            }
        }
        const messageData = {
            [attachmentType]: attachmentObject,
            'quick_replies': quickReplies
        }
        this.sendMessage(id, messageData, cb)
    }

    this.sendMessage = function (id, data) {
        const payload = {
            recipient: {
                id: id
            }
        }

        if (typeof data === 'string') {
            payload.sender_action = data
        } else {
            payload.message = data
        }

        axios({
            method: "post",
            url: `${endpointUrl}/v2.6/me/messages?access_token=${token}`,
            data: payload
        }).then(response => {
            console.log(response.statusText);
        }).catch(error => {
            console.log(error.response.statusText);
        });
    }
}


module.exports = FacebookMessenger