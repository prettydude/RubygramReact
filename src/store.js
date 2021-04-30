import { configureStore } from '@reduxjs/toolkit'

import chatsReducer from './stores/chatsStore'
import usersReducer from "./stores/userStore"
import activeChatReducer from './stores/activeChatStore';
import {initialAuthState} from './stores/authStore';
import { reduxTokenAuthReducer } from '@keymastervn/redux-token-auth';

const store = configureStore({
    reducer: {
        chats: chatsReducer,
        users: usersReducer,
        activeChat: activeChatReducer,
        reduxTokenAuth: reduxTokenAuthReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {
        reduxTokenAuth: initialAuthState
    }
})

if(process.env.NODE_ENV !== 'production') {
    window.store = store;
}

export default store;