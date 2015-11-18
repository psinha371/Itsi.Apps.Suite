var express = require('express');
var app = express();

// this will be set up nodemon.
var environment = process.env.NODE_ENV;
console.log('The environment is ' + environment);
console.log(process.env.STATIC_PATH);

// based on the environment load the assets and set the routre middleware.
 switch (environment) {
    case 'build':
        break;
    default:
        // set the path of static files so that express can load it.
        app.use('/app.js', express.static(__dirname + '/app/app.js'));
        app.use('/feature', express.static(__dirname + '/app/feature'));
        app.use('/images', express.static(__dirname + '/app/images'));
        app.use('/bower_components', express.static(__dirname + '/bower_components'));
        break;
}

// next set the route middleware. since the routing is done by angularjs, set the route url to *
// Just send the index.html for other files to support HTML5Mode
app.all('/*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/app' });
});
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Template app listening at http://%s:%s', host, port);
});
