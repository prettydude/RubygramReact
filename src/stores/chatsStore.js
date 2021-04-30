import { createSlice } from "@reduxjs/toolkit";
import ChannelsManager from "../channels/ChannelsManager";

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
                chat.messages.push(message);
                state.chats.sort(chatComparator);
            } else {
                ChannelsManager.chats.requestChatInfo(message.user_id); // message from new chat
            }
        }
    },
})

// TODO return only last message
function chatComparator(chat1, chat2) {
    const sorted1 = [...chat1.messages].sort(updatedComparator);
    const sorted2 = [...chat2.messages].sort(updatedComparator);

    const last1 = sorted1[sorted1.length - 1];
    const last2 = sorted2[sorted2.length - 1];

    return updatedComparator(last2, last1); // desc
}

function updatedComparator(obj1, obj2) {
    return obj1.updated_at.localeCompare(obj2.updated_at);
}

// Reducer
export default chatsSlice.reducer;

// Actions
export const {
    addChat,
    removeChat,
    setChats,
    clearChats,
    appendChatMessage
} = chatsSlice.actions;

//Selectors

export const selectChats = (state) => state.chats.chats;