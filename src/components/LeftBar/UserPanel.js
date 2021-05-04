import { useDispatch } from "react-redux";
import { signOutUser } from "../../stores/authStore";
import { setSearchMode } from "../../stores/interfaceStore";
import IconButton from "../Basic/IconButton";
import UserAvatar from "../UserAvatar";
import "./UserPanel.scss";

const UserPanel = ({user}) => {
    const dispatch = useDispatch();

    return (
        <div className="user-panel">
            <div className="current-user">
                <UserAvatar user={user}/>
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
                    console.log("settings");
                }}/>
                <IconButton icon="logout" className="action" onClick={() => {
                    signOutUser().catch(err => console.log(err))
                }}/>
            </div>
        </div>
    )
}

export default UserPanel;