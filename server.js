
var express = require('express');
var serveStatic = require('serve-static');

var port = process.env.PORT || 5000;

app = express();
app.use(serveStatic(__dirname + '/dist'));
app.listen(port);
console.log('🚀 server started on port ' + port);
