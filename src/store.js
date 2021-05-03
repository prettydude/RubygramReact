/* eslint-disable no-undef */
import { reduxTokenAuthReducer } from '@keymastervn/redux-token-auth';
import { configureStore } from '@reduxjs/toolkit';
import activeChatReducer from './stores/activeChatStore';
import { initialAuthState } from './stores/authStore';
import chatsReducer from './stores/chatsStore';
import interfaceReducer from "./stores/interfaceStore";
import usersReducer from "./stores/userStore";


const store = configureStore({
    reducer: {
        chats: chatsReducer,
        users: usersReducer,
        activeChat: activeChatReducer,
        interface: interfaceReducer,
        reduxTokenAuth: reduxTokenAuthReducer,
    },
    devTools: !__IS_PRODUCTION__,
    preloadedState: {
        reduxTokenAuth: initialAuthState
    }
})

if(!__IS_PRODUCTION__) {
    window.store = store;
}

export default store;