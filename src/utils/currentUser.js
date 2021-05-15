//костиль для деяких редюсерів які це перевіряють

import store from "../store";
import { selectCurrentUser } from "../stores/authStore";

let user = store?.getState?.()?.reduxTokenAuth?.currentUser || {};

export function initCurrentUserListener() {
    store.subscribe(() => {
        user = selectCurrentUser(store.getState());
    });
}

export function getUser() {
    return user;
}

window.getUser = getUser;
