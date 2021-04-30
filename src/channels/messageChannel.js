import store from "../store";
import { appendMessageIfCurrent, setMessages } from "../stores/activeChatStore";
import { appendChatMessage } from "../stores/chatsStore";
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

    requestAllMessages(peer) {
        this.performOrQueue("getMessages", {peer});
    }
}

export default MessageChannel