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
    'ePortfolio':'eportfolio-date', 
    'PHP-Discussion-Forum':'cit228-date',
    'Despair':'cit195-date',
    'Stock-Insight':'cit255-date',
    'PyCsv':'pycsv-date'
 }

window.addEventListener('load', function() {
    MobileNavBar();
    PopulateTechnologies();
    HandleApiService(DisplayLastUpdatedValues);
});

// Get GitHub API data from dataService
async function HandleApiService(callback){
    let data = new Object();
    data = await ApiService(environment);

    callback(data);
}

function PopulateTechnologies(){
    let tech_list = ["C#", "Java", "Python", "WPF", "ASP.NET", "Django", "HTML/CSS", "JavaScript", "Angular",
        "Bootstrap", "SQL", "Git", "Selenium", "PHP", "NodeJS", "Android", "Salesforce", "SOQL"];

    let target = document.getElementById("tech-list");
    let rootItem = document.getElementById("tech-item-node");
    
    for(let i=0; i < tech_list.length; i++){
        let clone = rootItem.cloneNode();
        clone.id="tech-item-" + i;
        clone.innerHTML = tech_list[i];
        target.appendChild(clone);
    }

    target.removeChild(rootItem);
}

// Hide or unhide nav bar options when the navbar is in mobile upon icon click
function MobileNavBar(){
    let links = document.getElementsByClassName('nav-links');
    let navIcon = document.getElementById('nav-bars');

    let toggleNavLinks = function(){
        if(links[0].style.display == 'inline-block'){
            for(let i = 0; i < links.length; i++){
                links[i].style.display = 'none';
            }
        }
        else{
            for(let i = 0; i < links.length; i++){
                links[i].style.display = 'inline-block';
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
    for (var key in Repos) {
        document.getElementById(Repos[key]).innerHTML = GetDateFromGithubApi(data, key);
    }
}



  