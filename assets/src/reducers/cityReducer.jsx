import { FETCH_BUILDINGS, SET_CURRENT_BUILDING, UPDATE_CURRENT_BUILDING } from '../actions/types';

const initialState = {    
    buildings: [],
    building: {}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_BUILDINGS:
            return {
                ...state,
                buildings: action.buildings,
                building: action.building
            };

        case SET_CURRENT_BUILDING:
            return {
                ...state,
                building: action.building
            }

        case UPDATE_CURRENT_BUILDING:
            return {
                ...state,
                buildings: state.buildings.map((item) => {
                    if (item.buildingId === action.building.buildingId) {
                        return action.building;
                    }
                    return item;
                }),
                building: state.buildings[action.building.buildingId]
            };


        default:
            return state;
    }
}

















// case UPDATE_BUILDING:
        //     return {
        //         ...state,
        //         building: action.building
        //     }

        // case UPDATE_BUILDINGS:

        //     return {
        //         ...state,
        //         buildings: state.buildings.map((item, index) => {
        //             if (index == action.building) {

        //                 item.map((floor, i) => {

        //                     if (i == action.floor)
        //                         return action.value;
        //                 })
        //             }
        //             return item;
        //         })
        //     };

        // case CREATE_BUILDING:
        //     let nbuilding = [...state.buildings];
        //     nbuilding.push(action.value);
        //     return {
        //         ...state,
        //         buildings: nbuilding
        //     };
