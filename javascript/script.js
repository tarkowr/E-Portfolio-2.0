const maxSmallScreen = 649;
const maxScroll = 100;
const scrollBarWidth = 17;
const githubApiUrl = "https://api.github.com/users/tarkowr/repos";

$(function() {
    let nav = $("#navigation");
    let windowWidth = $(window).innerWidth() + scrollBarWidth;

    //Check if window is scrolled past a certain point
    //Handle navbar classes
    let ToggleNavBar = function(){
        let scroll = $(window).scrollTop();
        if(!($(window).innerWidth() + scrollBarWidth <= maxSmallScreen)){
            if (scroll > maxScroll) {
                nav.addClass("scrolled-navigation");
                nav.removeClass("default-navigation");
            }
            else{
                nav.addClass("default-navigation");
                nav.removeClass("scrolled-navigation");
            }
        }
    }

    //Check window width on page load to determine navbar class
    if (windowWidth <= maxSmallScreen) { nav.addClass("scrolled-navigation") }
  
    //On window scroll, check if it has passed a certain point
    $(window).scroll(function(){
        ToggleNavBar();
    });

    //On window resize, check if the navbar needs to switch to mobile or desktop
    $(window).on('resize', function(){
        if (windowWidth <= maxSmallScreen) { 
            $('#navigation a').css('display', 'none');
            nav.addClass("scrolled-navigation");
        }
        else{
            $('#navigation a').css('display', 'inline-block');
            ToggleNavBar();
        }
    });
});

//Hide or unhide nav bar options when the navbar is in mobile upon icon click
document.getElementById("nav-bars").addEventListener("click", function(){
    let links = document.getElementsByClassName('nav-links');

    if(links[0].style.display == "inline-block"){
        for(let i = 0; i < links.length; i++){
            links[i].style.display = "none";
        }
    }
    else{
        for(let i = 0; i < links.length; i++){
            links[i].style.display = "inline-block";
        }
    }
});

window.onload = function() {
    ApiService(githubApiUrl);
};

//Load in my github json file via web api
//Update projects with last updated dates from github
function ApiService(url){
    const eportfolioDate = document.getElementById("eportfolio-date");
    const cit228Date = document.getElementById("cit228-date");
    const cit195Date = document.getElementById("cit195-date");

    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        if(Http.readyState === 4 && Http.status === 200) {
            eportfolioDate.innerHTML = GetDateFromGithubApi(ConvertJsonToObject(Http.responseText), "ePortfolio");
            cit228Date.innerHTML = GetDateFromGithubApi(ConvertJsonToObject(Http.responseText), "CIT-228-Discussion-Forum");
            cit195Date.innerHTML = GetDateFromGithubApi(ConvertJsonToObject(Http.responseText), "CIT195-Final-Project");
        }
    }
}

//Convert a json string to a javascript object
function ConvertJsonToObject(json){
    return JSON.parse(json);
}

//Parse GitHub object for last updated date
//Return a custom formatted date
function GetDateFromGithubApi(obj, name){
    let repo = obj.find(function(element) {
        return element.name == name;
    });
    let repoLastUpdated = new Date(repo.updated_at);
    let date = repoLastUpdated.getDate();
    let month = repoLastUpdated.getMonth();
    let year = repoLastUpdated.getFullYear();

    return  (month + 1) + "-" + date + "-" + year;
}

  