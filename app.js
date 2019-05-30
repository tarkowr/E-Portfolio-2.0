var express = require('express');
var app = express();

var urls = {
    "linkedin":"https://www.linkedin.com/in/richie-tarkowski-273238155",
    "trailhead":"https://trailhead.com/me/rtarkowski",
    "github":"https://github.com/tarkowr",
    "facebook":"https://www.facebook.com/richie.tarkowski",
    "instagram":"https://www.instagram.com/richie_tarkowski/",
    "phpDiscussion":"https://github.com/tarkowr/PHP-Discussion-Forum",
    "despair":"https://github.com/tarkowr/Despair",
    "stockInsight":"https://github.com/tarkowr/Stock-Insight",
    "pycsv":"https://github.com/tarkowr/PyCsv",
    "eportfolio":"https://github.com/tarkowr/ePortfolio",
    "chatversityApp":"https://www.chatversity.app",
    "chatversitySite":"https://chatversityapp.com"
}

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Index page 
app.get('/', function(req, res) {
    res.render('pages/index', {links: urls});
});

app.get('/blog', function(req, res){
    res.render('pages/blog', {links: urls});
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
