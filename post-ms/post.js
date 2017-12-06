const express = require('express')
const request = require('request')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

const dbUrl = 'http://' + process.argv[2] + '/posts';

app.route('/posts')
    .get(function (req, res) {
        request.get(dbUrl).on('response', function(response) {
            response.on('data', function(posts) {
                res.json(JSON.parse(posts));
            })
        })
    })
    .post(function(req, res){
        var post = {
            uri: dbUrl,
            method: 'POST',
            json: {"content": req.body.content, "user": req.body.user}
        };
        request.post(post, function(err, httpResponse, body){ 
            res.json(body);  
        })
    });

app.listen(3002)