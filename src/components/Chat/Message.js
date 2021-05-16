import classNames from "classnames";
import ReactMarkdown from 'react-markdown';
import { useSelector } from "react-redux";
import gfm from 'remark-gfm';
import ChannelsManager from "../../channels/ChannelsManager";
import { selectCurrentUser } from "../../stores/authStore";
import { copyTextToClipboard } from "../../utils/clipboard";
import { DATE_FORMAT, TIME_FORMAT } from "../../utils/date";
import { downloadURL, formatSize, iconForFilename } from "../../utils/document";
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

    const items = [{
        icon: "copy",
        title: "Copy",
        onClick: () => copyTextToClipboard(message.body)
    }];

    if (own) {
        items.push({
            icon: "delete",
            red: true,
            title: "Delete",
            onClick: () => ChannelsManager.messages.delete(message.id)
        })
    }

    const isImage = message.file?.content_type?.startsWith("image");
    return (
        <div className={classes} onContextMenu={contextMenuListener(items)}>
            {!own && <UserAvatar user={message.user} />}
            <div className="message">
                {!own && <div className="name">
                    {message.user.name}
                </div>}
                <div className="content-wrapper">
                    {message.file_url && <div className={`attachment ${isImage ? "no-pad" : ""}`}>
                        {isImage ? <img src={message.file_url} className="attachment-image" alt="Attachment" />
                            :
                            <div className="attachment-file" onClick={() => downloadURL(message.file_url)}>
                                <div className="icon">
                                    {iconForFilename(message.file.filename)}
                                </div>
                                <div className="file-info">
                                    <div className="filename">{message.file.filename}</div>
                                    <div className="filesize">{formatSize(message.file.byte_size)}</div>
                                </div>
                            </div>
                        }
                    </div>}
                    {message.body && <span className="text">
                        <ReactMarkdown skipHtml={true} remarkPlugins={[gfm]} linkTarget="_blank" components={{ code: CodeBlock }} allowedElemensts={ALLOWED_ELEMENTS}>
                            {message.body}
                        </ReactMarkdown>
                    </span>}
                    <div className="time" title={new Date(message.updated_at).toLocaleString(window.navigator.language, { ...TIME_FORMAT, ...DATE_FORMAT })}>
                        {new Date(message.updated_at).toLocaleString(window.navigator.language, TIME_FORMAT)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message;