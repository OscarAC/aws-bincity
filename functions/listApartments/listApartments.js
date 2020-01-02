const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

  let params = {
    TableName: 'TBinCity'
  };

  dynamoDB.scan(params, function (err, data) {

    if (err) {

      callback(null,
        {
          'statusCode': 500,
          "body": null
        });
      return;

    } else {

      callback(null, data.Items);
    }

  });
};
