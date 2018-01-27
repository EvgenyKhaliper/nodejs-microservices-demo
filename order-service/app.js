const express = require('express')
const request = require('request')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

const dbIp = 'http://' + process.argv[2] + '/orders';

app.route('/orders')
    .get(function (req, res) {
        request.get('http://' + dbIp + '/orders').on('response', function(response) {
            response.on('data', function(posts) {
                res.json(JSON.parse(posts));
            })
        })
    })
    .post(function(req, res){
        var post = {
            uri: 'http://' + dbIp + '/posts',
            method: 'POST',
            json: {"content": req.body.content, "user": req.body.user}
        };
        request.post(post, function(err, httpResponse, body){ 
            res.json(body);  
        })
    });

app.listen(3002)