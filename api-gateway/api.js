const express = require('express')
const request = require('request')
const app = express()

const blogsMicroserviceUrl = 'http://' + process.argv[2] + '/blogs';
const usersMicroserviceUrl = 'http://' + process.argv[3] + '/users';

app.route('/blogs')
    .get(function (req, res) {
        request.get(blogsMicroserviceUrl).on('response', function(blogRes) {
            blogRes.on('data', function(blogsData) {
                request.get(usersMicroserviceUrl).on('response', function(userRes) {
                    userRes.on('data', function(usersData) {
                        res.setHeader('Content-Type', 'application/json');
                        var result = [];
                        var blogs = JSON.parse(blogsData);
                        var users = JSON.parse(usersData);
                        blogs.forEach((blog) => {
                            users.forEach((user) => {
                                if(blog.user == user.id) {
                                    result.push({id: blog.id, blog: blog.post, user: user})
                                }
                            })
                        })
                        res.send(result);
                    })
                })
            })
        })
    })
    .post(function (req, res) {
        res.send(response)
    });

app.listen(3000)