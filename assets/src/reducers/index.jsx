import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import authReducer from './authReducer';
// import signupReducer from './signupReducer';

export default combineReducers({
    apartments: cityReducer,
    auth: authReducer
    // signup: signupReducer
});
