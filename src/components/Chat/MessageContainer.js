import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../../stores/activeChatStore";
import Message from "./Message";
import ServiceMessage from "./ServiceMessage";

const MessageContainer = () => {
    const messages = useSelector(selectMessages);
    const lastMessage = useRef();

    useEffect(() => {
        lastMessage.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="message-container">
            <div className="messages-end" ref={lastMessage}/>
            {insertDateSeparators(messages).map(msg => msg.separator ? <ServiceMessage key={msg.id} date={msg.date}/> :<Message key={msg.id} message={msg}/>).reverse() /*flexbox bug*/}
        </div>
    )
}

function insertDateSeparators(messages) {
    return messages.map((msg, i, arr) => {
        if(i === (arr.length - 1)) { // last element
            return msg;
        } else {
            const msg1Date = new Date(msg.created_at);
            const msg2Date = new Date(arr[i+1].created_at);
            
            const isSameDay = (msg1Date.getDate() === msg2Date.getDate() 
                && msg1Date.getMonth() === msg2Date.getMonth()
                && msg1Date.getFullYear() === msg2Date.getFullYear())
            if(!isSameDay) {
                return [msg, {separator: true, date: msg2Date, id: `${msg.id}-date-separator`}]
            } else {
                return msg;
            }
        }
    }).flat(1);
}

export default MessageContainer;