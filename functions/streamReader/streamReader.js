const AWS = require('aws-sdk');
const fs = require('fs');
const axios = require('axios');

exports.handler = function (event, context, callback) {

    try {

        let influxToken = fs.readFileSync('influxtoken.dat', 'utf8');
        let influxUrl = fs.readFileSync('influxurl.dat', 'utf8');
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

        axios.post(influxUrl + '/api/v2/write?org=BinCity&bucket=BinCity&precision=s',
            data.toString().replace(/,b/g, 'b'),
            {
                headers: {
                    'Authorization': 'Token ' + influxToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
            })
            .catch((err) => {
                console.log(err);
            })

        callback(null, "Success!");

    }
    catch (e) {
        console.log('Error: ' + e.stack);
        callback(null, e);
    }
};