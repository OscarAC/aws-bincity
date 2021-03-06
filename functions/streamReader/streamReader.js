const AWS = require('aws-sdk');
const axios = require('axios');
const https = require('https');
var s3 = new AWS.S3();

exports.handler = function (event, context, callback) {

    try {

        if (event.Records.length > 0) {

            let tokenBucketName = process.env.tokenBucketName;

            var params = { Bucket: tokenBucketName, Key: 'influxtoken.dat' };

            s3.getObject(params).promise().then(function (s3data) {

                let influxToken = s3data.Body.toString();
                let influxUrl = process.env.influxUrl;
                let data = [];

                event.Records.forEach(function (record) {

                    let floor = record.dynamodb.NewImage.floor.N;
                    let value = record.dynamodb.NewImage.value.N;
                    let apartment = record.dynamodb.NewImage.apartment.N;
                    let building = record.dynamodb.NewImage.building.N;

                    data.push(
                        "building" + building +
                        ",floor=" + floor +
                        ",apartment=" + apartment +
                        " value=" + value + "\n"
                    );
                });

                axios.post('https://' + influxUrl + '/api/v2/write?org=BinCity&bucket=BinCity&precision=s',
                    data.toString().replace(/,b/g, 'b'),
                    {
                        headers: {
                            'Authorization': 'Token ' + influxToken,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        timeout: 250,
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false
                        })
                    })
                    .then(response => {
                        callback(null, "Success!");
                        return;
                    })
                    .catch((err) => {
                        callback(null, err);
                        return;
                    })


            }).catch(function (err) {

                console.log(err);
                callback(null, err);
                return;

            });
        }
    }
    catch (e) {
        console.log('Error: ' + e.stack);
        callback(null, e);
    }
}