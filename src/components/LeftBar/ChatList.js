import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChannelsManager from "../../channels/ChannelsManager";
import { selectPeer } from "../../stores/activeChatStore";
import { selectCurrentUser } from "../../stores/authStore";
import { selectChats } from "../../stores/chatsStore";
import { formatDate } from "../../utils/date";
import LoaderComponent from "../LoaderComponent";
import UserAvatar from "../UserAvatar";
import "./ChatList.scss";

const ChatList = () => {
    const chats = useSelector(selectChats);
    const user = useSelector(selectCurrentUser);
    const peer = useSelector(selectPeer);

    const [timeOut, setTimeOut] = useState(false);

    useEffect(() => {
        if(!chats || !chats.length) ChannelsManager.chats.requestAllChats();
        setTimeout(() => setTimeOut(true), 2000);
    }, [])

    let content = <LoaderComponent/>;

    if(chats.length) {
        content = chats.map(chat => 
            <ChatFragment   chat={chat} 
                            user={user} 
                            selected={peer && (peer.id === (user.id === chat.recipient_id? chat.sender_id : chat.recipient_id))} 
                            key={chat.id}/>)
    } else if(timeOut) {
        content = "No chats!";
    }
    
    return (
        <div className="chat-list">
            {content}
        </div>
    )
}

const ChatFragment = ({chat, user, selected}) => {
    let history = useHistory();

    const peer = chat.recipient_id === user.id ? chat.sender : chat.recipient;

    const date = new Date(chat.last_at);

    const text = chat.action || chat.preview;

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
            <div className={classNames({"chat-preview": true, "loading-text": chat.action})}>{text}</div>
        </div>
        
    </div>
    )
}

export default ChatList;