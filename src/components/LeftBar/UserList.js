import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChannelsManager from "../../channels/ChannelsManager";
import { selectUsers } from "../../stores/userStore";

const UserList = () => {
    const users = useSelector(selectUsers);

    useEffect(() => {
        ChannelsManager.chats.requestAllUsers();
    }, [])
    
    return (
        <div className="user-list">
            <h2>All users in the system:</h2>
            {users.length ? users.map(user => <UserFragment key={user.id} user={user}/>) : "No users! :O"}
        </div>
    )
}

const UserFragment = ({user}) => {
    let history = useHistory();
    return (
        <div className="user" onClick={() => {
            history.replace(`?peer=${user.id}`)
        }}>
            <div className="name">{user.name || "???"}</div>
            {/* <div className="nickname">{`@${user.nickname}`}</div> */}
        </div>
    )
}

export default UserList;