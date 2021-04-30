import "./ChatHeader.scss";
import UserAvatar from "./UserAvatar";

const ChatHeader = ({peer}) => {
    return (
        <div className="chat-header">
            <UserAvatar user={peer}/>
            <div className="info">
                <div className="name">
                    {peer.name || "???"}
                </div>
                {peer.nickname && <div className="nickname">
                    {`@${peer.nickname}`}
                </div>}
            </div>
        </div>
    )
}

export default ChatHeader;