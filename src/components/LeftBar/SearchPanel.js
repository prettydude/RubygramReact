import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChannelsManager from "../../channels/ChannelsManager";
import { selectSearchResults, setSearchMode } from "../../stores/interfaceStore";
import { throttle } from "../../utils/functions";
import IconButton from "../Basic/IconButton";
import Input from "../Basic/Input";
import UserAvatar from "../UserAvatar";
import "./SearchPanel.scss";

const SearchPanel = () => {
    const [search, setSearch] = useState("");
    const searchResults = useSelector(selectSearchResults);
    const dispatch = useDispatch();

    const throttled = useRef(throttle((search) => ChannelsManager.chats.searchUsers(search), 500));

    useEffect(() => {
        throttled.current(search)
    }, [search]);

    return (
        <div className="search-panel">
            <div className="search-panel-header">
                <IconButton className="back" icon="back" onClick={() => dispatch(setSearchMode(false))}/>
                <Input label="Search" value={search} onChange={ev => setSearch(ev.currentTarget.value)}/>
            </div>
            <div className="search-results">
                {searchResults.map(user => <UserFragment user={user} key={user.id}/>)}
            </div>
        </div>
    )
}

const UserFragment = ({user}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div className="user" onClick={() => {
                history.replace("?peer="+user.id);
                dispatch(setSearchMode(false));
            }}>
            <UserAvatar user={user}/>
            <div className="info">
                <div className="user-name">{user.name}</div>
                {user.nickname && <div className="user-nickname">{user.nickname}</div>}
            </div>
        </div>
    )
}

export default SearchPanel;