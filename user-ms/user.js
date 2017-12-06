const express = require('express')
const request = require('request')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

const dbUrl = 'http://' + process.argv[2] + '/users';

app.route('/users')
    .get(function (req, res) {
        request.get(dbUrl).on('response', function(response) {
            response.on('data', function(users) {
                res.json(JSON.parse(users));
            })
        })
    })    
    .post(function(req, res){
        var user = {
            uri: dbUrl,
            method: 'POST',
            json: {"user": req.body.user}
        };
        request.post(user, function(err, httpResponse, body){ 
            res.json(body);  
        })
    });

app.listen(3001)