import { FETCH_AUTH, LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_ERROR } from './types';
import Auth from "@aws-amplify/auth";

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

    // await Auth.signOut();

    // dispatch({
    //     type: LOGOUT,
    //     isAuthenticated: false,
    //     authenticationError: false
    // });
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