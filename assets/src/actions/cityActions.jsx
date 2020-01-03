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
    APARTMENTS_NEWFLOOR_ERROR,
    APARTMENTS_DELETE_STARTED,
    APARTMENTS_DELETE_SUCCESS,
    APARTMENTS_DELETE_ERROR
    
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

            let apartments = res;

            if (apartments === undefined) {
                apartments = [];
            }

            dispatch({
                type: FETCH_APARTMENTS_SUCCESS,
                apartments: apartments,
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

/**
 * Requests new set of apartments of a new floor for a building
 * The floor number will be decided by the back end
 * and returned with its unique identifiers
 * 
 * @param {*} building
 */
export const requestNewFloor = (building) => dispatch => {

    dispatch({ type: APARTMENTS_NEWFLOOR_STARTED });

    API.post("apartments", "apartments", {

        body: {
            building: building
        }

    }).then(res => {
        
        let newApartments = res;

        if (newApartments === undefined) {
            newApartments = [];
        }

        dispatch({
            type: APARTMENTS_NEWFLOOR_SUCCESS,
            apartments: apartments.concat(newApartments)
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

    API.put("apartments", "apartments", {

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
 * Deletes the top floor of a building, similar to pop from a stack
 * 
 * @param {*} apartments
 * @param {*} building 
 */
export const deleteFloor = (apartments, building) => dispatch => {

    dispatch({ type: APARTMENTS_DELETE_STARTED });

    API.delete("apartments", "apartments", {

        body: {
            apartments: apartments
            .filter(a=>a.building===building)
            .sort((a,b)=>a.floor > b.floor)
            .slice(0,8)
        }

    }).then(res => {
        
        let floor = res.floor;                
        
        dispatch({
            type: APARTMENTS_DELETE_SUCCESS,
            apartments: apartments.filter(a=>a.floor !== floor)
        });

    }).catch(err => {

        dispatch({
            type: APARTMENTS_DELETE_ERROR,
            errorMessage: "Oops! error deleting the floor: " + err.message
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
