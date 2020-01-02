const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();


exports.handler = (event, context, callback) => {

  const data = JSON.parse(event.body);

  let apartments = data.apartments;
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

  let params = {
    RequestItems: {
      'TBinCity': requestItems
    }
  };

  dynamoDB.batchWrite(params, function (err, data) {


    if (err) {

      callback(null,
        {
          'statusCode': 500,
          "body": null
        });
      return;

    } else {

      callback(null, apartments);
    }
  })
};