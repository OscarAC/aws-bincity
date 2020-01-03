import {
    FETCH_APARTMENTS_STARTED,
    FETCH_APARTMENTS_SUCCESS,
    FETCH_APARTMENTS_ERROR,
    APARTMENTS_SAVE_REALTIME,
    APARTMENTS_SAVE_STARTED,
    APARTMENTS_SAVE_SUCCESS,
    APARTMENTS_SAVE_ERROR,
    SET_CURRENT_BUILDING,
    UPDATE_APARTMENTS_STATE,
    APARTMENTS_NEWFLOOR_STARTED,
    APARTMENTS_NEWFLOOR_SUCCESS,
    APARTMENTS_NEWFLOOR_ERROR,
    APARTMENTS_DELETE_STARTED,
    APARTMENTS_DELETE_SUCCESS,
    APARTMENTS_DELETE_ERROR
} from '../actions/types';

const initialState = {
    apartments: [],
    building: {},
    dirty: false,
    realtime: false,
    loading: true,
    error: false,
    errorMessage: '',
    saveLoading: false,
    saveError: false
}

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_APARTMENTS_STARTED:
            return {
                ...state,
                loading: true
            }

        case FETCH_APARTMENTS_SUCCESS:
            return {
                ...state,
                apartments: action.apartments,
                building: action.building,
                loading: false,
                error: false,
                errorMessage: ''
            }

        case FETCH_APARTMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage
            }

        case SET_CURRENT_BUILDING:
            return {
                ...state,
                building: action.building
            }

        case APARTMENTS_SAVE_REALTIME:
            return {
                ...state,
                realtime: action.realtime
            }

        case APARTMENTS_SAVE_STARTED:
            return {
                ...state,
                saveLoading: true
            }

        case APARTMENTS_SAVE_SUCCESS:
            return {
                ...state,
                saveLoading: false,
                saveError: false,
                dirty: false
            }

        case APARTMENTS_SAVE_ERROR:
            return {
                ...state,
                saveLoading: false,
                dirty: true,
                saveError: true,
                errorMessage: action.errorMessage
            }

        case UPDATE_APARTMENTS_STATE:
            return {
                ...state,
                apartments: [...action.apartments],
                dirty: true
            };

        case APARTMENTS_NEWFLOOR_STARTED:
            return {
                ...state,
                saveLoading: true
            }

        case APARTMENTS_NEWFLOOR_SUCCESS:
            return {
                ...state,
                saveLoading: false,
                apartments: action.apartments
            }

        case APARTMENTS_NEWFLOOR_ERROR:
            return {
                ...state,
                saveLoading: false,
                dirty: true,
                saveError: true,
                errorMessage: action.errorMessage
            }

        case APARTMENTS_DELETE_STARTED:
            return {
                ...state,
                saveLoading: true
            }

        case APARTMENTS_DELETE_SUCCESS:
            return {
                ...state,
                saveLoading: false,
                apartments: action.apartments
            }
        
            case APARTMENTS_DELETE_ERROR:
            return {
                ...state,
                saveLoading: false,
                dirty: true,
                saveError: true,
                errorMessage: action.errorMessage
            }

        default:
            return state;
    }
}
