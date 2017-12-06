const express = require('express')
const request = require('request')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

const postsUrl = 'http://' + process.argv[2] + '/posts';
const usersUrl = 'http://' + process.argv[3] + '/users';

app.route('/posts')
    .get(function (req, res) {
        request.get(postsUrl).on('response', function(resPosts) {
            resPosts.on('data', function(dataPosts) {
                request.get(usersUrl).on('response', function(resUsers) {
                    resUsers.on('data', function(dataUsers) {
                        var result = [];
                        var posts = JSON.parse(dataPosts);
                        var users = JSON.parse(dataUsers);
                        posts.forEach((post) => {
                            users.forEach((user) => {
                                if(post.user == user.id) {
                                    result.push({id: post.id, content: post.content, user: user})
                                }
                            })
                        })
                        res.json(result);
                    })
                })
            })
        })
    })
    .post(function (req, res) {
        var user = {
            uri: usersUrl,
            method: 'POST',
            json: {"user": req.body.user}
        };
        request(user, function(errUser, resUser, bodyUser){ 
            var post = {
                uri: postsUrl,
                method: 'POST',
                json: {"content": req.body.content, user: bodyUser.id}
            };
            request(post, function(errPost, resPost, bodyPost){ 
                res.json(bodyPost);  
            })
        })
    });

app.listen(3000)