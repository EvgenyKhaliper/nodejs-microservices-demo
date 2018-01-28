const express = require('express');
const request = require('request');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

const dbIp = process.argv[2];

app.route('/transactions')
    .get(function (req, res) {
        request.get('http://' + dbIp + '/transactions').on('response', function(response) {
            response.on('data', function(transactions) {
                res.json(JSON.parse(transactions));
            })
        })
    })    
    .post(function(req, res){
        var transaction = {
            uri: 'http://' + dbIp + '/transactions',
            method: 'POST',
            json: req.body
        };
        request.post(transaction, function(err, httpResponse, body){ 
            res.json(body);  
        })
    });

app.listen(3001);