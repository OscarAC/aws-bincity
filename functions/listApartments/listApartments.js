const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials" : true
};

exports.handler = (event, context, callback) => {

  let params = {
    TableName: 'TBinCity'
  };

  dynamoDB.scan(params, function (err, data) {

    if (err) {

      callback(null,
        {
          statusCode: 500,
          headers: headers,
          body: err
        });
      return;

    } else {

      callback(null, {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(data.Items)
      });
    }

  });
};
