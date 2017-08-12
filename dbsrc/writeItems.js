var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var dynamodb = new AWS.DynamoDB();

var mcdjson = require('./mcds_categorized.json');

var params = {
    RequestItems: {
        "FoodItems": []
    }
}

for (var idx = 0; idx < mcdjson.length; ++idx) {
    // format item data for writing to DynamoDB
    var infoObj = {
        "Calories" : {N: mcdjson[idx].Info.Calories},
        "Carbs" : {N: mcdjson[idx].Info.Carbs},
        "Fats" : {N: mcdjson[idx].Info.Fats},
        "Protein" : {N: mcdjson[idx].Info.Proteins}
    }
    
    // create request object
    var reqObj = {
        PutRequest: {
            Item: {
                "Restaurant": {
                    S: mcdjson[idx].Restaurant
                },
                "ItemName": {
                    S: mcdjson[idx].Name
                },
                "Info": {
                    M: infoObj
                },
                "Category": {
                    S: mcdjson[idx].Category
                }
            }
        }
    }

    params.RequestItems["FoodItems"].push(reqObj);

    if (idx % 25 == 24) {
        dynamodb.batchWriteItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        });

        params = {
            RequestItems: {
                "FoodItems": []
            }
        }
    }
}

dynamodb.batchWriteItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});