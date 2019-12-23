import { FETCH_AUTH, LOGOUT } from '../actions/types';

const initialState = {    
    isAuthenticated: false
}

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_AUTH:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            };

        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false
            }

        default:
            return state;        
    }

}