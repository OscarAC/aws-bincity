const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

  const data = JSON.parse(event.body);

  // Retrieve the requested apartments
  let apartments = data.apartments;

  // Build the parameters for writing into DynamoDB
  let requestItems = buildRequestRequestItems(apartments);

  // We write batches of 25 or less
  for (let t, i = requestItems.length; i >=0; i = t) {

    t = i-25;

    const params = ({
      RequestItems: {
        'TBinCity': requestItems.slice(t < 0 ? 0 : t, i)
      }
    });

    // Save the requested apartments
    writeBatch(apartments, params, callback);    
  }
};

/**
 * Parse the requested apartments and build the RequestItems
 * 
 * @param {*} apartments 
 */
function buildRequestRequestItems(apartments) {

  let requestItems = [];

  apartments.forEach(item => {

    if (item['key'] === undefined) {
      item['key'] = uuid.v4();
    }

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

  return requestItems;
}

/**
 * Save in DynamoDB the new/modified apartments
 * 
 * @param {*} apartments 
 * @param {*} params 
 */
async function writeBatch(apartments, params, callback) {

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  dynamoDB.batchWrite(params, function (err, data) {

    if (err) {

      console.log(err);

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
          body: JSON.stringify(apartments)
        });
    }
  });
}
