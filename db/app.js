const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

var orders = [];
var transactions = [];

app.route('/orders')
    .get(function (req, res) {
        res.json(users);
    })
    .post(function(req, res)
    {  
        for (var i = 0, len = users.length; i < len; i++) {
            if(users[i].name == req.body.user)
            {
                res.json({id: users[i].id});
                return;
            }
        }      
        var userId = users.length + 1;
        users.push({id: userId, name: req.body.user });
        res.json({id: userId});
    });
app.route('/transactions')
    .get(function (req, res) {
        res.json(posts);
    })
    .post(function(req, res)
    {
        posts.push({id: posts.length + 1, content: req.body.content, user: req.body.user});
        res.json({message: 'post was added'});
    });

app.listen(3004)