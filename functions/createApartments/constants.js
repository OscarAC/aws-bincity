const uuid = require('uuid');

module.exports = {
    emptyFloor: function (building, floor) {
        [
            { key: uuid.v4(), apartment: 0, value: 0, floor: floor, building: building },
            { key: uuid.v4(), apartment: 1, value: 0, floor: floor, building: building },
            { key: uuid.v4(), apartment: 2, value: 0, floor: floor, building: building },
            { key: uuid.v4(), apartment: 3, value: 0, floor: floor, building: building },
            { key: uuid.v4(), apartment: 4, value: 0, floor: floor, building: building },
            { key: uuid.v4(), apartment: 5, value: 0, floor: floor, building: building },
            { key: uuid.v4(), apartment: 6, value: 0, floor: floor, building: building },
            { key: uuid.v4(), apartment: 7, value: 0, floor: floor, building: building }
        ]
    }
}