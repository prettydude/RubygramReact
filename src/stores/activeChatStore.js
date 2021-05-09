import { createSlice } from "@reduxjs/toolkit";
import ChannelsManager from "../channels/ChannelsManager";
import { getUser } from "../utils/currentUser";

const initialState = {
    peer: null,
    conversationId: -1,
    messages: []
}

const activeChatSlice = createSlice({
    name: 'activeChat',
    initialState,
    reducers: {
        // toolkit should ensure immutability
        setMessages(state, action) {
            const messages = action.payload;
            if(messages.length) {
                if(messages[0].conversation_id === state.conversationId) {
                    state.messages = messages
                }
            } else {
                state.messages = messages;
            }
        },

        clearMessages(state, action) {
            state.messages = []
        },

        deleteMessage(state, action) {
            if(state.messages[state.messages.length - 1].id === action.payload) { // last
                ChannelsManager.chats.requestChatInfo(state.conversation_id); //ask for new last message
            }
            state.messages = state.messages.filter(msg => msg.id !== action.payload);
        },

        appendMessages(state, action) {
            state.messages = state.messages.concat(action.payload)
        },

        appendMessageIfCurrent(state, action) {
            if(state.conversationId === action.payload.conversation_id) {
                state.messages = [...state.messages, action.payload];
            }
        },

        setPeer(state, action) {
            state.peer = action.payload
        },

        clearPeer(state, action) {
            state.peer = null
            state.conversationId = -1;
        },

        resetActiveChat(state) {
            return initialState;
        },

        setConversation(state, action) {
            const currentUser = getUser().id; //idk if this is a good pratice
            state.peer = currentUser === action.payload.recipient.id ? action.payload.sender : action.payload.recipient;
            state.messages = action.payload.messages;
            state.conversationId = action.payload.id
        },

        checkAndUpdatePeerAvatar(state, action) {
            const user = action.payload;
            if(state.peer?.id === user.id) state.peer = user;
        }
    },
})

// Reducer
export default activeChatSlice.reducer;

// Actions
export const {
    setMessages,
    deleteMessage,
    clearMessages,
    appendMessages,
    appendMessageIfCurrent,
    setPeer,
    clearPeer,
    resetActiveChat,
    setConversation,
    checkAndUpdatePeerAvatar
} = activeChatSlice.actions;

//Selectors

export const selectPeer = (state) => state.activeChat.peer;
export const selectMessages = (state) => state.activeChat.messages;
export const selectCurrentChatId = state => state.activeChat.conversationId;