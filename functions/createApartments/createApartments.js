const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

function emptyFloor(building, floor) {
  return [
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

exports.handler = (event, context, callback) => {

  const data = JSON.parse(event.body);

  let buildingNumber = data.building

  /**
   * Verify building parameter has been sent and
   * is a numberic value, if not, then send erro 400 (invalid request)
   */
  if (buildingNumber === undefined) {
    
    callback(null, {
      statusCode: 400,
      headers: headers,
      body: null
    });
    return;
  }
  else {
    buildingNumber = parseInt(buildingNumber);    
  }

  /**
   * A building can have no more than 15 floors, that is 15*8 apartments, therefore
   * a count of the current number of floors for a building is retrieved   
   */
  let currentApartmentCount = 0;

  let params = {
    TableName: 'TBinCity',
    IndexName: 'building-index',
    KeyConditionExpression: "building = :building",
    ExpressionAttributeValues: {
      ":building": buildingNumber
    }
  };

  dynamoDB.query(params, function (err, data) {

    if (err) {

      callback(null,
        {
          statusCode: 500,
          headers: headers,
          body: err
        });
      return;
    }

    else {

      currentApartmentCount = data['Count']
    }
  });


  /**
   * After retrieving building apartments, we check for the number of floors registered for that building,
   * if the max has been reached, we return a 403, else, 
   * we proceed and create the required apartments for that building
   */
  if (currentApartmentCount / 8 >= 16) {
    callback(null,
      {
        statusCode: 403,
        headers: headers,
        body: 'Maximum number of floors for the building has been reached'
      });
    return;
  }

  else {

    let newFloor = emptyFloor(buildingNumber, currentApartmentCount);
    let requestItems = [];

    Array.prototype.forEach.call(newFloor, item=>{
      requestItems.push({
        PutRequest: {
          Item: {
            key: item['key'],
            apartment: item['apartment'],
            floor: item['floor'],
            building: item['building'],
            value: item['value']
          }
        }
      });
    });

    let params = {
      RequestItems: {
        'TBinCity': requestItems
      }
    };

    dynamoDB.batchWrite(params, function (err, data) {

      if (err) {

        callback(null,
          {
            statusCode: 500,
            headers: headers,
            body: err
          });
        return;

      } else {

        callback(null,
          {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(newFloor)
          });
      }

    });
  }

};
