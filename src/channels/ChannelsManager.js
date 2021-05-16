import ChatChannel from "./chatChannel";
import MessageChannel from "./messageChannel";

class ChannelsManager {

    closeAll() {
        if(!this.opened) return;
        this.chats.close();
        this.messages.close();
        this.opened = false;
    }

    openAll() {
        if(this.opened) return;
        this.chats = new ChatChannel();
        this.messages = new MessageChannel();
        this.opened = true;
    }

}

export default new ChannelsManager();