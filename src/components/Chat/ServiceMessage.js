import "./ServiceMessage.scss";

const ServiceMessage = ({date}) => {
    return (
        <div className="service-message">
            {date.toLocaleDateString(window.navigator.language, {day: "numeric", month: "long", year: "numeric"})}
        </div>
    )
}

export default ServiceMessage;