import { createConsumer } from "@rails/actioncable";
import store from "../store";
import { selectCurrentUser, selectVerificationBeenAttempted } from "../stores/authStore";

// eslint-disable-next-line no-undef
const WS_URL = __IS_PRODUCTION__ ? "wss://rubygramreact.herokuapp.com/cable" : "ws://localhost:3000/cable"
const RECONNECT_INTERVAL = 10000;

class Channel {
    constructor() {
        const ver = selectVerificationBeenAttempted(store.getState());
        this.currentAuth = selectCurrentUser(store.getState());

        if(ver && this.currentAuth?.id) this._consumer = createConsumer(this._makeSocketUrl());
        
        this.unsubscribe = store.subscribe(() => {
            let previousAuth = this.currentAuth
            this.currentAuth = selectCurrentUser(store.getState())
            if(!this.currentAuth || this.currentAuth.id !== previousAuth.id) { //user changed
                this.reconnect();
            }
        })

        this.connected = false;
        this.queue = [];
    }

    reconnect() {
        let authData = this._loadAuthData();
        if(!authData.uid) return;
        if(this._consumer) {
            this._consumer.disconnect();
            this._consumer._url = this._makeSocketUrl();
            this._consumer.connect();
        } else {
            this._consumer = createConsumer(this._makeSocketUrl());
        }
        this.onReconnect();
    }

    onReconnect() {
        // extend
    }

    get consumer() {
        return this._consumer;
    }

    create(param, listeners) {
        //wrap basic event handlers
        let wrappedConnected = listeners.connected;
        listeners.connected = () => {
            this.connected = true;
            this._onConnect();
            wrappedConnected?.();
        }

        let wrappedDisconnected = listeners.disconnected;
        listeners.disconnected = () => {
            this.connected = false;
            this._onDisconnect();
            wrappedDisconnected?.();
        }

        return this._consumer?.subscriptions?.create(param, listeners);
    }

    performOrQueue(...params) {
        if(params.length === 1) params.push({});
        if(!this.connected) {
            this.queue.push(params);
            return;
        }
        if(!this.subscription.perform(...params)) {
            this.queue.push(params);
        }
    }

    _onConnect() {
        clearInterval(this.reconnectInterval);
        for(let params of this.queue) {
            if(!this.subscription.perform(...params)) {
                console.error("Failed to perform queued operation!")
            }
        }
        this.queue = []; // clear queue after tries
    }

    _onDisconnect() {
        clearInterval(this.reconnectInterval);

        let time = RECONNECT_INTERVAL;
        this.reconnectInterval = setInterval(() => {
            console.log("Trying to reconnect...")
            this.reconnect();
        }, time);
    }

    _loadAuthData() {
        return {
            "access-token": window.localStorage.getItem("access-token") || "",
            uid: window.localStorage.getItem("uid") || "",
            client: window.localStorage.getItem("client") || "",
        }
    }

    _makeSocketUrl(authData) {
        if(!authData) authData = this._loadAuthData();
        const {"access-token": accessToken, uid, client} = authData;
        return `${WS_URL}?access-token=${accessToken}&uid=${uid}&client=${client}`;
    }

    close() {
        this.unsubscribe();
        this._consumer.disconnect();
    }
}

export default Channel;