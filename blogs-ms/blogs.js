const express = require('express')
const request = require('request')
const app = express()

const dbUrl = 'http://' + process.argv[2] + '/blogs';

app.route('/blogs')
    .get(function (req, res) {
        request.get(dbUrl).on('response', function(response) {
            response.on('data', function(data) {
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
            })
        })
    });

app.listen(3002)