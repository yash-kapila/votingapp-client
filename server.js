var express = require("express");
var app = express();

// keep port number configuration in a config file for different environments
app.listen(3000, function(){
    console.log("Listening at port 3000");
})

// expose app           
exports = module.exports = app;