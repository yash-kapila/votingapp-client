var express = require("express");
var app = express();

// serve static files
app.use(express.static('./_build/app'));

// keep port number configuration in a config file for different environments
app.listen(8080, function(){
    console.log("Listening at port 8080");
})

// expose app           
exports = module.exports = app;