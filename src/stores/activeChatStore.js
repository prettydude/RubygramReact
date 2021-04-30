import { createSlice } from "@reduxjs/toolkit";
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
        },

        resetActiveChat(state) {
            state = initialState
        },

        setConversation(state, action) {
            const currentUser = getUser().id; //idk if this is a good pratice
            state.peer = currentUser === action.payload.recipient.id ? action.payload.sender : action.payload.recipient;
            state.messages = action.payload.messages;
            state.conversationId = action.payload.id
        }
    },
})

// Reducer
export default activeChatSlice.reducer;

// Actions
export const {
    setMessages,
    clearMessages,
    appendMessages,
    appendMessageIfCurrent,
    setPeer,
    clearPeer,
    resetActiveChat,
    setConversation 
} = activeChatSlice.actions;

//Selectors

export const selectPeer = (state) => state.activeChat.peer;
export const selectMessages = (state) => state.activeChat.messages;