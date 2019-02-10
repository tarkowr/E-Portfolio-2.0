var express = require('express');
var app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/blog', function(req, res){
    res.render('pages/blog');
})

// Alyssa page
app.get('/alyssa', function(req, res) {
    res.render('pages/alyssa');
});

app.use(express.static(__dirname));

// Handle 404 Error
app.use(function(req, res) {
    res.status(404);
    res.render('pages/404', {title: "404", msg:'File not Found', desc: 'The page you are looking for does not exist or is temporarily unavailable.'});
    console.log('404 Error Handled.');
});

// Handle 500 Error
app.use(function(req, res) {
    res.status(500);
    res.render('pages/500', {title: "500", msg:'Internal Server Error', desc: 'Could not load the requested page. Please try again later.'});
    console.log('500 Error Handled.');
});

app.listen(8080, function(){
    console.log('Listening on port 8080!');
});
