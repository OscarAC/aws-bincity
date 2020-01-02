import { SIGNUP_STARTED, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_CONFIRM_STARTED, SIGNUP_CONFIRM_SUCCESS, SIGNUP_CONFIRM_ERROR } from '../actions/types';

const initialState = {
    user: undefined,
    error: false,
    errorMessage: '',
    loading: false,
    confirmed: false
}

export default function (state = initialState, action) {

    switch (action.type) {

        case SIGNUP_STARTED:
            return {
                ...state,
                loading: true
            };

        case SIGNUP_SUCCESS:
            return {
                ...state,
                error: false,
                errorMessage: '',
                loading: false,
                user: action.user,
                confirmed: false
            }

        case SIGNUP_ERROR:
            return {
                ...state,
                user: undefined,
                error: true,
                errorMessage: action.errorMessage,
                loading: false,
                confirmed: false
            }

        case SIGNUP_CONFIRM_STARTED:
            return {
                ...state,
                loading: true
            }

        case SIGNUP_CONFIRM_SUCCESS:
            return {
                ...state,
                user: action.user,
                confirmed: true,
                error: false,
                errorMessage: '',
                loading: false
            }

        case SIGNUP_CONFIRM_ERROR:
            return {
                ...state,
                user: undefined,
                error: true,
                errorMessage: action.errorMessage,
                loading: false,
                confirmed: false
            }


        default:
            return state;
    }

}