import { generateAuthActions } from '@keymastervn/redux-token-auth';
import store from '../store';

// eslint-disable-next-line no-undef
const AUTH_URL = __IS_PRODUCTION__ === "true" ? "https://rubygramreact.herokuapp.com/auth" : "http://localhost:3000/auth"

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

const actions = generateAuthActions(config);

export const registerUser = (...props) => actions.registerUser(...props)(store.dispatch);
export const signInUser = (...props) => actions.signInUser(...props)(store.dispatch);
export const signOutUser = (...props) => actions.signOutUser(...props)(store.dispatch);
export const verifyCredentials = actions.verifyCredentials;

export const selectCurrentUser = (state) => ({...state.reduxTokenAuth.currentUser, ...state.reduxTokenAuth.currentUser.attributes});
export const selectSignIn = (state) => state.reduxTokenAuth.currentUser.isSignedIn;
export const selectVerificationBeenAttempted = (state) => state.reduxTokenAuth.currentUser.hasVerificationBeenAttempted
