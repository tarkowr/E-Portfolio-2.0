var express = require('express')
var app = express()
var axios = require('axios')
var cookieParser = require('cookie-parser')
var cryptoJS = require('crypto-js')
var uuid = require('uuid')
const blogPosts = require('./blog.json')
const config = require('./config.json')

var urls = {
    "linkedin":"https://www.linkedin.com/in/richie-tarkowski-273238155",
    "trailhead":"https://trailhead.com/me/rtarkowski",
    "github":"https://github.com/tarkowr",
    "facebook":"https://www.facebook.com/richie.tarkowski",
    "instagram":"https://www.instagram.com/richie_tarkowski/",
    "phpDiscussion":"https://github.com/tarkowr/PHP-Discussion-Forum",
    "despair":"https://github.com/tarkowr/Despair",
    "stockInsight":"https://github.com/tarkowr/Stock-Insight",
    "stockInsightDemo":"https://www.youtube.com/watch?v=sv_gQ37-n-w&feature=youtu.be",
    "utility":"https://github.com/tarkowr/Utility-App",
    "utilityPlayStore":"https://play.google.com/store/apps/details?id=com.rt.utility",
    "pycsv":"https://github.com/tarkowr/PyCsv",
    "eportfolio":"https://github.com/tarkowr/ePortfolio",
    "chatversity": "https://github.com/tarkowr/Chatversity_App",
    "chatversityDemo": "https://www.youtube.com/watch?v=M9QC3khGWIA",
    "chatversityApp":"https://www.chatversity.app",
    "chatversitySite":"https://chatversityapp.com",
    "jsGames":"https://games-js.firebaseapp.com/",
    "jsGames2":"https://js-gms.firebaseapp.com/"
}

// Set the view engine to ejs
app.set('view engine', 'ejs')
app.use(cookieParser())

// View Routing
app.get('/', function(req, res) {
    const context = { links: urls }
    const cookieName = 'visitor'
    const cookie = req.cookies[cookieName]
    const key = config.cryptoKey.toString()

    if (cookie === undefined){
        let options = {
            httpOnly: true,
            secure: true   // enable for prod
        }

        let visitorID = uuid.v4();
        let ciphertext = (cryptoJS.AES.encrypt(visitorID, key)).toString()
        res.cookie(cookieName, ciphertext, options)
    }

    res.render('pages/index', context)
})

app.get(['/server.js', '/config.json'], function(req, res) {
    res.status(404).render('pages/404', 
        { title: "404", msg:'File not Found', desc: 'The page you are looking for does not exist or is temporarily unavailable.' }
    )
})

app.get('/blog', function(req, res){
    res.render('pages/blog', {links: urls, posts: blogPosts.main})
})

app.get('/alyssa', function(req, res) {
    res.render('pages/alyssa')
})

app.get('/alyssa/exam', function(req, res) {
    res.render('pages/exam_calculator')
})

app.get('/alyssa/blog', function(req, res) {
    res.render('pages/blog', {links: urls, posts: blogPosts.alyssa})
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

app.get('/js', function(req, res){
    res.redirect(urls.jsGames)
})

app.get('/games', function(req, res){
    res.redirect(urls.jsGames2)
})

app.get('/utility', function(req, res){
    res.redirect(urls.utilityPlayStore)
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

// Get Blog Data
app.get('/blog/data/:query', function (req, res){
    let query = req.params.query

    if (blogPosts[query]){
        res.status(200).json(blogPosts[query])
    }
    else{
        res.send({})
    }
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`)
})
