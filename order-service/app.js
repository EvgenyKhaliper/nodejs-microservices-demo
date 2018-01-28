const express = require('express');
const request = require('request');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

const paymentServiceIp = process.argv[2];
const dbIp = process.argv[3];

app.route('/orders')
    .get(function (req, res) {
        request.get('http://' + dbIp + '/orders').on('response', function(response) {
            response.on('data', function(orders) {
                res.json(JSON.parse(orders));
            })
        })
    })
    .post(function(req, res){
        var order = {
            uri: 'http://' + dbIp + '/orders',
            method: 'POST',
            json: req.body
        };
        request.post(order, function(err1, httpResponse1, body1){
			var transaction = {
				uri: 'http://' + paymentServiceIp + '/transactions',
				method: 'POST',
				json: {"orderId": body1.order.id}
			};
			request.post(transaction, function(err2, httpResponse2, body2){
				res.json(body2);
			})
        })
    });

app.listen(3002);