import {
    FETCH_APARTMENTS_STARTED,
    FETCH_APARTMENTS_SUCCESS,
    FETCH_APARTMENTS_ERROR,
    APARTMENTS_SAVE_REALTIME,
    APARTMENTS_SAVE_STARTED,
    APARTMENTS_SAVE_SUCCESS,
    SET_CURRENT_BUILDING,
    UPDATE_APARTMENTS_STATE,
    APARTMENTS_SAVE_ERROR,
    APARTMENTS_NEWFLOOR_STARTED,
    APARTMENTS_NEWFLOOR_SUCCESS,
    APARTMENTS_NEWFLOOR_ERROR
} from './types';

import API from "@aws-amplify/api";


/**
 * Retrieves all the apartments by making a call to the lambda (listApartments)
 * while the call to the function is made, the <i>loading</i> global flag is set
 */
export const fetchApartments = () => dispatch => {

    dispatch({ type: FETCH_APARTMENTS_STARTED });

    API.get("apartments", "apartments", null)
        .then(res => {

            dispatch({
                type: FETCH_APARTMENTS_SUCCESS,
                apartments: res.data,
                building: 0
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_APARTMENTS_ERROR,
                errorMessage: "Oops! there was a problem retrieving the apartments: " + err.message
            });
        });
}

/**
 * Sets the Real Time global flag which indicates that the save function
 * will be invoked after each action performed in the apartments
 * 
 * @param {*} value true/false
 */
export const setRealTime = (value) => dispatch => {

    dispatch({
        type: APARTMENTS_SAVE_REALTIME,
        realtime: value
    });
}

export const requestNewFloor = (apartments, building) => dispatch => {

    dispatch({ type: APARTMENTS_NEWFLOOR_STARTED });

    API.post("apartments", "/apartments", {

        body: {
            building: building
        }

    }).then(res => {

        dispatch({
            type: APARTMENTS_NEWFLOOR_SUCCESS,
            apartments: apartments.concat(res.data)
        });

    }).catch(err => {

        dispatch({
            type: APARTMENTS_NEWFLOOR_ERROR,
            errorMessage: "Oops! error constructing a new floor: " + err.message
        });
    });
}

/**
 * Executes a save (update) of the apartments to the lambdas functions (updateApartments)
 * while executing the call, the <i>loading</i> global flag is set
 */
export const save = (apartments) => dispatch => {

    dispatch({ type: APARTMENTS_SAVE_STARTED });

    API.put("apartments", "/apartments", {
        
        body: {
            apartments: apartments.filter(a => a.dirty).map(a => {
                delete a.dirty;
                return a;
            })
        }

    }).then(res => {

        dispatch({
            type: APARTMENTS_SAVE_SUCCESS
        });

    }).catch(err => {

        dispatch({
            type: APARTMENTS_SAVE_ERROR,
            errorMessage: "Oops! error saving: " + err.message
        });
    });
}

/**
 *  Sets the current active building
 * 
 * @param {*} building 
 */
export const setCurrentBuilding = (building) => dispatch => {

    dispatch({
        type: SET_CURRENT_BUILDING,
        building: building
    });
}

/**
 * Updates the global state of the Buildings
 * 
 * @param {*} building 
 */
export const updateApartments = (apartments) => dispatch => {

    dispatch({
        type: UPDATE_APARTMENTS_STATE,
        apartments: apartments
    });
}
