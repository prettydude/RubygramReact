import { useHistory } from "react-router";
import IconButton from "../Basic/IconButton";
import UserAvatar from "../UserAvatar";
import "./ChatHeader.scss";

const ChatHeader = ({peer, action}) => {

    const history = useHistory();

    return (
        <div className="chat-header">
            <IconButton icon="back" className="back desktop-hidden" onClick={() => {
                history.replace("?");
            }}/>
            <UserAvatar user={peer}/>
            <div className="info">
                <div className="name">
                    {peer?.name || "???"}
                </div>
                {!action && peer?.nickname && <div className="nickname">
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