import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    all: []
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.all = action.payload
        },

        clearUsers(state, action) {
            state.all = []
        },
    },
})

// Reducer
export default usersSlice.reducer;

// Actions
export const { setUsers, clearUsers } = usersSlice.actions;

//Selectors

export const selectUsers = (state) => state.users.all;