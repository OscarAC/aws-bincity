const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
};

exports.handler = (event, context, callback) => {

    const data = JSON.parse(event.body);

    let apartments = data.apartments;
    let requestItems = [];

    apartments.forEach(item => {

        requestItems.push({
            DeleteRequest: {
                Key: {
                    key: item['key']
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
                    body: JSON.stringify({
                        deleted: apartments.length
                    })
                });
        }
    })
}