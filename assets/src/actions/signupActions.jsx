import { SIGNUP_STARTED, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_CONFIRM_STARTED, SIGNUP_CONFIRM_SUCCESS, SIGNUP_CONFIRM_ERROR } from './types';
import Auth from "@aws-amplify/auth";

export const signup = (email, password) => dispatch => {

    dispatch(signupStarted());

    Auth.signUp({ username: email, password: password })

        .then(res => {

            dispatch(signupSuccess(res.user));
        })
        .catch(err => {

            dispatch(signupError(err.message));
        });
}

export const confirm = (email, code) => dispatch => {

    dispatch(confirmStarted());

    Auth.confirmSignUp(email, code)
        .then(res => {
            dispatch(confirmSuccess(res.user));
        })
        .catch(err => {
            dispatch(confirmError());
        })
}

const signupStarted = () => ({
    type: SIGNUP_STARTED
});

const signupSuccess = (user) => ({
    type: SIGNUP_SUCCESS,
    user: user
});

const signupError = (msg) => ({
    type: SIGNUP_ERROR,
    errorMessage: msg
});

const confirmStarted = () => ({
    type: SIGNUP_CONFIRM_STARTED
});

const confirmSuccess = (user) => ({
    type: SIGNUP_CONFIRM_SUCCESS,
    user: user
});

const confirmError = (msg) => ({
    type: SIGNUP_CONFIRM_ERROR,
    errorMessage: msg
});