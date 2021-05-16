import store from "../store";
import { appendMessageIfCurrent, deleteMessage, setMessages } from "../stores/activeChatStore";
import { appendChatMessage } from "../stores/chatsStore";
import { blobToByteArray } from "../utils/clipboard";
import Channel from "./abstractChannel";

class MessageChannel extends Channel {
    constructor() {
        super();

        this._initChannel();
    }

    onReconnect() {
        if(!this.subscription) this._initChannel();
    }

    _initChannel() {
        this.subscription = this.create("MessageChannel", {
            connected: () => console.log("Connected message"),
        
            disconnected: () => console.log("Disconnected message"),
        
            received: data => {
                console.log(data);
                switch(data.type) {
                    case "messages":
                        store.dispatch(setMessages(data.messages));
                        break;
                    case "newMessage":
                        store.dispatch(appendMessageIfCurrent(data.message));
                        store.dispatch(appendChatMessage(data.message));
                        break;
                    case "deleteMessage":
                        store.dispatch(deleteMessage(data.message_id));
                        break;
                    default:
                        console.log(data);
                }
            },
        })
    }

    sendMessage(peer_id, text) {
        this.performOrQueue("sendMessage", {
            message: {
                text: text,
            },
            peer: {
                id: peer_id
            },
        });
    }

    sendFile(peer_id, blob, filename) {
        filename = filename || blob.filename // get filename from blob, if not present
        blobToByteArray(blob).then(arr => {
            this.performOrQueue("sendFile", {
                file: {
                    bytes: arr,
                    content_type: blob.type,
                    filename,
                },
                peer: {
                    id: peer_id
                },
            });
        })
    }

    requestAllMessages(peer) {
        this.performOrQueue("getMessages", {peer});
    }

    delete(id) {
        this.performOrQueue("deleteMessage", {id});
    }

    edit(id, body) {
        this.performOrQueue("editMessage", {id, body});
    }
}

export default MessageChannel