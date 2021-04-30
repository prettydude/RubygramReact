import { signOutUser } from "../stores/authStore";
import UserAvatar from "./UserAvatar";
import "./UserPanel.scss";

const UserPanel = ({user}) => {
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
            </div>
            <div className="actions">
                <button onClick={() => {
                    signOutUser().catch(err => console.log(err))
                }}>Log out</button>
            </div>
        </div>
    )
}

export default UserPanel;