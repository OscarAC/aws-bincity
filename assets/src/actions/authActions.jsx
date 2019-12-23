import { FETCH_AUTH, LOGOUT } from './types';

export const authenticate = (value) => dispatch => {
    dispatch({
        type: FETCH_AUTH,
        isAuthenticated: value
    });
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT        
    });
}