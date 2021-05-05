import { generateAuthActions } from '@keymastervn/redux-token-auth';
import axios from 'axios';
import store from '../store';
import { setDeviseErrors } from './interfaceStore';

// eslint-disable-next-line no-undef
const AUTH_URL = __IS_PRODUCTION__ ? "https://rubygramreact.herokuapp.com/auth" : "http://localhost:3000/auth"

export const initialAuthState = {
    currentUser: {
        isLoading: false,
        isSignedIn: false,
        hasVerificationBeenAttempted: false,
        attributes: {
            email: null,
            name: null,
            nickname: null,
            image: null,
        },
    },
}

const config = {
    authUrl: AUTH_URL,
    storage: window.localStorage,
    userAttributes: {
        email: "email",
        nickname: "nickname",
        name: "name",
        id: "id",
        provider: "provider",
        image: "image",
    },
    userRegistrationAttributes: {
        nickname: 'nickname',
        name: 'name',
        image: "image",
    },
}

//catch server validation messages, because library can't
axios.interceptors.response.use(null, error => {
    const response = error.response;
    if(response && response.config.url.includes(AUTH_URL) && response.data.errors) {
        store.dispatch(setDeviseErrors(response.data.errors));
        return Promise.reject(new Error("Validation error"));
    } else {
        return Promise.reject(error);
    }
});

const actions = generateAuthActions(config);
export const registerUser = (...props) => actions.registerUser(...props)(store.dispatch);
export const signInUser = (...props) => actions.signInUser(...props)(store.dispatch);
export const signOutUser = (...props) => actions.signOutUser(...props)(store.dispatch);
export const verifyCredentials = actions.verifyCredentials;

export const selectCurrentUser = (state) => ({...state.reduxTokenAuth.currentUser, ...state.reduxTokenAuth.currentUser.attributes});
export const selectSignIn = (state) => state.reduxTokenAuth.currentUser.isSignedIn;
export const selectVerificationBeenAttempted = (state) => state.reduxTokenAuth.currentUser.hasVerificationBeenAttempted
