import React, { useEffect } from 'react'
import { HashRouter, Route, Switch } from "react-router-dom"
import ChannelsManager from './channels/ChannelsManager'
import Login from './routes/Login'
import Messenger from "./routes/Messenger"
import store from './store'
import { verifyCredentials } from './stores/authStore'
import { signInWrapper } from "./utils/authHelper"
import { initCurrentUserListener } from "./utils/currentUser"



// eslint-disable-next-line no-undef
console.log(`Running in ${__IS_PRODUCTION__ === "true" ? "production" : "development"} mode`);

const App = () => {
    // Init once
    useEffect(() => {
        ChannelsManager.init();
        verifyCredentials(store);
        initCurrentUserListener();
    }, [])

    return (
        <HashRouter>
            <Switch>
                <Route exact={true} path="/" component={signInWrapper(Messenger)} />
                <Route path="/login" component={Login} />
            </Switch>
        </HashRouter>
    )
}

export default App;