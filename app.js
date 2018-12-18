var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.use(express.static(__dirname + '/static'));

// Handle 404 Error
app.use(function(req, res) {
    res.status(400);
    res.render('pages/404', {title: "404", msg:'File not Found', desc: 'The page you are looking for does not exist or is temporarily unavailable.'});
});

// Handle 500 Error
app.use(function(error, req, res, next) {
    res.status(500);
    res.render('pages/500', {title: "500", msg:'Internal Server Error', desc: 'Could not load the requested page. Please try again later.'});
});

app.listen(8080, function(){
    console.log('Listening on port 8080!');
});
