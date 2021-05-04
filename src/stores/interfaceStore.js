import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    darkMode: false,
    deviseErrors: null,
    searchMode: false,
    searchResults: [],
    contextMenuLocation: {x: 0, y:0}
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

        setSearchMode(state, action) {
            state.searchMode = action.payload;
        },

        setSearchResults(state, action) {
            state.searchResults = action.payload;
        },

        resetSearchResults(state, action) {
            state.searchResults = [];
        },

        setContextMenuLocation(state, action) {
            state.contextMenuLocation = action.payload;
        }
    },
})

// Reducer
export default interfaceSlice.reducer;

// Actions
export const {
    setDarkMode,
    setDeviseErrors,
    clearDeviseErrors,
    setSearchMode,
    setSearchResults,
    resetSearchResults,
    setContextMenuLocation
} = interfaceSlice.actions;

//Selectors

export const selectDarkMode = (state) => state.interface.darkMode;
export const selectDeviseErrors = (state) => state.interface.deviseErrors;
export const selectSearchMode = state => state.interface.searchMode;
export const selectSearchResults = state => state.interface.searchResults;
export const selectContextMenuItems = state => state.interface.contextMenuItems;
export const selectContextMenuLocation = state => state.interface.contextMenuLocation;