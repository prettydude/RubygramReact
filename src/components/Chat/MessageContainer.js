import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../../stores/activeChatStore";
import Message from "./Message";

const MessageContainer = () => {
    const messages = useSelector(selectMessages);
    const lastMessage = useRef();

    useEffect(() => {
        lastMessage.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="message-container">
            <div className="messages-end" ref={lastMessage}/>
            {messages.map(msg => <Message key={msg.id} message={msg}/>).reverse() /*flexbox bug*/}
        </div>
    )
}

export default MessageContainer;