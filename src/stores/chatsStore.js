import { createSlice } from "@reduxjs/toolkit";
import ChannelsManager from "../channels/ChannelsManager";
import store from "../store";

const TYPING_TIMEOUT = 5000;

const initialState = {
    chats: []
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addChat(state, action) {
            if (state.chats.find(chat => chat.id === action.payload?.id)) return; //already stored
            state.chats = [...state.chats, action.payload].sort(chatComparator);
        },
        setChats(state, action) {
            state.chats = action.payload.sort(chatComparator);
        },
        removeChat(state, action) {
            state.chats = state.chats.filter(el => el.id !== action.payload?.id);
        },
        clearChats(state, action) {
            state.chats = []
        },
        appendChatMessage(state, action) {
            const message = action.payload;
            const chat = state.chats.find(chat => chat.id === message.conversation_id);
            if (chat) {
                chat.preview = message.body
                chat.last_at = message.created_at
                state.chats.sort(chatComparator);
            } else {
                ChannelsManager.chats.requestChatInfo(message.user_id); // message from new chat
            }
        },
        setTyping(state, action) {
            const id = action.payload;
            const chat = state.chats.find(chat => chat.id === id);
            if(chat) {
                chat.action = "Typing";
                chat.actionEnd = Date.now() + TYPING_TIMEOUT;

                setTimeout(() => {
                    store.dispatch(checkTyping());
                }, TYPING_TIMEOUT);
            }
        },

        checkTyping(state, action) {
            const now = Date.now();
            state.chats.forEach(chat => {
                if(chat.actionEnd < now) {
                    chat.action = "";
                }
            })
        }
    },
})

// TODO return only last message
function chatComparator(chat1, chat2) {
    return chat2.last_at.localeCompare(chat1.last_at); //desc
}

// Reducer
export default chatsSlice.reducer;

// Actions
export const {
    addChat,
    removeChat,
    setChats,
    clearChats,
    appendChatMessage,
    setTyping,
    checkTyping,
} = chatsSlice.actions;

//Selectors

export const selectChats = (state) => state.chats.chats;