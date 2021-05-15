import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import LoaderComponent from "../components/LoaderComponent";
import { selectSignIn, selectVerificationBeenAttempted } from "../stores/authStore";

const LOGIN_URL = "/login"

export function signInWrapper(WrappedComponent, ...otherProps) {
    return () => {
        let isSignedIn = useSelector(selectSignIn);
        let hasVerificationBeenAttempted = useSelector(selectVerificationBeenAttempted);
        let history = useHistory();

        useEffect(() => {
            if (hasVerificationBeenAttempted && !isSignedIn) {
                history.replace(LOGIN_URL)
            }
        }, [isSignedIn, hasVerificationBeenAttempted, history])
        return hasVerificationBeenAttempted && isSignedIn ? 
                <WrappedComponent {...otherProps} /> 
                : 
                <LoaderComponent/>;
    }
}