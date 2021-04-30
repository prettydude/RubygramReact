import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChannelsManager from "../channels/ChannelsManager";
import { selectPeer } from "../stores/activeChatStore";
import { selectCurrentUser } from "../stores/authStore";
import { selectChats } from "../stores/chatsStore";
import { formatDate } from "../utils/date";
import "./ChatList.scss";
import UserAvatar from "./UserAvatar";

const ChatList = () => {
    const chats = useSelector(selectChats);
    const user = useSelector(selectCurrentUser);
    const peer = useSelector(selectPeer);

    useEffect(() => {
        ChannelsManager.chats.requestAllChats();
    }, [])

    //skip chats without messages
    let filteredChats = chats.filter(chat => chat.messages.length);
    
    return (
        <div className="chat-list">
            {filteredChats.length ? filteredChats.map(chat => 
                                <ChatFragment   chat={chat} 
                                                user={user} 
                                                selected={peer && (peer.id === (user.id === chat.recipient_id? chat.sender_id : chat.recipient_id))} 
                                                key={chat.id}/>) 
                                : "No chats!"}
        </div>
    )
}

const ChatFragment = ({chat, user, selected}) => {
    let history = useHistory();

    const lastMessage = chat.messages[chat.messages.length -1];
    const peer = chat.recipient_id === user.id ? chat.sender : chat.recipient;

    const date = new Date(lastMessage.updated_at);

    return (
    <div className={`chat-list-item ${selected ? "selected" : ""}`} onClick={() => {
        history.replace(`?peer=${peer.id}`)
    }}>
        <UserAvatar user={peer}/>
        <div className="info">
            <div className="top-line">
                <div className="name">{peer.name || "???"}</div>
                <div className="time">{formatDate(date)}</div>
            </div>
            <div className="chat-preview">{lastMessage.body}</div>
        </div>
        
    </div>
    )
}

export default ChatList;