const AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        
        let key = record.dynamodb.NewImage.key.S;
        let floor = record.dynamodb.NewImage.floor.N;
        let value = record.dynamodb.NewImage.value.N;
        let apartment = record.dynamodb.NewImage.apartment.N;
        let building = record.dynamodb.NewImage.building.N;
        
        console.log('----------------------------');
        console.log('Key: ' + key);
        console.log('Floor: ' + floor);
        console.log('Value: ' + value);
        console.log('Apartment: ' + apartment);
        console.log('Building: ' + building);
        console.log('----------------------------');
    });
    callback(null, "message");
};

