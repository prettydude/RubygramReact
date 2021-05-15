const LoaderComponent = () => {

    return (
        <div style={{
            position: "relative",
            width: "100%",
            height: "100%"
        }} className="loader">
            <img src="./images/loader.gif" alt="Loading..." style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "2em",
                height: "2em"
            }}/>
        </div>
    )
}

export default LoaderComponent;