import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSignIn, selectVerificationBeenAttempted} from "../stores/authStore"

const LOGIN_URL = "/login"

export function signInWrapper(WrappedComponent, ...otherProps) {
    return ({history}) => {
        let isSignedIn = useSelector(selectSignIn);
        let hasVerificationBeenAttempted = useSelector(selectVerificationBeenAttempted);

        useEffect(() => {
            if (hasVerificationBeenAttempted && !isSignedIn) {
                history.replace(LOGIN_URL)
            }
        }, [isSignedIn, hasVerificationBeenAttempted, history])
        return hasVerificationBeenAttempted && isSignedIn ? 
                <WrappedComponent {...otherProps} /> 
                : 
                <div>Logging in...</div>;
    }
}