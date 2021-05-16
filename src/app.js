import React, { useEffect } from 'react'
import { HashRouter, Route, Switch } from "react-router-dom"
import ContextMenuWrapper from './components/ContextMenuComponent'
import Theme from "./components/Theme"
import Login from './routes/Login'
import Messenger from "./routes/Messenger"
import store from './store'
import { verifyCredentials } from './stores/authStore'
import { signInWrapper } from "./utils/authHelper"
import { initCurrentUserListener } from "./utils/currentUser"


// eslint-disable-next-line no-undef
console.log(`Running in ${__IS_PRODUCTION__ ? "production" : "development"} mode`);

const App = () => {
    // Init once
    useEffect(() => {
        verifyCredentials(store);
        initCurrentUserListener();
    }, [])

    return (
        <Theme>
            <ContextMenuWrapper/>
            <HashRouter>
                <Switch>
                    <Route exact={true} path="/" component={signInWrapper(Messenger)} />
                    <Route path="/login" component={Login} />
                </Switch>
            </HashRouter>
        </Theme>
    )
}

export default App;