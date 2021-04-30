import { useState } from "react";
import { useSelector } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';
import ChannelsManager from "../channels/ChannelsManager";
import { selectPeer } from "../stores/activeChatStore";
import "./ChatInput.scss";


const ChatInput = () => {
    const peer = useSelector(selectPeer);

    const [message, setMessage] = useState("");

    return (
        <div className="chat-input-wrapper">
            <div className="chat-input">
                <div className="chat-input-scroll-wrapper">
                    <TextareaAutosize autoFocus
                                        minRows={3} 
                                        className="text-area" 
                                        placeholder="Enter message..." 
                                        onChange={ev => setMessage(ev.currentTarget.value)} 
                                        value={message}
                                        onKeyPress={ev => {
                                            if(ev.key === "Enter") {
                                                if(!ev.ctrlKey && !ev.shiftKey) {
                                                    send(peer, message, setMessage);
                                                    ev.preventDefault();
                                                }
                                            }
                                        }}/>
                </div>
            </div>
            <button className="send" onClick={() => send(peer, message, setMessage)}>Send</button>
        </div>
    )
}

function send(peer, message, setMessage) {
    ChannelsManager.messages.sendMessage(peer.id, message);
    setMessage("");
}

export default ChatInput;