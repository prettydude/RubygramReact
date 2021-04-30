import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Button from "../components/Basic/Button";
import Input from "../components/Basic/Input";
import { resetActiveChat } from "../stores/activeChatStore";
import { registerUser, selectCurrentUser, signInUser } from "../stores/authStore";
import { clearChats } from "../stores/chatsStore";
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

    const dispatch = useDispatch();

    //clear store
    useEffect(() => {
        dispatch(resetActiveChat());
        dispatch(clearChats());
        dispatch(clearUsers());
    }, [dispatch]);

    useEffect(() => {
        if(user.isSignedIn && !user.isLoading) history.replace("/"); //redirect to main
    }, [user, history]);

    if(user.isLoading || !user.hasVerificationBeenAttempted) {
        return <div>Loading...</div>
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
                <Button onClick={() => registerUser({ 
                    email,
                    name,
                    password,
                    passwordConfirmation: confirmPassword,
                    nickname,
                 }).then(() => console.log("Signed up"))
                    .catch(err => console.log(err))}>Sign up</Button>
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
                <Button onClick={() => signInUser({email, password})
                                        .then(() => console.log("Logged in"))
                                        .catch(err => console.log(err))}>Sign in</Button>
                <Button flat className="sign-up" onClick={() => setSignUp(true)}>Sign up</Button>
            </div>
        )
    }

    return <div className="login">{content}</div>
}

export default Login;