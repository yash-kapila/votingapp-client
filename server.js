var express = require("express");
var app = express();
var proxy = require('express-http-proxy');

// serve static files
app.use(express.static('./_build/app'));

// proxy requests from client to server after rewriting the url and appending '/api' to it
app.use('/api', proxy('https://votingapp-server-yashkapila.c9users.io', {
    forwardPath: function(req, res) {
        return require('url').parse('/api'+req.url).path;
    }
}));

// keep port number configuration in a config file for different environments
app.listen(8080, function(){
    console.log("Listening at port 8080");
})

// expose app           
exports = module.exports = app;