import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import authReducer from './authReducer';

export default combineReducers({
    buildings: cityReducer,
    auth: authReducer
});
