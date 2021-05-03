import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    darkMode: false,
    deviseErrors: null,
}

const interfaceSlice = createSlice({
    name: 'interface',
    initialState,
    reducers: {
        setDarkMode(state, action) {
            state.darkMode = action.payload
        },

        setDeviseErrors(state, action) {
            state.deviseErrors = action.payload
        },

        clearDeviseErrors(state, action) {
            state.deviseErrors = []
        },
    },
})

// Reducer
export default interfaceSlice.reducer;

// Actions
export const {
    setDarkMode,
    setDeviseErrors,
    clearDeviseErrors
} = interfaceSlice.actions;

//Selectors

export const selectDarkMode = (state) => state.interface.darkMode;
export const selectDeviseErrors = (state) => state.interface.deviseErrors;