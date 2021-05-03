import store from "../store";
import { setConversation } from "../stores/activeChatStore";
import { addChat, setChats, setTyping } from "../stores/chatsStore";
import { setUsers } from "../stores/userStore";
import Channel from "./abstractChannel";

class ChatChannel extends Channel {
    constructor() {
        super();

        this._initChannel();
    }

    onReconnect() {
        if(!this.subscription) this._initChannel();
    }

    _initChannel() {
        this.subscription = this.create("ConversationChannel", {
            connected: () => console.log("Connected chat"),
        
            disconnected: () => console.log("Disconnected chat"),
        
            received: data => {
                console.log(data);
                switch(data.type) {
                    case "allUsers":
                        store.dispatch(setUsers(data.users));
                        break;
                    case "allConversations":
                        store.dispatch(setChats(data.conversations));
                        break;
                    case "getConversation":
                        store.dispatch(setConversation(data.conversation));
                        store.dispatch(addChat(data.conversation));
                        break;
                    case "getConversationInfo":
                        store.dispatch(addChat(data.conversation));
                        break;
                    case "typing":
                        store.dispatch(setTyping(data.conversation_id));
                        break;
                    default:
                        // console.log(data);
                }
            },
        })
    }

    checkConnection() {
        this.performOrQueue("checkConnection", {});
    }

    requestAllUsers() {
        this.performOrQueue("allUsers", {});
    }

    requestAllChats() {
        this.performOrQueue("allConversations", {});
    }

    requestChat(peer_id) {
        this.performOrQueue("getConversation", {peer_id});
    }

    requestChatInfo(peer_id) {
        this.performOrQueue("getConversationInfo", {peer_id});
    }

    sendTyping(peer_id) {
        this.performOrQueue("sendTyping", {peer_id});
    }
}

export default ChatChannel