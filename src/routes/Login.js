import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Button from "../components/Basic/Button";
import Input from "../components/Basic/Input";
import { resetActiveChat } from "../stores/activeChatStore";
import { registerUser, selectCurrentUser, signInUser } from "../stores/authStore";
import { clearChats } from "../stores/chatsStore";
import { selectDeviseErrors } from "../stores/interfaceStore";
import { clearUsers } from "../stores/userStore";

const Login = () => {
    const user = useSelector(selectCurrentUser);
    const history = useHistory();
  	const [signUp, setSignUp] = useState(false);
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const deviseErrors = useSelector(selectDeviseErrors);

    const dispatch = useDispatch();
    
    //clear store
    useEffect(() => {
        dispatch(resetActiveChat());
        dispatch(clearChats());
        dispatch(clearUsers());
    }, [dispatch]);

    useEffect(() => {
        if(deviseErrors?.full_messages) {
            setError(deviseErrors.full_messages[0]);
        } else {
            setError(deviseErrors);
        }
    }, [deviseErrors]);

    useEffect(() => {
        setError(""); //remove error message on input change
    }, [email, name, nickname, password, confirmPassword, signUp])

    useEffect(() => {
        if(user.isSignedIn && !user.isLoading) history.replace("/"); //redirect to main
    }, [user, history]);

    if(user.isLoading || !user.hasVerificationBeenAttempted) {
        return <div>Loading...</div>
    }

    const validate = (register) => {
        if(!validateEmail(email)) {
            setError("Bad email format!");
            return false;
        }

        if(password.length < 6) {
            setError("Password must be 6 symbols or longer");
            return false;
        }

        if(register) {
            if(!name) {
                setError("Name can't be blank!");
                return false;
            }
            if(!nickname) {
                setError("Nickname can't be blank!");
                return false;
            }

            if(password !== confirmPassword) {
                setError("Passwords don't match!");
                return false;
            }
        }

        return true;
    }

    let content;

    if(signUp) {
        content = (
            <div className="panel sign-up">
                <img src="./images/rubygram.png" alt="Rubygram" className="logo"/>
                <div className="panel-title">Sign up</div>
                <Input type="text" label="E-mail" onChange={ev => setEmail(ev.currentTarget.value)} value={email}/>
                <Input type="text" label="Name" onChange={ev => setName(ev.currentTarget.value)} value={name}/>
                <Input type="text" label="Nickname" onChange={ev => setNickname(ev.currentTarget.value)} value={nickname}/>
                <Input type="password" label="Password" onChange={ev => setPassword(ev.currentTarget.value)} value={password}/>
                <Input type="password" label="Confirm Password" onChange={ev => setConfirmPassword(ev.currentTarget.value)} value={confirmPassword}/>
                { error && <div className="error">{error}</div>}
                <Button onClick={() => validate(true) && registerUser({ 
                    email,
                    name,
                    password,
                    passwordConfirmation: confirmPassword,
                    nickname,
                 }).then(() => console.log("Signed up"))
                    /*.catch(err => console.log(err))*/}>Sign up</Button>
                <Button flat onClick={() => setSignUp(false)}>Already registered?</Button>
            </div>
        )
    } else {
        content= (
            <div className="panel sign-in">
                <img src="./images/rubygram.png" alt="Rubygram" className="logo"/>
                <div className="panel-title">Sign in</div>
                <Input type="email" label="E-mail" onChange={ev => setEmail(ev.currentTarget.value)} value={email}/>
                <Input type="password" label="Password" onChange={ev => setPassword(ev.currentTarget.value)} value={password}/>
                { error && <div className="error">{error}</div>}
                <Button onClick={() => validate() && signInUser({email, password})
                                        .then(() => console.log("Logged in"))
                                        /*.catch(err => console.log(err))*/}>Sign in</Button>
                <Button flat className="sign-up" onClick={() => setSignUp(true)}>Sign up</Button>
            </div>
        )
    }

    return <div className="login">{content}</div>
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default Login;