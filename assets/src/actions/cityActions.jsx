import { FETCH_BUILDINGS, FETCH_CURRENT_BUILDING, SET_CURRENT_BUILDING, UPDATE_CURRENT_BUILDING } from './types';
import * as Util from './util';

export const fetchBuildings = () => dispatch => {

    let buildings_mock =
        [
            {
                buildingId: 0,
                floors: [150,255,150,255]
            },
            {
                buildingId: 1,
                floors: [105,150]
            }
        ]

    let buildings = Util.buildingsExpand(buildings_mock);

    dispatch({
        type: FETCH_BUILDINGS,
        buildings: buildings,
        building: buildings[0]
    });
}

export const fetchCurrentBuilding = () => dispatch => {
    dispatch({
        type: FETCH_CURRENT_BUILDING
    });
}


export const setCurrentBuilding = (building) => dispatch => {
    dispatch({
        type: SET_CURRENT_BUILDING,
        building: building
    });
}

export const updateCurrentBuilding = (building) => dispatch => {
    dispatch({
        type: UPDATE_CURRENT_BUILDING,
        building: building
    });
}
















// export const fetchBuildings = () => dispatch => {
//     dispatch({
//         type: FETCH_BUILDINGS
//     });
// }

// export const updateBuildings = (building, floor, value) => dispatch => {
//     dispatch({
//         type: UPDATE_BUILDINGS,
//         building: building,
//         floor: floor,
//         value: value
//     });
// }

// export const createBuilding = () => dispatch => {
//     dispatch({
//         type: CREATE_BUILDING,
//         value: [0, 0, 0, 0, 0, 0, 0, 0]
//     });
// }
