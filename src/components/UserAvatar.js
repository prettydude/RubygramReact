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

const UserAvatar = ({user}) => {
    const image = user.image;

    return (
        <div className="user-avatar" style={{backgroundColor: AVATAR_COLORS[user.id % AVATAR_COLORS.length]}}>
            {image ? 
                <img src={image} alt={`${user.name} avatar`} className="avatar-image"/>
                :
                <div className="avatar-text">
                    {(user.name || "???").slice(0, 2)}
                </div>
            }
        </div>
    )
}

export default UserAvatar;