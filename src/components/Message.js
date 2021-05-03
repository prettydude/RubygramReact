import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../stores/authStore";
import { TIME_FORMAT } from "../utils/date";
import "./Message.scss";
import UserAvatar from "./UserAvatar";

const Message = ({message}) => {

    const user = useSelector(selectCurrentUser);
    const own = message.user.id === user.id;

    const classes = classNames({
        "message-wrapper": true,
        out: own,
        in: !own,
    })

    return (
        <div className={classes}>
            {!own && <UserAvatar user={message.user}/>}
            <div className="message">
                {!own && <div className="name">
                    {message.user.name}
                </div>}
                <div className="text-wrapper">
                    <span className="text">
                        {message.body}
                    </span>
                    <div className="time">
                        {new Date(message.updated_at).toLocaleString(window.navigator.language, TIME_FORMAT)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message;