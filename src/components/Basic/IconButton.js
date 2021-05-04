import "./IconButton.scss";

const IconButton = ({icon, className, ...otherProps}) => {

    return (
        <button className={`icon-button ${className}`} {...otherProps}>
            <i className={`tgico tgico-${icon}`}/>
        </button>
    )
}

export default IconButton;