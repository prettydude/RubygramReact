import React, { useEffect } from 'react'

import { HashRouter, Switch, Route } from "react-router-dom"
import {signInWrapper} from "./utils/authHelper"
import {initCurrentUserListener} from "./utils/currentUser"
import ChannelsManager from './channels/ChannelsManager'

import Messenger from "./routes/Messenger"
import Login from './routes/Login'
import { verifyCredentials } from './stores/authStore'
import store from './store'

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