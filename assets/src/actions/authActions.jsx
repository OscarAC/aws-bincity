import { LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, NEW_PASSWORD_REQUIRED } from './types';
import Auth from "@aws-amplify/auth";

export const updateAuthStatus = (user, authenticated) => dispatch => {

    if (authenticated)
        dispatch(loginSuccess(user));
}

export const authenticate = (email, password) => dispatch => {

    dispatch(loginStarted());

    Auth.signIn(email, password)

        .then(res => {

            if (res.challengeName === 'NEW_PASSWORD_REQUIRED') {
                dispatch({
                    type: NEW_PASSWORD_REQUIRED,
                    user: res
                })
            }
            else {

                dispatch(loginSuccess(res));
            }
        })
        .catch(err => {

            dispatch(loginError(err.message));
        });
}

export const updatePassword = (user, newPassword) => dispatch => {

    dispatch(loginStarted());

    Auth.completeNewPassword(user, newPassword)

        .then(res => {

            dispatch(loginSuccess(res));
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

const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    user: user
});

const loginError = (msg) => ({
    type: LOGIN_ERROR,
    errorMessage: msg
});

const logoutSuccess = () => ({
    type: LOGOUT
})