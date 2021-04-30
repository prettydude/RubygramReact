import classNames from "classnames";
import "./Button.scss";
const Button = ({
        flat = false,
        uppercase = true,

        className,
        children,

        ...otherArgs
    }) => {
    return (
        <button className={classNames({
            "VButton": true,
            flat,
            uppercase,
        }, className)} {...otherArgs}>
            {children}
        </button>
    );
}

export default Button;