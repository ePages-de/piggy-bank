
var express = require('express');

var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');

var port = process.env.PORT || 5000;

var app = express()
    .use(history())
    .use(serveStatic(__dirname + '/dist'))
    .listen(port);
console.log('🚀 server started on port ' + port);
