export const byteToArray = (byte) => {
    let arr = [];    
    for(let i = 0, j = 1; i < 8; i++, j <<= 1){
        arr[i] = (byte & j) ? 1 : 0;
    }
    return arr;
}

export const arrayToByte = (array) => {
    let byte = 0;
    for(let i = 0; i < 8; i++) {
        byte ^= ((array[i] & 1) << i)
    }
    return byte;
}

export const buildingsExpand = (buildings) => {    
    buildings.map((building, i) => {        
        building.floors.map((floor, j)=>{
            buildings[i].floors[j] = byteToArray(floor);
        });
    });
    return buildings;
}