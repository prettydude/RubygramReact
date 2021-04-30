import classNames from "classnames";
import "./Input.scss";

const Input = ({
    id,
    type = "text",
    width = "auto",
    name = null,
    label = "",
    onChange,
    onKeyPress,
    onFocus,
    pattern,
    onBlur,
    value="",
    autoFocus,
    error,
    success,
    filledText, // shows on top when something is in input
    disabled = false,
    onKeyDown,
    maxLength,
}) => {
    let text = label;

    if (error) {
        success = false;
        text = error;
    } else if (success) {
        error = false;
        text = success || label;
    }

    return (
        <div className="VInput" css-width={width}>
            <input id={id}
                disabled={disabled ? "true" : undefined}
                className={classNames({ "invalid": error, "success": success })}
                type={type}
                placeholder={text}
                name={name}
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                onBlur={onBlur}
                onFocus={onFocus}
                autoFocus={autoFocus}
                maxLength={maxLength}
                onKeyDown={onKeyDown}
                pattern={pattern}
            />

            <label htmlFor={name}>{(value && filledText) ? filledText : text}</label>
        </div>
    );
}

export default Input;