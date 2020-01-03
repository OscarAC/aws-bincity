import { LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './types';
import Auth from "@aws-amplify/auth";

export const updateAuthStatus = (authenticated) => dispatch => {

    if(authenticated)
        dispatch(loginSuccess());
}

export const authenticate = (email, password) => dispatch => {

    dispatch(loginStarted());

    Auth.signIn(email, password)

        .then(res => {

            dispatch(loginSuccess());
        })
        .catch(err => {

            dispatch(loginError(err.message));
        });
}

export const logout = () => dispatch => {

    Auth.signOut();
    dispatch(logoutSuccess());
}

const loginStarted = () => ({
    type: LOGIN_STARTED
});

const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

const loginError = (msg) => ({
    type: LOGIN_ERROR,
    errorMessage: msg
});

const logoutSuccess = () => ({
    type: LOGOUT
})