'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;
  
  var order_id=event.currentIntent.slots.Orderid;
  console.log("The order id is :" +order_id)

  const params = {
    TableName: "order",
    Key :
    {
        'order_id':'1'
    }
    
  };

  try {
    const data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data.Item.status);
    console.log("The status is:"+responseBody);
    statusCode = 200;
  } catch(err) {
    responseBody = `Unable to get products: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  callback(null, {
    "dialogAction":{
        "type":"Close",
        "fulfillmentState" : "Fulfilled",
        "message":{
            "contentType" :"PlainText",
            "content": "You order status is " +responseBody
        }
    }
});
  return response;
};