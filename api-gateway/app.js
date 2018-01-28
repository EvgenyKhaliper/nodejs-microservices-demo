const express = require('express');
const request = require('request');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

const paymentServiceIp = process.argv[2];
const orderServiceIp = process.argv[3];

app.route('/orders')
    .get(function (req, res) {
        request.get('http://' + orderServiceIp + '/orders').on('response', function(res1) {
            res1.on('data', function(data1) {
                request.get('http://' + paymentServiceIp + '/transactions').on('response', function(res2) {
                    res2.on('data', function(data2) {
                        var result = [];
                        var orders = JSON.parse(data1);
                        var transactions = JSON.parse(data2);
                            
                        orders.forEach(function(order) {
                            transactions.forEach(function (transaction) {
                                if(order.id === transaction.orderId) {
                                    result.push({id: order.id, 
                                        price: order.price, 
                                        customer: order.customer, 
                                        success: transaction.success})
                                }
                            })
                        });
                        res.json(result);
                    })
                })
            })
        })
    })
    .post(function (req, res) {
        var order = {
            uri: 'http://' + orderServiceIp + '/orders',
            method: 'POST',
            json: req.body
        };
        request(order, function(err1, res1, body1){ 
            res.json(body1);  
        });
    });

app.listen(3000);