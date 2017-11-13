const axios = require("axios");

function FacebookMessenger(endpointUrl, token) {
    const base = this;

    this.sendAction = function (id, action) {
        this.sendMessage(id, action)
    }

    this.sendTextMessage = function (id, text) {
        const messageData = {
            text: text
        }
        this.sendMessage(id, messageData)
    }

    this.sendImageMessage = function (id, imageURL) {
        const messageData = {
            'attachment': {
                'type': 'image',
                'payload': {
                    'url': imageURL
                }
            }
        }
        this.sendMessage(id, messageData)
    }

    this.sendHScrollMessage = function (id, elements) {
        const messageData = {
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': elements
                }
            }
        }
        this.sendMessage(id, messageData)
    }

    this.sendButtons = function (id, text, buttons) {
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
        this.sendMessage(id, messageData)
    }

    this.sendListMessage = function (id, elements, buttons, topElementStyle) {
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
        this.sendMessage(id, messageData)
    }

    this.sendReceiptMessage = function (id, payload) {
        payload.template_type = 'receipt'
        const messageData = {
            'attachment': {
                'type': 'template',
                'payload': payload
            }
        }
        this.sendMessage(id, messageData)
    }

    this.sendQuickReplies = function (id, attachment, quickReplies) {
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
        this.sendMessage(id, messageData)
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