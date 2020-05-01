const maxSmallScreen = 1024;
const maxScroll = 100;
const scrollBarWidth = 17;
const numberOfProjectToShow = 2;
const githubApiUrl = 'https://api.github.com/users/tarkowr/repos';

const testEnvironment = {
    production: false,
    apiUrl: 'http://localhost:8080'
}

const environment = {
    production: true,
    apiUrl: 'https://richietarkowski.com'
}

let mobile = false;

// Name:Id dictionary
let Repos = { 
    'ePortfolio2.0':'eportfolio-date', 
    'PHP-Discussion-Forum':'cit228-date',
    'Despair':'cit195-date',
    'Stock-Insight':'cit255-date',
    'Utility-App':'utility-app-date',
    'PyCsv':'pycsv-date',
    'PyEmailCollege': 'pyemail-date'
 }

window.addEventListener('load', function() {
    MobileNavBar();
    HandleLinkHover();
    HandleApiService(DisplayLastUpdatedValues);
});

// Display link label on hover
function HandleLinkHover(){
    let links = [
        {key:"GitHub", value:document.getElementById("link-github")}, 
        {key:"Email", value:document.getElementById("link-mail")},
        {key:"Salesforce Trailhead", value:document.getElementById("link-sf")},
        {key:"LinkedIn", value:document.getElementById("link-linkedin")}
    ];

    links.forEach(function(link){
        setLinkHoverEventListener(link.value, link.key);
    });
}

// Attach on mouseover and mouseout events to links
function setLinkHoverEventListener(el, text){
    let label = document.getElementById("splash-link-title");

    el.addEventListener("mouseover", function(){
        label.innerHTML = text;
    });

    el.addEventListener("mouseout", function(){
        label.innerHTML = "";
    });
}

// Get GitHub API data from dataService
function HandleApiService(callback){
    ApiService(environment)
    .then(data => {
        callback(data);
    });
}

// Hide or unhide nav bar options when the navbar is in mobile upon icon click
function MobileNavBar(){
    const INLINE_BLOCK = "inline-block";
    const NONE = 'none';

    let links = document.getElementsByClassName('nav-links');
    let navIcon = document.getElementById('nav-bars');

    let toggleNavLinks = function(){
        if(links[0].style.display === INLINE_BLOCK){
            for(let i = 0; i < links.length; i++){
                links[i].style.display = NONE;
            }
        }
        else{
            for(let i = 0; i < links.length; i++){
                links[i].style.display = INLINE_BLOCK;
            }
        }
    };

    navIcon.addEventListener('click', function(){
        mobile = true;
        toggleNavLinks();
    });

    Array.prototype.forEach.call(links, function(elem){
        elem.addEventListener('click', function(){
            if(mobile){
                mobile = false;
                toggleNavLinks();
            }
        });
    });
}

// Display GitHub API values
function DisplayLastUpdatedValues(data){
    for (let key in Repos) {
        document.getElementById(Repos[key]).innerHTML = GetDateFromGithubApi(data, key);
    }
}



  