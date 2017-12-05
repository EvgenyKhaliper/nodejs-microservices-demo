const express = require('express')
const app = express()

users = [{id: 1, name: "james"}];
blogs = [{id: 1, post: "my first blog", user: 1}];

app.route('/users')
    .get(function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(users));
    });
app.route('/blogs')
    .get(function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(blogs));
    });

app.listen(3004)