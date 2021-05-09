import "./UserAvatar.scss";

const AVATAR_COLORS = [
    "#cc90e2",
    "#80d066",
    "#ecd074",
    "#6fb1e4",
    "#e57979",
    "#f98bae",
    "#73cdd0",
    "#fba76f"
]

const UserAvatar = ({user, ...otherProps}) => {
    const url = user.avatar_url;

    return (
        <div className="user-avatar" style={{backgroundColor: url ? "black" : AVATAR_COLORS[user.id % AVATAR_COLORS.length]}} {...otherProps}>
            <div className="avatar-text">
                {(user.name || "???").slice(0, 2)}
            </div>
            {url && <img src={url} alt={`${user.name} avatar`} className="avatar-image"/>}
        </div>
    )
}

export default UserAvatar;