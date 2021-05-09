import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';
import ChannelsManager from "../../channels/ChannelsManager";
import { selectPeer } from "../../stores/activeChatStore";
import { askForFile, IS_DESKTOP_SCREEN } from "../../utils/browser";
import IconButton from "../Basic/IconButton";
import "./ChatInput.scss";

const TYPING_SEND_INTERVAL = 3000;

const ChatInput = () => {
    const peer = useSelector(selectPeer);
    const [message, setMessage] = useState("");
    const lastSentRef = useRef();

    useEffect(() => {
        setMessage(""); //reset message on chat change
    }, [peer.id]);

    const sendTyping = () => {
        if(!lastSentRef.current || (lastSentRef.current + TYPING_SEND_INTERVAL) < Date.now()) {
            ChannelsManager.chats.sendTyping(peer.id);
            lastSentRef.current = Date.now();
        }
    };

    const uploadFile = () => {
        askForFile("*", (url, file) => {
            ChannelsManager.messages.sendMessage(peer.id, "", file, file.name);
        });
    }

    const checkPaste = ev => {
        const item = Array.from(ev.clipboardData.items).find(el => el.type.includes("image"));
        if(item) {
            ev.preventDefault();
            const file = item.getAsFile();
            ChannelsManager.messages.sendMessage(peer.id, "", file, file.name);
        }
    }

    return (
        <div className="chat-input-wrapper">
            <IconButton className="chat-input-button attach" icon="attach" onClick={() => uploadFile()}/>
            <div className="chat-input">
                <div className="chat-input-scroll-wrapper">
                    <TextareaAutosize autoFocus
                                        minRows={3} 
                                        className="text-area" 
                                        placeholder="Enter message..." 
                                        onChange={ev => {
                                            setMessage(ev.currentTarget.value);
                                            sendTyping();
                                        }} 
                                        value={message}
                                        onPaste={ev => checkPaste(ev)}
                                        onKeyPress={ev => {
                                            if(ev.key === "Enter") {
                                                if(IS_DESKTOP_SCREEN && !ev.ctrlKey && !ev.shiftKey) {
                                                    send(peer, message, setMessage);
                                                    ev.preventDefault();
                                                }
                                            }
                                        }}/>
                </div>
            </div>
            <button className="chat-input-button send" onClick={() => send(peer, message, setMessage)}>Send</button>
        </div>
    )
}

function send(peer, message, setMessage) {
    if(!message) return;
    ChannelsManager.messages.sendMessage(peer.id, message);
    setMessage("");
}

export default ChatInput;