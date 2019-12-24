import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import authReducer from './authReducer';
import singupReducer from './signupReducer';
import signupReducer from './signupReducer';

export default combineReducers({
    buildings: cityReducer,
    auth: authReducer,
    signup: signupReducer
});
