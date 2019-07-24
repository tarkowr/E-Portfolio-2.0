var express = require('express')
var app = express()
var axios = require('axios')

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
app.set('view engine', 'ejs')

// View Routing
app.get('/', function(req, res) {
    res.render('pages/index', {links: urls})
})

app.get('/blog', function(req, res){
    res.render('pages/blog', {links: urls})
})

app.get('/alyssa', function(req, res) {
    res.render('pages/alyssa')
})

// URL Routing
app.get('/github', function(req, res){
    res.redirect(urls.github)
})

app.get('/linkedin', function(req, res){
    res.redirect(urls.linkedin)
})

app.get('/trailhead', function(req, res){
    res.redirect(urls.trailhead)
})

app.get('/facebook', function(req, res){
    res.redirect(urls.facebook)
})

app.get('/instagram', function(req, res){
    res.redirect(urls.instagram)
})

// GitHub API
app.get('/github/data', function(req, res){
    axios.get(`https://api.github.com/users/tarkowr/repos`)
    .then((repos) => {
        res.status(200).json(repos.data)
    })
    .catch((error) => {
        res.send(error)
    })
})

app.use(express.static(__dirname))

// Handle 404 Error
app.use(function(req, res) {
    res.status(404).render('pages/404', 
        { title: "404", msg:'File not Found', desc: 'The page you are looking for does not exist or is temporarily unavailable.' }
    )
})

// Handle 500 Error
app.use(function(req, res) {
    res.status(500).render('pages/500', 
        { title: "500", msg:'Internal Server Error', desc: 'Could not load the requested page. Please try again later.' }
    )
})

app.listen(8080, function(){
    console.log('Listening on port 8080!')
})
