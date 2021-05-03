import "./ChatHeader.scss";
import UserAvatar from "./UserAvatar";

const ChatHeader = ({peer, action}) => {
    return (
        <div className="chat-header">
            <UserAvatar user={peer}/>
            <div className="info">
                <div className="name">
                    {peer.name || "???"}
                </div>
                {!action && peer.nickname && <div className="nickname">
                    {`@${peer.nickname}`}
                </div>}

                {action && <div className="action loading-text">
                    {action}
                </div>}
            </div>
        </div>
    )
}

export default ChatHeader;