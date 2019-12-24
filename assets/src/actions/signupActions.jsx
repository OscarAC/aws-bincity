import { SIGNUP_STARTED, SIGNUP_SUCCESS, SIGNUP_ERROR } from './types';
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