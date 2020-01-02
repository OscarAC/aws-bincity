import uuid from 'uuid';

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emptyFloor = (building, floor) => ([
    { key: uuid.v4(), apartment: 0, value: 0, floor: floor, building: building, dirty: true },
    { key: uuid.v4(), apartment: 1, value: 0, floor: floor, building: building, dirty: true },
    { key: uuid.v4(), apartment: 2, value: 0, floor: floor, building: building, dirty: true },
    { key: uuid.v4(), apartment: 3, value: 0, floor: floor, building: building, dirty: true },
    { key: uuid.v4(), apartment: 4, value: 0, floor: floor, building: building, dirty: true },
    { key: uuid.v4(), apartment: 5, value: 0, floor: floor, building: building, dirty: true },
    { key: uuid.v4(), apartment: 6, value: 0, floor: floor, building: building, dirty: true },
    { key: uuid.v4(), apartment: 7, value: 0, floor: floor, building: building, dirty: true }
]
);
