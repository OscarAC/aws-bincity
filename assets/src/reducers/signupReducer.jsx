import { SIGNUP_STARTED, SIGNUP_SUCCESS, SIGNUP_ERROR } from '../actions/types';

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
                user: action.user
            }

        case SIGNUP_ERROR:
            return {
                ...state,
                user: undefined,
                error: true,
                errorMessage: action.errorMessage,
                loading: false
            }

        default:
            return state;
    }

}