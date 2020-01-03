import { FETCH_AUTH, LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, NEW_PASSWORD_REQUIRED } from '../actions/types';

const initialState = {
    authenticated: false,
    error: false,
    errorMessage: '',
    loading: false,
    newpasswordrequired: false,
    user: null
}

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_AUTH:
            return {
                ...state,
                authenticated: action.authenticated,
                error: action.error,
                errorMessage: action.errorMessage,
                loading: action.loading
            };

        case  LOGIN_STARTED:
            return {
                ...state,
                loading: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                error: false,
                errorMessage: '',
                loading: false,
                user: action.user
            }
        
        case LOGIN_ERROR:
            return {
                ...state,
                authenticated: false,
                error: true,
                errorMessage: action.errorMessage,
                loading: false
            }

        case NEW_PASSWORD_REQUIRED:
            return {
                ...state,
                user: action.user,
                authenticated: false,
                error: false,
                newpasswordrequired: true,
                loading: false
            }

        case LOGOUT:
            return {
                ...state,
                authenticated: false,
                error: false,
                errorMessage: '',
                loading: false
            }

        default:
            return state;
    }

}