import { useDispatch } from "react-redux";
import ChannelsManager from "../../channels/ChannelsManager";
import { signOutUser } from "../../stores/authStore";
import { setSearchMode } from "../../stores/interfaceStore";
import { askForFile } from "../../utils/browser";
import IconButton from "../Basic/IconButton";
import UserAvatar from "../UserAvatar";
import "./UserPanel.scss";

const UserPanel = ({user}) => {
    const dispatch = useDispatch();

    return (
        <div className="user-panel">
            <div className="current-user">
                <UserAvatar user={user} onClick={() => {
                    askForFile("image/jpeg, image/png", (url, blob) => {
                        if(blob.size < 5*1024*1024) {
                            ChannelsManager.chats.uploadAvatar(blob);
                        } else {
                            alert("Too big!");
                        }
                    })
                }}/>
                <div className="info">
                    <div className="name">
                        {user.name || "???"}
                    </div>
                    {user.nickname && <div className="nickname">
                        {`@${user.nickname}`}
                    </div>}
                </div>
                <IconButton icon="search" className="action" onClick={() => {
                    dispatch(setSearchMode(true));
                }}/>
                <IconButton icon="settings" className="action" onClick={() => {
                    alert("Not implemented!");
                }}/>
                <IconButton icon="logout" className="action" onClick={() => {
                    signOutUser().catch(err => console.log(err))
                }}/>
            </div>
        </div>
    )
}

export default UserPanel;