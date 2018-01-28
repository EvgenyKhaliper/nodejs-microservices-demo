const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

var orders = [];
var transactions = [];

app.route('/orders')
    .get(function (req, res) {
        res.json(orders);
    })
    .post(function(req, res)
    {      
        var orderId = orders.length + 1;
        var order = {id: orderId, item: req.body.item, price: req.body.price, customer: req.body.customer }
        orders.push(order);
        res.json({order: order});
    });
app.route('/transactions')
    .get(function (req, res) {
        res.json(transactions);
    })
    .post(function(req, res)
    {
        var transactionId = transactions.length + 1;
        var transaction = {id: transactionId, orderId: req.body.orderId, success: true};
        transactions.push(transaction);
        res.json({transaction: transaction});
    });

app.listen(3004);