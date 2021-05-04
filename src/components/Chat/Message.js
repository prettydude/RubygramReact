import classNames from "classnames";
import ReactMarkdown from 'react-markdown';
import { useSelector } from "react-redux";
import gfm from 'remark-gfm';
import ChannelsManager from "../../channels/ChannelsManager";
import { selectCurrentUser } from "../../stores/authStore";
import { DATE_FORMAT, TIME_FORMAT } from "../../utils/date";
import CodeBlock from "../Basic/CodeBlock";
import { contextMenuListener } from "../ContextMenuComponent";
import UserAvatar from "../UserAvatar";
import "./Message.scss";

const ALLOWED_ELEMENTS = ["p", "span", "b", "strong", "i", "em", "a", "del", "s", "pre", "code", "text"];

const Message = ({ message }) => {

    const user = useSelector(selectCurrentUser);
    const own = message.user.id === user.id;

    const classes = classNames({
        "message-wrapper": true,
        out: own,
        in: !own,
    })

    const items = []

    if (own) {
        items.push({
            icon: "delete",
            red: true,
            title: "Delete",
            onClick: () => ChannelsManager.messages.delete(message.id)
        })
    }

    return (
        <div className={classes} onContextMenu={contextMenuListener(items)}>
            {!own && <UserAvatar user={message.user} />}
            <div className="message">
                {!own && <div className="name">
                    {message.user.name}
                </div>}
                <div className="text-wrapper">
                    <span className="text">
                        <ReactMarkdown skipHtml={true} remarkPlugins={[gfm]} linkTarget="_blank" components={{ code: CodeBlock }} allowedElemensts={ALLOWED_ELEMENTS}>
                            {message.body}
                        </ReactMarkdown>
                    </span>
                    <div className="time" title={new Date(message.updated_at).toLocaleString(window.navigator.language, { ...TIME_FORMAT, ...DATE_FORMAT })}>
                        {new Date(message.updated_at).toLocaleString(window.navigator.language, TIME_FORMAT)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message;